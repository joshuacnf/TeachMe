import { createStackNavigator, createAppContainer } from 'react-navigation';

import Register from '../screens/Register'
import Login from '../screens/Login'
import Home from '../screens/Home';
import Post from '../screens/Post';
import {PostPage} from '../screens/PostPage/index';
import {AnswerPage} from '../screens/AnswerPage/index';
import {SelectTagsPage} from '../screens/SelectTagsPage/index';

const AppNavigator = createStackNavigator({
    SignUp: { 
        screen: Register 
    },
    Login: { 
        screen: Login 
    },
    Home: { 
        screen: Home 
    },
    Post: {
        screen: Post
    },
    AnswerPage:{
        screen: AnswerPage
    },
    SelectTagsPage:{
        screen:SelectTagsPage
    },
    PostPage:{
        screen: PostPage
    },
});

export default createAppContainer(AppNavigator);