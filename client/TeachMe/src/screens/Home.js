import React, {Component} from 'react';
import { View, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Card } from '@shoutem/ui/components/Card'

import styles from './style';
import axios from 'axios';

export default class Home extends Component {
    static navigationOptions = {
      title: 'Home'
    }

    componentWillMount() {
        axios.get('http://18.221.224.217:8080/get/post_summary_list', {params:{user_id: "5cf618e0f3295c559afd3281"}})
            .then(res => {
                this.setState({posts: res.data});
            })
    }
  
    constructor(props) {
        super();
        this.navigation = props.navigation;
        this.state = {
            search: '',
            posts: [],
        }
    }
    
    _renderItem = item => {
        return (
            <TouchableOpacity onPress = {()=>this._showPost(item.post_id)}>
                <Card>
                    <Text style={{ marginBottom: 10 }}>
                        {item.title}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                        {item.user_info.last_name}
                    </Text>
                </Card>
            </TouchableOpacity>
        );
    }
    _updateSearch = search => {
        this.setState({search});
    }

    _showPost = post_id => {
        this.navigation.navigate('Post', {post_id: post_id});
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
                    data={this.state.posts}
                    renderItem={({item}) => this._renderItem(item)}
                    keyExtractor={(item, index) => item.author}
                />

                <Button 
                    title="Add Question" 
                    onPress={() => this.navigation.navigate('PostPage')} 
                    style={styles.buttonText}
                />
            </View>
        );
    }
}