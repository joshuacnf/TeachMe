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
db_tag = db['tag']
db_post = db['post']
db_answer = db['answer']

########################### Helper Functions ###########################

def intersection(A, B):
    C = [x for x in A if x in B]
    return C

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
    msg['From'] = 'TeachMe Registration' + ' <{}>'.format(from_addr)
    msg['To'] = to_addr
    msg['Subject'] = 'Verification Email from TeachMe'
    body = 'http://18.221.224.217:8080/verify?code={}&id={}'.format(
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
async def get_register(request):
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
            db_user.delete_one({'_id': result['_id']})

    user_info['verified'] = False
    user_info['verification_code'] = generate_rand_string(64)
    db_user.insert_one(user_info)
    print(user_info)
    send_verification_email(user_info)

    return web.Response(status=200, text='Registration Request Completed')

# verification request handler
@routes.get('/verify')
async def get_verify(request):
    query = get_request_query(request)
    code = None if ('code' not in query) else query['code'][0]
    user_id = None if ('id' not in query) else query['id'][0]

    if code is None or user_id is None:
        return web.Response(status=400, text='Account Verification Failed')

    user_id = ObjectId(user_id)
    user_info = db_user.find_one({'_id': user_id})
    if user_info is None or user_info['verification_code'] != code:
        return web.Response(status=400, text='Account Verification Failed')

    db_user.update_one({'_id': user_id}, {'$set': {'verified': True}})

    return web.Response(status=200, text='Account Verified')

# log-in request handler
@routes.get('/login')
async def get_login(request):
    query = get_request_query(request)
    user_info = None if ('user_info' not in query) else query['user_info'][0]

    if user_info is None:
        return web.Response(status=400, text='incorrect log-in request')

    user_info = json.loads(user_info)
    if not isinstance(user_info, dict):
        return web.Response(status=400, text='incorrect user_info in log-in request')

    result = db_user.find_one({'email': user_info['email'],
        'password': user_info['password']})

    if result is None:
        return web.Response(status=404, text='Login Failed')

    return web.Response(status=200, text='Login Succeeded')

# get post list request handler
@routes.get('/get/post_summary_list')
async def get_post_summary_list(request):
    query = get_request_query(request)
    user_info = None if ('user_info' not in query) else query['user_info'][0]
    tags = [] if ('tags' not in query) else json.loads(query['tags'])

    result = []
    for tag in tags:
        tmp = [ x for x in db_tag.find({'tag': tag}) ]
        if not result:
            result = tmp
        else:
            result = interesection(result, tmp)

    tmp = []
    for idx in result:
        x = db_post.find_one({'_id': ObjectId(idx)})
        tmp.append(x['post_summary'])
    result = tmp

    return web.Response(status=200, text=json.dumps(result))

# get post request handler
@routes.get('/get/post')
async def get_post(request):
    query = get_request_query(request)
    post_id = query['post_id'][0]

    result = db_post.find_one({'_id': ObjectId(post_id)})

    if result is None:
        return web.Response(status=404, text='No Result Found')

    return web.Response(status=200, text=json.dumps(result))

# get answer request handler
@routes.get('/get/answer')
async def get_answer(request):
    query = get_request_query(request)
    answer_id = query['answer_id'][0]

    result = db_answer.find_one({'_id': ObjectId(answer_id)})

    if result is None:
        return web.Response(status=404, text='No Result Found')

    return web.Response(status=200, text=json.dumps(result))

# get pic request handler
@route.get('/get/pic')
async def get_pic(request):
    query = get_request_query(request)
    pic_id = query['pic_id'][0]

    result = db_pic.find_one({'_id': ObjectId(pic_id)})

    if result is None:
        return web.Response(status=404, text='No Result Found')

    return web.Response(status=200, text=result['blob'])

# post post request handler
@routes.post('/post/post')
async def post_post(request):
    pass


# post answer request handler
@routes.post('/post/answer')
async def post_answer(request):
    pass

# post 

# profile request handler
@routes.get('/get/profile')
async def get_profile(request):
    query = get_request_query(request)
    user_info = None if ('user_info' not in query) else query['user_info'][0]

    if user_info is None:
        return web.Response(status=400, text='incorrect profile request')

    user_info = json.loads(user_info)
    if not isinstance(user_info, dict):
        return web.Response(status=400, text='incorrect user_info in home request')

    result = None
    if 'user_id' in user_info:
        result = db_user.find_one({'_id': ObjectId('user_id')})
    elif 'email' in user_info:
        result = db_user.find_one({'email': user_info['email']})

    if result is None:
        return web.Response(status=404, text='No Result Found')

    return web.Response(status=200, text=json.dumps(result))

app = web.Application()
app.add_routes(routes)
web.run_app(app)