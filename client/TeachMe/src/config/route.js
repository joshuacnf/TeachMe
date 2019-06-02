import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from '../screens/Home';
import Post from '../screens/Post';
import {PostPage} from '../screens/PostPage/index';
import {AnswerPage} from '../screens/AnswerPage/index';
import {SelectTagsPage} from '../screens/SelectTagsPage/index';
import {ProfilePage} from '../screens/ProfilePage/index';

const AppNavigator = createStackNavigator({
    Profile:{
        screen:ProfilePage
    },
    PostPage:{
        screen: PostPage
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