import {
  createBottomTabNavigator, createStackNavigator, createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

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
        return <Icon name="home" size={25} color={focused ? '#2196F3' : '#808080'} />
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
        return <MaterialIcon name="add-circle" size={50} color='#2196F3' />
      },
    }
  }
)

const IMTabStack = createStackNavigator(
  {
    ContactScreen: ContactPage,
    ChatScreen: ChatPage,
    ProfileScreen: ProfilePage,
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return <Icon name="bubbles" size={25} color={focused ? '#2196F3' : '#808080'} />
      }
    }
  }
)

const ProfileTabStack = createStackNavigator(
  {
    ProfileScreen: ProfilePage,
    ChatScreen: ChatPage,
    PostScreen: Post
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return <Icon name="user" size={25} color={focused ? '#2196F3' : '#808080'} />
      }
    }
  }
)

const RankTabStack = createStackNavigator(
  {
    RankScreen: Rank,
    OtherProfileScreen: ProfilePage,
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return <Icon name="trophy" size={25} color={focused ? '#2196F3' : '#808080'} />
      },
    }
  }
)

const AppSwitch = createBottomTabNavigator({
  HomeTab: HomeTabStack,
  IMTab: IMTabStack,
  AddPostTab: AddPostTabStack,
  RankTab: RankTabStack,
  ProfileTab: ProfileTabStack,
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