import React, {Component} from 'react';
import {View,Text,TextInput,Button,TouchableOpacity,ScrollView} from 'react-native';
import {styles} from './styles';
import TagButton from './TagButton';

class PostPage extends Component {
    constructor(props){
        super(props);
    }

    
    render(){
        return (
            <View style={styles.container}>
                <ScrollView>
                    <TextInput
                        style={styles.title}
                        placeholder="Please enter your post title here"
                        onChangeText={(text) => this.setState({text})}
                    />
                    <View style={styles.tagContainer}>
                        <View style={styles.tags}>
                            <Text style={{ fontSize:20}}>All Tags:</Text>
                            <TouchableOpacity>
                                <Text style={{color:'blue',fontSize:20}}>  Add a new tag</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',flexWrap:'wrap',paddingTop:10}}>
                            <TagButton title="Java" />
                            <TagButton title="Java" />
                            <TagButton title="Java" />
                            <TagButton title="Java" />
                            <TagButton title="Java" />
                            <TagButton title="Java" />
                        </View>
                    </View>
                    <TextInput
                        style={styles.content}
                        placeholder="Please enter your content here...."
                        multiline={true}
                        onChangeText={(text) => this.setState({text})}
                    />
                    <View style={{flexDirection:'row-reverse'}}>
                        <TouchableOpacity style={styles.postButton}>
                            <Text>Post</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default PostPage;

