import {
  createBottomTabNavigator, createStackNavigator, createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import React, { Component } from 'react';
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
import ContactPage from '../screens/ContactPage'
import Rank from '../screens/Rank'
import OtherProfilePage from '../screens/OtherProfilePage'

const HomeTabStack = createStackNavigator(
  {
    HomeScreen: Home,
    PostScreen: Post,
    PostProfileScreen: ProfilePage,
    AnswerScreen: AnswerPage,
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return <Icon name="home" size={30} color={focused ? '#2196F3' : '#808080'} />
      }
    }
  }
)

const AddPostTabStack = createStackNavigator(
  {
    AddPostScreen: PostPage,
    SelectTagsScreen: SelectTagsPage,
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return <Icon name="plus" size={30} color={focused ? '#2196F3' : '#808080'} />
      },
    }
  }
)

const IMTabStack = createStackNavigator(
  {
    ContactScreen: ContactPage,
    ChatScreen: ChatPage,
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return <Icon name="bubbles" size={30} color={focused ? '#2196F3' : '#808080'} />
      }
    }
  }
)

const ProfileTabStack = createStackNavigator(
  {
    ProfileScreen: ProfilePage,
    ChatScreen: ChatPage,
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return <Icon name="user" size={30} color={focused ? '#2196F3' : '#808080'} />
      }
    }
  }
)

const RankTabStack = createStackNavigator(
  {
    RankScreen: Rank,
    OtherProfileScreen: OtherProfilePage,
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return <Icon name="trophy" size={30} color={focused ? '#2196F3' : '#808080'} />
      },
    }
  }
)

const AppSwitch = createBottomTabNavigator({
  HomeTab: HomeTabStack,
  AddPostTab: AddPostTabStack,
  IMTab: IMTabStack,
  ProfileTab: ProfileTabStack,
  RankTab: RankTabStack,
},
  {
    tabBarOptions: {
      showLabel: false,
    }
  }
);

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