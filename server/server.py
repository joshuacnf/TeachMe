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
import time

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

mongo_client = pymongo.MongoClient('localhost', 27017)
db = mongo_client['db']

db_user = db['user']
db_tag = db['tag']
db_keyword = db['keyword']
db_post = db['post']
db_answer = db['answer']
db_pic = db['pic']
db_message = db['message']
db_chat = db['chat_summary']

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

def parse_email_address(s):
    p = s.find('@')
    if p == -1:
        return None
    q = s.find('.', p)
    if q == -1:
        return None
    # if s[q:] != '.edu':
    #     return None
    return s[p + 1: q]

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


########################### Request Handlers (GET) ###########################

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

    user_info['institution'] = parse_email_address(user_info['email'])
    if user_info['institution'] is None:
        return web.Response(status=400, text='Invalid email address')

    # if an email address is already in db, check whether it is verified or not
    result = db_user.find_one({'email': user_info['email']})
    if result is not None:
        if result['verified'] == True:
            return web.Response(status=200, text='Email Already Registered')
        if result['verified'] == False:
            db_user.delete_one({'_id': result['_id']})

    user_info['verified'] = False
    user_info['verification_code'] = generate_rand_string(64)
    user_info['pic_id'] = ''

    db_user.insert_one(user_info)
    db_user.update_one({'_id': user_info['_id']},
        {'$set': {'user_id': str(user_info['_id'])}})

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

# login request handler
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
        'password': user_info['password'], 'verified': True})

    if result is None:
        return web.Response(status=404, text='Login Failed')

    del result['_id']
    del result['password']
    return web.Response(status=200, text=json.dumps(result))

# get profile request handler
@routes.get('/get/profile')
async def get_profile(request):
    query = get_request_query(request)

    user_info = None
    if 'email' not in query:
        user_id = query['user_id'][0]
        user_info = db_user.find_one({'_id': ObjectId(user_id)})
    else:
        email = query['email'][0]
        user_info = db_user.find_one({'email': email})
        if user_info is None:
            return web.Response(status=404, text='No Result Found (profile)')

    del user_info['_id']
    del user_info['password']

    return web.Response(status=200, text=json.dumps(user_info))

# get post list request handler
@routes.get('/get/post_summary_list')
async def get_post_summary_list(request):
    query = get_request_query(request)
    user_id = query['user_id'][0]
    tags = [] if ('tags' not in query) else json.loads(query['tags'][0])

    inst = db_user.find_one({'_id': ObjectId(user_id)})['institution']

    result = []
    for tag in tags:
        tmp = db_tag.find_one({'tag': tag})['post_ids']
        if not result:
            result = tmp
        else:
            result = interesection(result, tmp)

    tmp = []
    for idx in result:
        x = db_post.find_one({'_id': ObjectId(idx),
            'post_summary.user_info.institution': inst})
        del x['_id']
        tmp.append(x['post_summary'])
    result = tmp

    if not tags:
        result = [ x['post_summary'] for x in db_post.find(
            {'post_summary.user_info.institution': inst}).sort(
                'post_summary.timestamp_update', pymongo.DESCENDING) ]

    return web.Response(status=200, text=json.dumps(result))

# get post request handler
@routes.get('/get/post')
async def get_post(request):
    query = get_request_query(request)
    print(str(request.url))
    print(query)
    post_id = query['post_id'][0]

    result = db_post.find_one({'_id': ObjectId(post_id)})

    if result is None:
        return web.Response(status=404, text='No Result Found')

    del result['_id']
    return web.Response(status=200, text=json.dumps(result))

# get answer request handler
@routes.get('/get/answer')
async def get_answer(request):
    query = get_request_query(request)
    answer_id = query['answer_id'][0]

    result = db_answer.find_one({'_id': ObjectId(answer_id)})

    if result is None:
        return web.Response(status=404, text='No Result Found')

    del result['_id']

    print(json.dumps(result))
    return web.Response(status=200, text=json.dumps(result))

# get pic request handler
@routes.get('/get/pic')
async def get_pic(request):
    query = get_request_query(request)
    pic_id = query['pic_id'][0]

    result = db_pic.find_one({'_id': ObjectId(pic_id)})

    if result is None:
        return web.Response(status=404, text='No Result Found')

    return web.Response(status=200, text=result['b64'])

# get chat request handler
# get the full chat history between user1 and user2
@routes.get('/get/chat')
async def get_chat(request):
    query = get_request_query(request)
    user1_id, user2_id = query['user1_id'][0], query['user2_id'][0]

    result = db_message.find({'$or': [
        {'from': user1_id, 'to': user2_id},
        {'from': user2_id, 'to': user1_id}
    ]}).sort('timestamp', pymongo.DESCENDING)

    result = list(result)
    for doc in result:
        del doc['_id']

    return web.Response(status=200, text=json.dumps(result))

