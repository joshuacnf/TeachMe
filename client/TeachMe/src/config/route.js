import { createStackNavigator, createAppContainer } from 'react-navigation';

import Register from '../screens/Register'
import Login from '../screens/Login'
import Home from '../screens/Home';
import Post from '../screens/Post';
import {PostPage} from '../screens/PostPage/index';
import {AnswerPage} from '../screens/AnswerPage/index';
import {SelectTagsPage} from '../screens/SelectTagsPage/index';
import {ProfilePage} from '../screens/ProfilePage/index';
import {ChatPage} from '../screens/ChatPage/index';


const AppNavigator = createStackNavigator({
    
    Profile:{
        screen:ProfilePage
    },
    ChatPage:{
        screen:ChatPage
    },
    SignUp: { 
        screen: Register 
    },
    PostPage:{
        screen: PostPage
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
    Home: { 
        screen: Home 
    },
    AnswerPage:{
        screen: AnswerPage
    },
    SelectTagsPage:{
        screen:SelectTagsPage
    },
    
});

export default createAppContainer(AppNavigator);