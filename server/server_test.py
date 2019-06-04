import json
import requests
import base64
import random
import string
import os

def generate_rand_string(len):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=len))

url_prefix = 'http://:8080'

user_info1 = {
    'email': '',
    'last_name': 'Katou',
    'first_name': 'Megumi',
    'password': '123456'
}

user_info2 = {
    'email': '',
    'last_name': 'Kasumigaoka',
    'first_name': 'Utaha',
    'password': '123456'
}

user_info3 = {
    'email': '',
    'last_name': 'Sawamura',
    'first_name': 'Eriri',
    'password': '123456'
}

post1_summary = {
    'user_info': user_info1,
    'title': 'What is the difference between a polynomial and a polynomial function?',
    'tags': ['MATH 115', 'Linear Algebra']
}

post1 = {
    'post_summary': post1_summary,
    'content': 'In mathematics, a polynomial is an expression consisting of variables (also called indeterminates) and coefficients, that involves only the operations of addition, subtraction, multiplication, and non-negative integer exponents of variables.',
    'pics': []
}

post2_summary = {
    'user_info': user_info1,
    'title': 'Is Razor good at countering Monkey King in midlane?',
    'tags': ['DOTA2']
}

post2 = {
    'post_summary': post2_summary,
    'content': 'I got destroyed by MK in midlane; I was wondering if Razor is a good option against MK',
    'pics': []
}

def get_register_test(user_info):
    url = url_prefix + '/register?user_info={}'.format(json.dumps(user_info))
    res = requests.get(url=url)
    print(res.status_code, res.text)

def get_login_test(user_info):
    url = url_prefix + '/login?user_info={}'.format(json.dumps(user_info))
    res = requests.get(url=url)
    print(res.status_code, res.text)

def get_profile_test(user_info):
    url = url_prefix + '/get/profile?email={}'.format(user_info['email'])
    res = requests.get(url=url)
    print(res.status_code, res.text)
    return json.loads(res.text)

def get_pic_test(pic_id, target_pic):
    url = url_prefix + '/get/pic?pic_id={}'.format(pic_id)
    res = requests.get(url=url)
    print(res.status_code)

    with open('tmp.jpg', 'wb') as f:
        f.write(base64.decodestring(res.text.encode()))
    
    os.system('diff tmp.jpg {}'.format(target_pic))
    os.system('rm tmp.jpg')

def get_chat_summary_list_test(user_id):
    url = url_prefix + '/get/chat_summary_list?user_id={}'.format(user_id)
    res = requests.get(url=url)

    print(res.status_code, json.dumps(res.json(), indent=2))
    return res.json()

def get_chat_test(uid, vid):
    url = url_prefix + '/get/chat?user1_id={}&user2_id={}'.format(uid, vid)

    res = requests.get(url=url)
    print(res.status_code, json.dumps(res.json(), indent=2))
    return res.json()

def get_post_summary_list_test(user_id, tags=[]):
    url = url_prefix + '/get/post_summary_list?user_id={}&tags={}'.format(
        user_id, json.dumps(tags))

    res = requests.get(url=url)
    print(res.status_code, json.dumps(res.json(), indent=2))
    return res.json()

def get_post_test(post_id):
    url = url_prefix + '/get/post?post_id={}'.format(post_id)

    res = requests.get(url=url)
    print(res.status_code, json.dumps(res.json(), indent=2))
    return res.json()

def post_profile_pic_test(user_info, file_name):
    url = url_prefix + '/get/profile?email={}'.format(user_info['email'])
    res = requests.get(url=url)
    user_info = res.json()

    url = url_prefix + '/post/profile_pic?user_id={}'.format(user_info['user_id'])
    pic_b64 = base64.encodestring(open(file_name, 'rb').read()).decode('ascii')
    res = requests.post(url=url, data=pic_b64)
    print(res.status_code, res.text)

