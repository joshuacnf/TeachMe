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
import ChatPage from '../screens/ChatPage/ChatPage';
import Rank from '../screens/Rank'
import OtherProfilePage from '../screens/OtherProfilePage'

const HomeScreenStack = createStackNavigator(
  {
    HomeScreen: Home,
    PostScreen: Post,
    AnswerScreen: AnswerPage,
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

const ChatScreenStack = createStackNavigator(
  {
    ChatScreen: ChatPage
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return <Icon name="bubbles" size={20} color={focused ? '#2196F3' : '#808080'}/>
      }
    }
  }
)

const ProfileScreenStack = createStackNavigator(
  {
    ProfileScreen: ProfilePage,
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return <Icon name="user" size={20} color={focused ? '#2196F3' : '#808080'}/>
      }
    }
  }
)

const RankScreentStack = createStackNavigator(
  {
    RankScreen: Rank,
    OtherProfileScreen: OtherProfilePage,    
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return <Icon name="trophy" size={20} color={focused ? '#2196F3' : '#808080'}/>
      },
    }
  }
)

const AppSwitch = createBottomTabNavigator({
    HomeScreen: HomeScreenStack,
    AddPostScreen: AddPostStack,
    ChatScreen: ChatScreenStack,
    ProfileScreen: ProfileScreenStack,
    RankScreen: RankScreentStack,
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