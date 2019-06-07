import json
import requests
import base64
import random
import string
import os

def generate_rand_string(len):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=len))

url_prefix = 'http://0.0.0.0:8080'

user_info1 = {
    'email': 'kenkenken',
    'last_name': 'Ken',
    'first_name': 'Xu',
    'password': '123456'
}

user_info2 = {
    'email': 'ken@ggg.com',
    'last_name': 'Ken',
    'first_name': 'Xu',
    'password': '123456'
}

user_info3 = {
    'email': 'ken@some.edu',
    'last_name': 'Ken',
    'first_name': 'Xu',
    'password': '123456'
}

user_info4 = {
    'email': 'ken@some.edu',
    'last_name': 'Ken',
    'first_name': 'Xu',
    'password': '111111'
}

user_info5 = {
    'email': 'Joshua@some.edu',
    'last_name': 'Joshua',
    'first_name': 'Zhang',
    'password': '123456'
}


post1_summary = {
    'user_info': user_info1,
    'title': 'Developers should strongly prefer inheritance to delegation.',
    'tags': ['CS 130', 'Eggert']
}

post1 = {
    'post_summary': post1_summary,
    'content': 'Multiple inheritance, mixins and traits are more cost-effective than just single inheritance and interfaces.',
    'pics': []
}

post2_summary = {
    'user_info': user_info1,
    'title': 'To improve software quality, pair programming is more cost-effective than formal inspection.',
    'tags': ['Debate']
}

post2 = {
    'post_summary': post2_summary,
    'content': 'Every file or similar component in a software project should contain a version string that is updated when the component changes.',
    'pics': []
}

def get_register_test(user_info):
    url = url_prefix + '/register?user_info={}'.format(json.dumps(user_info))
    res = requests.get(url=url)
    #print(res.status_code, res.text)
    return(res.status_code, res.text)

def get_verify_test(code):
    url = url_prefix + '/verify?code={}'.format(code)
    res = requests.get(url=url)
    #print(res.status_code, res.text)
    return(res.status_code, res.text)

def get_login_test(user_info):
    url = url_prefix + '/login?user_info={}'.format(json.dumps(user_info))
    res = requests.get(url=url)
    #print(res.status_code, res.text)
    return(res.status_code, res.text)

def get_profile_test(user_info):
    url = url_prefix + '/get/profile?email={}'.format(user_info['email'])
    res = requests.get(url=url)
    # print(res.status_code, res.text)
    if res.status_code != 200:
        return(res.status_code, res.text)
    else: 
        return(res.status_code, json.loads(res.text))

def get_pic_test(pic_id, target_pic):
    url = url_prefix + '/get/pic?pic_id={}'.format(pic_id)
    res = requests.get(url=url)
    print(res.status_code)

    with open('tmp.jpg', 'wb') as f:
        f.write(base64.decodestring(res.text.encode()))
    
    os.system('diff tmp.jpg {}'.format(target_pic))
    os.system('rm tmp.jpg')

    return (res.status_code, res.text)

def get_chat_summary_list_test(user_id):
    url = url_prefix + '/get/chat_summary_list?user_id={}'.format(user_id)
    res = requests.get(url=url)

    # print(res.status_code, json.dumps(res.json(), indent=2))
    return(res.status_code, json.loads(res.text))

def get_rank_test(user_id):
    url = url_prefix + '/get/rank?user_id={}'.format(user_id)
    res = requests.get(url=url)

    # print(res.status_code, json.dumps(res.json(), indent=2))
    return(res.status_code, json.loads(res.text))

def get_chat_test(uid, vid):
    url = url_prefix + '/get/chat?user1_id={}&user2_id={}'.format(uid, vid)

    res = requests.get(url=url)
    # print(res.status_code, json.dumps(res.json(), indent=2))
    return (res.status_code, json.loads(res.text))

def get_post_summary_list_test(user_id, tags=[]):
    url = url_prefix + '/get/post_summary_list?user_id={}&tags={}'.format(
        user_id, json.dumps(tags))

    res = requests.get(url=url)
    # print(res.status_code, json.dumps(res.json(), indent=2))
    return(res.status_code, json.loads(res.text))

def get_post_test(post_id):
    url = url_prefix + '/get/post?post_id={}'.format(post_id)

    res = requests.get(url=url)
    #print(res.status_code, json.dumps(res.json(), indent=2))
    if res.status_code != 200:
        # print(res.status_code, res.text)
        return(res.status_code, res.text)
    else:
        return(res.status_code, json.loads(res.text))

