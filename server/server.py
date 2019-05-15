import aiohttp
import asyncio
from aiohttp import web

import urllib
from urllib.parse import urlparse

import json

def get_request_query(request):
    query = urllib.parse.urlparse(str(request.url)).query
    query = urllib.parse.parse_qs(query)
    return query

routes = web.RouteTableDef()

@routes.get('/register')
async def register(request):
    query = get_request_query(request)
    user_info = None if ('user-info' not in query) else query['user-info'][0]

    if user_info == None:
        resp = 'incorrect registration request'
    else:
        resp = user_info

    return web.Response(text=resp)

@routes.get('/log-in')
async def log_in(request):
    print('!!!')
    query = get_request_query(request)
    user_info = None if ('user-info' not in query) else query['user-info'][0]
    print('!!!!')

    if user_info is None:
        return web.Response(text='incorrect log-in request')

    print(user_info)
    user_info = json.loads(user_info)
    if not isinstance(user_info, dict):
        return web.Response(text='incorrect user-info in log-in request')

    email = user_info['email']
    passwd = user_info['passwd']
    resp = 'email: ' + email + '\n'
    resp += 'passwd: ' + passwd + '\n'
    return web.Response(text=resp)


@routes.get('/get/{info}')
async def get(request):
    pass

app = web.Application()
app.add_routes(routes)
web.run_app(app)