import aiohttp
import asyncio
from aiohttp import web

import urllib
from urllib.parse import urlparse

import pymongo

import json

from email import mime

import authentication as auth
import home as home
import post as post

def get_request_query(request):
    query = urllib.parse.urlparse(str(request.url)).query
    query = urllib.parse.parse_qs(query)
    return query

def send_verification_email(user_info):
    from_addr = 'jsmith19960401@gmail.com'
    to_addr = user_info.email
    msg = mime.multipart.MIMEMultipart()
    msg['From'] = from_addr
    msg['To'] = to_addr
    msg['Subject'] = 'Verification Email from TeachMe'
    body = 'http://0.0.0.0:8080/verify?code={}&user_id={}'.format(12345, user_info.user_id)
    msg.attach(mime.text.MIMEText(body))

    server = smtplib.SMTP('smtp.gmail.com:587')
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login(from_addr, 'TeachMe123456')
    text = msg.as_string()
    server.sendmail(from_addr, to_addr, text)
    server.quit()


routes = web.RouteTableDef()
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]

@routes.get('/register')
async def register(request):
    query = get_request_query(request)
    user_info = None if ('user-info' not in query) else query['user-info'][0]

    if user_info is None:
        resp = 'incorrect registration request'
    else:
        resp = 'Done'

    return web.Response(text=resp)

@routes.get('/verify')
async def verify(request):
    query = get_request_query(request)
    code = None if ('code' not in query) else query['code'][0]
    user_info = None if ('user-info' not in query) else query['user-info'][0]

    if code is None or user_info is None:
        return web.Response(text='incorrect verification request')

    

@routes.get('/log-in')
async def log_in(request):
    query = get_request_query(request)
    user_info = None if ('user-info' not in query) else query['user-info'][0]

    if user_info is None:
        return web.Response(text='incorrect log-in request')

    print(user_info)
    user_info = json.loads(user_info)
    if not isinstance(user_info, dict):
        return web.Response(text='incorrect user-info in log-in request')

    email = user_info['email']
    passwd = user_info['passwd']

    ok = auth.checkLogin(mydb)
    if not ok:
        return web.Response(text="incorrect login account or password")

    resp = 'email: ' + email + '\n'
    resp += 'passwd: ' + passwd + '\n'
    resp += home.getHomePage(mydb)
    return web.Response(text=resp)

@routes.get('/post')
async def get(request):
    query = get_request_query(request)
    user_info = None if ('post-summary' not in query) else query['post-summary'][0]

    if post_summary is None:
        return web.Response(text='incorrect post request')

    post_summary = json.loads(post_summary)
    if not isinstance(post_summary, dict):
        return web.Response(text='incorrect post_summary in post request')
    
    ok = post.post(mydb, post_summary)
    if not ok:
        return web.Response(text="incorrect post context")


@routes.get('/answer')
async def get(request):
    query = get_request_query(request)
    answer = None if ('answer' not in query) else query['answer'][0]

    if answer is None:
        return web.Response(text='incorrect answer request')

    answer = json.loads(answer)
    if not isinstance(answer, dict):
        return web.Response(text='incorrect answer object in answer request')
    
    ok = post.post(mydb, answer)
    if not ok:
        return web.Response(text="incorrect answer context")

app = web.Application()
app.add_routes(routes)
web.run_app(app)