def get_answer_test(answer_id):
    url = url_prefix + '/get/answer?answer_id={}'.format(answer_id)

    res = requests.get(url=url)
    #print(res.status_code, json.dumps(res.json(), indent=2))
    if res.status_code != 200:
        # print(res.status_code, res.text)
        return(res.status_code, res.text)
    else:
        return(res.status_code, json.loads(res.text))

def post_profile_pic_test(user_info, file_name):
    url = url_prefix + '/get/profile?email={}'.format(user_info['email'])
    res = requests.get(url=url)
    user_info = res.json()
    print(res.status_code, res.text, user_info)
    url = url_prefix + '/post/profile_pic?user_id={}'.format(user_info['user_id'])
    pic_b64 = base64.encodestring(open(file_name, 'rb').read()).decode('ascii')
    res = requests.post(url=url, data=pic_b64)
    print(res.status_code, res.text)
    return(res.status_code, res.text)

def post_post_test(user_info, title='default title', tags=[],
        content='default question'):
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

    res = requests.post(url=url, json=post)
    #print(res.status_code, res.text)
    return(res.status_code, res.text)

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
    return(res.status_code, res.text)

def post_message_test(sender, receiver, content):
    url = url_prefix + '/post/message'

    msg = {
        'from': sender,
        'to': receiver,
        'content': content
    }

    res = requests.post(url=url, json=msg)
    return(res.status_code, res.text)

