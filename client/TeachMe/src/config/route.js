import { createBottomTabNavigator,createStackNavigator, createAppContainer } from 'react-navigation';

import Register from '../screens/Register'
import Login from '../screens/Login'
import ProfilePage from '../screens/ProfilePage'
import Home from '../screens/Home'
import PostPage from '../screens/PostPage'
import AnswerPage from "../screens/AnswerPage"
import Post from "../screens/Post"

const AppNavigator = createStackNavigator({
    Login: { 
        screen: Login 
    },
    SignUp: { 
        screen: Register 
    },
    ScreenBottomTab: 
        createBottomTabNavigator({
            Home: { 
                screen: Home 
            },
            NewPost: {
                screen: PostPage
            },
            Profile:{
                screen:ProfilePage
            },
        // Instant message
        }),
    ProfilePage: {
        screen: ProfilePage,
    },
    AnswerPage: {
        screen: AnswerPage,
    },
    Post: {
        screen: Post,
    },
}, {
    headerMode: 'none'
});

export default createAppContainer(AppNavigator);