def post_post_test(user_info, title='default title', tags=[],
        content='default question', file_name=''):
    url = url_prefix + '/post/post'

    post_summary = {
        'user_info': user_info,
        'title': title,
        'tags': tags
    }

    post = {
        'post_summary': post_summary,
        'content': content,
        'pics': []
    }

    if file_name != '':
        pic_b64 = base64.encodestring(open(file_name, 'rb').read()).decode('ascii')
        post['pics'].append(pic_b64)

    res = requests.post(url=url, json=post)
    print(res.status_code, res.text)

def post_answer_test(user_info, post_id, content='default answer', file_name=''):
    url = url_prefix + '/post/answer'
    answer = {
        'post_id': post_id,
        'user_info': user_info,
        'content': content,
        'pics': []
    }

    if file_name != '':
        pic_b64 = base64.encodestring(open(file_name, 'rb').read()).decode('ascii')
        answer['pics'].append(pic_b64)

    res = requests.post(url=url, json=answer)
    print(res.status_code, res.text)

def post_message_test(sender, receiver, content):
    url = url_prefix + '/post/message'

    msg = {
        'from': sender,
        'to': receiver,
        'content': content
    }

    res = requests.post(url=url, json=msg)
    print(res.status_code, res.text)

def main():
    print('=================== Test 1 =====================')
    get_register_test(user_info1)
    get_register_test(user_info2)
    get_register_test(user_info3)

    print('=================== Test 2 =====================')
    get_login_test(user_info1)

    print('=================== Test 3 =====================')
    get_profile_test(user_info1)

    print('=================== Test 4 =====================')
    post_profile_pic_test(user_info1, 'test_profile.jpg')

    print('=================== Test 5.1 =====================')
    tmp = get_profile_test(user_info1)
    print('=================== Test 5.2 =====================')
    get_pic_test(tmp['pic_id'], 'test_profile.jpg')

    print('=================== Test 6.1 =====================')
    user_info = get_profile_test(user_info1)
    post_post_test(user_info=user_info, title=post1_summary['title'],
        tags=post1_summary['tags'], content=post1['content'],
        file_name='test_post_pic.jpg')
    print('=================== Test 6.2 =====================')
    u = get_profile_test(user_info1)['user_id']
    tmp = get_post_summary_list_test(user_id=u)
    for post_summary in tmp:
        post_id = post_summary['post_id']
        user_info = get_profile_test(user_info2)
        post_answer_test(user_info=user_info, post_id=post_id,
            content=generate_rand_string(100))
    for post_summary in tmp:
        get_post_test(post_summary['post_id'])
    print('=================== Test 6.3 =====================')
    user_info = get_profile_test(user_info3)
    u = user_info['user_id']
    tmp = get_post_summary_list_test(user_id=u)
    post_post_test(user_info=user_info, title=post2_summary['title'],
        tags=post2_summary['tags'], content=post2['content'],
        file_name='test_post_pic.jpg')
    tmp = get_post_summary_list_test(user_id=u)

    print('=================== Test 7.1 =====================')
    user_info = get_profile_test(user_info1)
    pic_id = user_info['pic_id']
    get_pic_test(pic_id, 'test_profile.jpg')
    print('=================== Test 7.1 =====================')
    post_id = get_post_summary_list_test(user_info['user_id'])[0]['post_id']
    post = get_post_test(post_id)
    pic_id = post['pic_ids'][0]
    get_pic_test(pic_id, 'test_post_pic.jpg')

    print('=================== Test 8.1 =====================')
    u = get_profile_test(user_info1)
    v = get_profile_test(user_info2)
    u, v = u['user_id'], v['user_id']
    post_message_test(u, v, 'yzynb!')
    post_message_test(v, u, 'bbbbdqnb')
    post_message_test(u, v, 'ok')
    post_message_test(u, v, 'bdqnb')
    print('=================== Test 8.2 =====================')
    get_chat_summary_list_test(u)
    get_chat_test(u, v)

if __name__ == '__main__':
    main()