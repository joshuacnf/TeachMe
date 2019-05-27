import React, {Component} from 'react';
import { View, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import { Card, SearchBar } from 'react-native-elements';

import styles from './style'

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
    };
  
    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {
            search: '',
            data: posts,
        }
    }
    
    _renderItem = item => {
        return (
            <TouchableOpacity 
                onPress = {this._showPost}
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

    _showPost = () => {
        this.navigation.navigate('Post');
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
                    data={this.state.data}
                    renderItem={({item}) => this._renderItem(item)}
                    keyExtractor={(item, index) => item.author}
                />

                <Button 
                    title="Post" 
                    onPress={() => this.navigation.navigate('Post')} 
                    style={styles.buttonText}
                />
            </View>
        );
    }
}