def main():
    error = 0

    print('=================== Test Registeration =====================')
    print('Test 1: Invalid Email Address')
    status, text = get_register_test(user_info1)
    if status != 400:
        error+=1
        print("Test 1 fails")
    else:
        print("...passed")

    # print('Test 2: Not Institution Registeration')
    # status, text = get_register_test(user_info2)
    # if status != 403 or text != 'Not Institution Email':
    #     error+=1
    #     print("Test 2 fails")
    # else:
    #     print("...passed")

    print('Test 3: Valid Registeration')
    status, text = get_register_test(user_info3)
    if status != 200 or text != 'Registration Request Completed':
        error+=1
        print("Test 3 fails")
    else:
        print("...passed")

    '''
    print('Test 4: Repeated Registeration')
    status, text = get_register_test(user_info3)
    if status != 200 or text != 'Email Already Registered':
        error+=1
        print("Test 4 fails")
    else:
        print("...passed")

    get_register_test(user_info5)
    '''

    print('=================== Test Verification =====================')
    print('Test 5: Verification')
    status, uid = get_verify_test('code')
    if status != 400:
        error+=1
        print("Test 5 fails")
    else:
        print("...passed")


    print('=================== Test Login =====================')
    print('Test 6: Not Registered Account Login')
    status, text = get_login_test(user_info1)
    if status != 404 or text != 'Login Failed':
        error+=1
        print("Test 6 fails")
    else:
        print("...passed")

    print('Test 7: Wrong Password Login')
    status, text = get_login_test(user_info4)
    if status != 404 or text != 'Login Failed':
        error+=1
        print("Test 7 fails")
    else:
        print("...passed")

    print('=================== Test Profile Get =====================')
    print('Test 8: Not Existed User Request')
    status, text = get_profile_test(user_info1)
    if status != 404 or text != 'No Result Found (profile)':
        error+=1
        print("Test 8 fails")
    else:
        print("...passed")
    
    print('Test 9: Valid User Request')
    status, profile = get_profile_test(user_info3) # here profile will be used for other tests
    if status != 200:
        error+=1
        print("Test 9 fails")
    else:
        print("...passed")

    '''
    print('=================== Test Profile Picture Post =====================')
    print('Test 8: Valid Profile Picture Post')
    status, text = post_profile_pic_test(profile, 'test_profile.jpg')
    if status != 200 or text != 'success (profile_pic)':
        error+=1
        print("Test 8 fails")
    else:
        print("...passed")

    
    print('=================== Test Picture Get =====================')
    print('Test 11: Not Existed Picture Request')
    status, text = get_pic_test(profile['pic_id']+profile['pic_id'], 'test_profile.jpg')
    if status != 404 or text != 'No Result Found':
        error+=1
        print("Test 11 fails")
    else:
        print("...passed")

    print('Test 12: Valid Picture Request')
    status, text = get_pic_test(profile['pic_id'], 'test_profile.jpg')
    if status != 200:
        error+=1
        print("Test 12 fails")
    else:
        print("...passed")

    get_pic_test(tmp['pic_id'], 'test_profile.jpg')
    '''

    print('=================== Test Post Post =====================')
    print('Test 14: Valid Post')
    status, text =  post_post_test(user_info=profile, title=post1_summary['title'],
        tags=post1_summary['tags'], content=post1['content'],)
    if status != 200 and text != 'success (post)':
        error+=1
        print("Test 14 fails")
    else:
        print("...passed")

    print('=================== Test Post Summary Get =====================')
    print('Test 15: Valid Post Summary List Get')
    status, post_summaries = get_post_summary_list_test(user_id=profile['user_id'])
    if status != 200:
        error+=1
        print("Test 15 fails")
    else:
        print("...passed")

    print('=================== Test Answer Post =====================')
    print('Test 16+: Valid Answer Post')
    for post_summary in post_summaries:
        post_id = post_summary['post_id']
        # print(type(post_id))
        status, user_info = get_profile_test(user_info5)
        status, text = post_answer_test(user_info=user_info, post_id=post_id,
            content=generate_rand_string(100))
        if status != 200 and text != 'success (answer)':
            error+=1
            print("Test 16 fails")
        else:
            print("...passed")
    
    print('=================== Test Post Get =====================')
    print('Test 17: Not Existed Post Get')
    status, text = get_post_test('0123456789ab0123456789ab')
    if status != 404 or text != 'No Result Found':
        error+=1
        print("Test 17 fails")
    else:
        print("...passed")

    print('Test 18+: Valid Post Get')
    for post_summary in post_summaries:
        status, text = get_post_test(post_summary['post_id'])
        if status != 200:
            error+=1
            print("Test 18 fails")
        else:
            print("...passed")

    print('=================== Test Answer Get =====================')
    print('Test 19: Not Existed Answer Get')
    status, text = get_answer_test('0123456789ab0123456789ab')
    if status != 404 or text != 'No Result Found':
        error+=1
        print("Test 19 fails")
    else:
        print("...passed")
    
    print('Test 20+: Valid Post Get')
    for post_summary in post_summaries:
        status, text = get_post_test(post_summary['post_id'])
        for answer in text['answer_ids']:
            status, text = get_answer_test(answer)
            if status != 200:
                error+=1
                print("Test 20 fails")
            else:
                print("...passed")

    print('=================== Test Another User Post =====================')
    print('Test 21+: Valid Post Post')
    status, user_info = get_profile_test(user_info5)
    u = user_info['user_id']
    status, text = get_post_summary_list_test(user_id=u)
    if status != 200:
        error+=1
        print("Test 21 fails")
    else:
        print("...passed")
        #print(text)

    post_post_test(user_info=user_info, title=post2_summary['title'],
        tags=post2_summary['tags'], content=post2['content'],)
    status, text = get_post_summary_list_test(user_id=u)
    if status != 200:
        error+=1
        print("Test 21 fails")
    else:
        print("...passed")
        #print(text)

    print('=================== Test Chat Post =====================')
    print('Test 22: Valid Chat')
    status, profile1 = get_profile_test(user_info3)
    status, profile2 = get_profile_test(user_info5)
    uid1, uid2 = profile1['user_id'], profile2['user_id']
    status, text = post_message_test(uid1, uid2, 'UCLA')
    if status != 200:
        error+=1
        print("Test 22.1 fails")
    else:
        print("...passed")
    status, text = post_message_test(uid2, uid1, 'USC')
    if status != 200:
        error+=1
        print("Test 22.2 fails")
    else:
        print("...passed")
    status, text = post_message_test(uid1, uid2, 'UCLA UCLA')
    if status != 200:
        error+=1
        print("Test 22.3 fails")
    else:
        print("...passed")
    status, text = post_message_test(uid1, uid2, 'UCLA UCLA UCLA')
    if status != 200:
        error+=1
        print("Test 22.4 fails")
    else:
        print("...passed")

    print('=================== Test Chat Get =====================')
    print('Test 23: Valid Chat List Get')
    status, text = get_chat_summary_list_test(uid1)
    if status != 200:
        error+=1
        print("Test 23 fails")
    else:
        #print(text)
        print("...passed")

    print('Test 24: Valid Chat List Get')
    status, text = get_chat_test(uid1, uid2)
    if status != 200:
        error+=1
        print("Test 24 fails")
    else:
        #print(text)
        print("...passed")
    
    print('=================== Test Rnak Get =====================')
    print('Test 25: Valid Rank Get')
    status, text = get_chat_summary_list_test(uid1)
    if status != 200:
        error+=1
        print("Test 23 fails")
    else:
        #print(text)
        print("...passed")


    print('=================== Test Result =====================')
    if error == 0:
        print("...all tests passed!")
    else:
        print("the number of errors:", error)

if __name__ == '__main__':
    main()