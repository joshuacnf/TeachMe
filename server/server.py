import aiohttp
import asyncio
import string
from aiohttp import web

import pymongo
from bson.objectid import ObjectId

import urllib
from urllib.parse import urlparse
import json
import random

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

mongo_client = pymongo.MongoClient('localhost', 27017)
db = mongo_client['db']
db_user = db['user']
db_post = db['post']
db_answer = db['answer']

########################### Helper Functions ###########################

def generate_rand_string(len):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=len))

def get_request_query(request):
    query = urllib.parse.urlparse(str(request.url)).query
    query = urllib.parse.parse_qs(query)
    return query

def send_verification_email(user_info):
    from_addr = 'jsmith19960401@gmail.com'
    to_addr = user_info['email']
    msg = MIMEMultipart()
    msg['From'] = from_addr
    msg['To'] = to_addr
    msg['Subject'] = 'Verification Email from TeachMe'
    body = 'http://0.0.0.0:8080/verify?code={}&id={}'.format(
        user_info['verification_code'], str(user_info['_id']))
    msg.attach(MIMEText(body))

    server = smtplib.SMTP('smtp.gmail.com:587')
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login(from_addr, 'TeachMe123456')
    text = msg.as_string()
    server.sendmail(from_addr, to_addr, text)
    server.quit()


########################### Request Handlers ###########################

routes = web.RouteTableDef()

# registration request handler
@routes.get('/register')
async def register(request):
    # extract user_info from user-registration request
    query = get_request_query(request)
    user_info = None if ('user_info' not in query) else query['user_info'][0]
    if user_info is None:
        return web.Response(text='Invalid Registration Request')
    user_info = json.loads(user_info)

    # if an email address is already in db, check whether it is verified or not
    result = db_user.find_one({'email': user_info['email']})
    if result is not None:
        if result['verified'] == True:
            return web.Response(status=200, text='Email Already Registered')
        if result['verified'] == False:
            db_user.delete_one({'_id', result['_id']})

    user_info['verified'] = False
    user_info['verification_code'] = generate_rand_string(64)
    db_user.insert_one(user_info)
    print(user_info)
    send_verification_email(user_info)

    return web.Response(status=200, text='Registration Request Completed')

# verification request handler
@routes.get('/verify')
async def verify(request):
    query = get_request_query(request)
    code = None if ('code' not in query) else query['code'][0]
    user_id = None if ('id' not in query) else query['id'][0]

    print('1')
    if code is None or user_id is None:
        return web.Response(status=400, text='Account Verification Failed')

    print('2')
    user_id = ObjectId(user_id)
    user_info = db_user.find_one({'_id': user_id})
    print(user_info)
    if user_info is None or user_info['verification_code'] != code:
        return web.Response(status=400, text='Account Verification Failed')

    db_user.update_one({'_id': user_id}, {'$set': {'verified': True}})

    return web.Response(staus=200, text='Account Verified')

# log-in request handler
@routes.get('/login')
async def log_in(request):
    query = get_request_query(request)
    user_info = None if ('user_info' not in query) else query['user_info'][0]

    if user_info is None:
        return web.Response(text='incorrect log-in request')
    
    user_info = json.loads(user_info)
    if not isinstance(user_info, dict):
        return web.Response(text='incorrect user_info in log-in request')

    result = db_user.find_one({'_id': ObjectId(user_info['_id']), 
        'password': user_info['password']})

    if result is None:
        return web.Response(text='Login Failed')

    return web.Response(status=200, text='Login Succeeded')

# post request handler
@routes.get('/get/post')
async def get_post(request):
    query = get_request_query(request)
    post_info = None if ('post_info' not in query) else query['post_info'][0]

    if post_info is None:
        return web.Response(text='incorrent post request')

    post_info = json.loads(post_info)
    if not instance(post_info, dict):
        return web.Response(text='incorrect post_info in post request')
    
    summary_result = db_post.find_one({'_id': ObjectID(post_info['_id'])})
    answers_result = db_answer.find({'post_id': ObjectID(post_info['_id'])})

    if summary_result is None:
        return web.Response(text='No such post')
    
    summary_result['answers'] = []

    for answer in answers_result:
        summary_result['answers'].append(answer)

    return web.Response(text=json.dumps(summary_result))
    


@routes.get('/get/{info}')
async def get(request):
    pass

app = web.Application()
app.add_routes(routes)
web.run_app(app)