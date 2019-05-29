import React, {Component} from 'react';
import { View, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Card } from '@shoutem/ui'

import styles from './style';
import axios from 'axios';

const posts = [
    {
        title: '1+1 = ?',
        details: '',
        author: 'Amy',
        time: Date.now(),
        postId: 1,
    },
    {
        title: '1+1 = ?',
        details: '',
        author: 'Bob',
        time: Date.now(),
        postId: 2,
    },
    {
        title: '1+1 = ?',
        details: '',
        author: 'Catherine',
        time: Date.now(),
        postId: 3,
    }
];

export default class Home extends Component {
    static navigationOptions = {
      title: 'Home'
    }

    componentDidMount() {
        axios.get('http://18.221.224.217:8080/register?')
            .then(res => {
                console.log(res);
                this.setState({posts: res.data});
            })
    }
  
    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {
            search: '',
            posts: {},
        }
    }
    
    _renderItem = item => {
        return (
            <TouchableOpacity 
                onPress = {this._showPost(item.postId)}
            >
                <Card
                >
                    <Text style={{ marginBottom: 10 }}>
                        {item.title}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                        {item.author}
                    </Text>
                </Card>
            </TouchableOpacity>
        );
    }
    _updateSearch = search => {
        this.setState({search});
    }

    _showPost = postId => {
        this.navigation.navigate('Post', {id: postId});
    }

    render() {
        return (
            <View 
                style={styles.container}
            >
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this._updateSearch}
                    value={this.state.search}
                    style={styles.search}
                />
                <FlatList
                    posts={this.state.posts}
                    renderItem={({item}) => this._renderItem(item)}
                    keyExtractor={(item, index) => item.author}
                />

                <Button 
                    title="Add Question" 
                    onPress={() => this.navigation.navigate('Post')} 
                    style={styles.buttonText}
                />
            </View>
        );
    }
}