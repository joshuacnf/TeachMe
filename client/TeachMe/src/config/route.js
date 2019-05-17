import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from '../screens/Home';
import Post from '../screens/Post'

const AppNavigator = createStackNavigator({
    Home: { 
        screen: Home 
    },
    Post: {
        screen: Post
    },
});

export default createAppContainer(AppNavigator);