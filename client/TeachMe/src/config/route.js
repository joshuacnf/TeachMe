import { createBottomTabNavigator, createStackNavigator, createAppContainer,
    createSwitchNavigator } from 'react-navigation';

import Register from '../screens/Register'
import Login from '../screens/Login'
import ProfilePage from '../screens/ProfilePage'
import Home from '../screens/Home'
import PostPage from '../screens/PostPage'
import AnswerPage from "../screens/AnswerPage"
import Post from "../screens/Post"

const bottomTabNavigator = createBottomTabNavigator({
    Home: {
        screen: Home
    },
    NewPost: {
        screen: PostPage
    },
    ProfilePage: createSwitchNavigator(
        {
            ProfilePage: ProfilePage,
            Login: Login
        }
    ),
});

const AppNavigator = createStackNavigator({
    Login: createSwitchNavigator(
        {
            Login: Login,
            BottomTab: bottomTabNavigator
        },
    ),
    SignUp: {
        screen: Register
    },
})

// const AppNavigator = createStackNavigator({
//     Login: {
//         screen: Login
//     },
//     SignUp: {
//         screen: Register
//     },
//     ScreenBottomTab: bottomTabNavigator,
//     ProfilePage: {
//         screen: ProfilePage,
//     },
//     AnswerPage: {
//         screen: AnswerPage,
//     },
//     Post: {
//         screen: Post,
//     },
// }, {
//     headerMode: 'none'
// });


export default createAppContainer(AppNavigator);