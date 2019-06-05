import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import Home from '../screens/Home';
import {PostPage} from '../screens/PostPage/index';
import ProfilePage from '../screens/ProfilePage';

const TabNavigator = createBottomTabNavigator({
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
},);

export default createAppContainer(TabNavigator);