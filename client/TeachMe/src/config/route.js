import { createBottomTabNavigator, createStackNavigator, createAppContainer,
    createSwitchNavigator } from 'react-navigation';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import Register from '../screens/Register'
import Login from '../screens/Login'
import ProfilePage from '../screens/ProfilePage'
import Home from '../screens/Home'
import PostPage from '../screens/PostPage'
import AnswerPage from "../screens/AnswerPage"
import SelectTagsPage from "../screens/SelectTagsPage/SelectTagsPage"
import Post from "../screens/Post"

const HomeScreenStack = createStackNavigator(
  {
    HomeScreen: Home,
    PostScreen: Post,
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return <Icon name="home" size={20} color={focused ? '#2196F3' : '#808080'}/>
      }
    }
  }
)

const AddPostStack = createStackNavigator(
  {
    AddPostScreen: PostPage,
    SelectTagsScreen: SelectTagsPage,    
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return <Icon name="plus" size={20} color={focused ? '#2196F3' : '#808080'}/>
      },
    }
  }
)

const ProfileScreenSwitch = createSwitchNavigator(
  {
    ProfileScreen: ProfilePage,
    LoginScreen: Login,
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return <Icon name="user" size={20} color={focused ? '#2196F3' : '#808080'}/>
      }
    }
  }
)

const AppSwitch = createBottomTabNavigator({
    HomeScreen: HomeScreenStack,
    AddPostScreen: AddPostStack,
    ProfileScreen: ProfileScreenSwitch,
});

const AuthStack = createStackNavigator({
  SignIn: Login,
  SignUp: Register
});

export default createAppContainer(createSwitchNavigator(
  {
    Auth: AuthStack,
    BottomTab: AppSwitch,
  },
  {
    initialRouteName: 'Auth',
  }
));


// const bottomTabNavigator = createBottomTabNavigator({
//     Home: createStackNavigator({
//             Home: {
//                 screen: Home,
//             },
//             Post: {
//                 screen: Post,
//             }
//         }),
//     // Home: Home,
//     NewPost: {
//         screen: PostPage
//     },
//     // ProfilePage: {
//     //     screen: createSwitchNavigator(
//     //     {
//     //         ProfilePage: ProfilePage,
//     //         Login: Login
//     //     }
//     // )},
//     ProfilePage: {
//         screen: ProfilePage
//     }
// });

// const AppNavigator = createStackNavigator({
//     Login: createSwitchNavigator(
//         {
//             Login: Login,
//             BottomTab: bottomTabNavigator
//         },
//     ),
//     SignUp: Register
// })

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


// export default createAppContainer(AppNavigator);