import { createStackNavigator, createAppContainer } from 'react-navigation';

import Register from '../screens/Register'
import Login from '../screens/Login'
import Home from '../screens/Home';
import Post from '../screens/Post';
import {PostPage} from '../screens/PostPage/index';
import {AnswerPage} from '../screens/AnswerPage/index';
import {SelectTagsPage} from '../screens/SelectTagsPage/index';
import ProfilePage from '../screens/ProfilePage';
import ScreenBottomTab from '../screens/ScreenBottomTab';

const AppNavigator = createStackNavigator({
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
    Profile:{
        screen:ProfilePage
    },
    PostPage:{
        screen: PostPage
    },
    SignUp: { 
        screen: Register 
    },
    ScreenBottomTab: {
        screen: ScreenBottomTab,
    },
});

export default createAppContainer(AppNavigator);