# get chat_summary_list request handler
# get the chat_sumary_list for a user
@routes.get('/get/chat_summary_list')
async def get_chat_summary_list(request):
    query = get_request_query(request)
    user_id = query['user_id'][0]

    result = db_chat.find({'$or': [
        {'from': user_id},
        {'to': user_id}
    ]}).sort('timestamp', pymongo.ASCENDING)

    tmp = []
    result = list(result)
    for doc in result:
        del doc['_id']
        contact_id = doc['from'] if doc['to'] == user_id else doc['to']
        contact_info = db_user.find_one({'_id': ObjectId(contact_id)})
        del contact_info['_id']
        del contact_info['password']
        tmp.append({'contact_info': contact_info,
                    'message': doc})
    result = tmp

    print(json.dumps(result, indent=2))
    return web.Response(status=200, text=json.dumps(result))

########################### Request Handlers (POST) ###########################

# post post request handler
@routes.post('/post/post')
async def post_post(request):
    post = await request.json()

    post['pic_ids'] = []
    post['answer_ids'] = []
    post['post_summary']['timestamp_create'] = int(time.time() * 1000)
    post['post_summary']['timestamp_update'] = post['post_summary']['timestamp_create']

    author_id = post['post_summary']['user_info']['user_id']
    print('author_id: {}'.format(author_id))
    author_info = db_user.find_one({'_id': ObjectId(author_id)})
    del author_info['_id'], author_info['password']
    post['post_summary']['user_info'] = author_info

    if 'pics' in post:
        for p in post['pics']:
            doc = {'b64': p}
            with open('res', 'a+') as f:
                f.write(p + '\n')
            db_pic.insert_one(doc)
            post['pic_ids'].append(str(doc['_id']))
        del post['pics']

    db_post.insert_one(post)
    post_id = str(post['_id'])
    db_post.update_one({'_id': ObjectId(post_id)},
        {'$set': {'post_summary.post_id': post_id}})

    post_summary = post['post_summary']

    for tag in post_summary['tags']:
        if db_tag.find_one({'tag': tag}) is None:
            db_tag.insert_one({'tag': tag, 'post_ids': []})
        db_tag.update_one({'tag': tag},
            {'$push': {'post_ids': post_id}})

    title = post_summary['title']
    title = title.replace(',', '').replace('.', '').replace('?', '')
    title = title.replace(':', '').replace(';', '').replace('\"', '').replace('\'', '')
    title = title.replace('$', '').replace('%', '').replace('*', '')
    keywords = (' '.join(title.split(' '))).split(' ')
    for keyword in keywords:
        if db_keyword.find_one({'keyword': keyword}) is None:
            db_keyword.insert_one({'keyword': keyword, 'post_ids': []})
        db_keyword.update_one({'keyword': keyword},
            {'$push': {'post_ids': post_id}})

    return web.Response(status=200, text='success (post)')

# post answer request handler
@routes.post('/post/answer')
async def post_answer(request):
    answer = await request.json()
    answer['pic_ids'] = []
    answer['timestamp_create'] = int(time.time() * 1000.0)

    if 'pics' in answer:
        for p in answer['pics']:
            doc = {'img64': p}
            db_pic.insert_one(doc)
            answer['pic_ids'].append(str(doc['_id']))
        del answer['pics']

    db_answer.insert_one(answer)
    answer_id = str(answer['_id'])
    db_answer.update_one({'_id': ObjectId(answer_id)},
        {'$set': {'answer_id': answer_id}})

    post_id = answer['post_id']
    db_post.update_one({'_id': ObjectId(post_id)},
        {'$push': {'answer_ids': answer_id}})

    return web.Response(status=200, text='success (answer)')

# post profile_pic request handler
@routes.post('/post/profile_pic')
async def post_profile_pic(request):
    query = get_request_query(request)
    user_id = query['user_id'][0]

    pic = await request.text()

    print(user_id)
    print('post_pic: {}'.format(pic))

    user_info = db_user.find_one({'_id': ObjectId(user_id)})
    if 'pic_id' in user_info:
        db_pic.replace_one({'_id': ObjectId(user_info['pic_id'])}, 
            {'b64': pic})
    else:
        doc = {'b64': pic}
        db_pic.insert_one(doc)
        pic_id = str(doc['_id'])
        db_user.update_one({'_id': ObjectId(user_id)},
            {'$set': {'pic_id': pic_id}})

    return web.Response(status=200, text='success (profile_pic)')

# post message request handler
@routes.post('/post/message')
async def post_message(request):
    # query = get_request_query(request)
    # src_id, dst_id = query['from'][0], query['to'][0]

    msg = await request.json()
    print(msg)

    db_message.insert_one(msg)
    del msg['_id']

    # doc = db_chat.find_one({'from': msg['from'], 'to': msg['to']})
    # if doc is None:
    #     doc = db_chat.find_one({'from': msg['to'], 'to': msg['from']})

    # if doc is None:
    #     db_chat.insert_one(msg)
    # else:
    #     msg['_id'] = doc['_id']
    #     db_chat.replace_one({'_id': doc['_id']}, msg)

    db_chat.replace_one({'$or': [
        {'from': msg['from'], 'to': msg['to']},
        {'from': msg['to'], 'to': msg['from']}
        ]},
        msg,
        upsert=True)

    return web.Response(status=200, text='success (message sent)')

def main():
    app = web.Application()
    app.add_routes(routes)
    web.run_app(app)

if __name__ == '__main__':
    main()