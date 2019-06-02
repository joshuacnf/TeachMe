import React, {Component} from 'react';
import {View,Text,TextInput,Button,TouchableOpacity} from 'react-native';
import {styles} from './styles';
import axios from 'axios';

class AnswerPage extends Component{

    componentDidMount(){
        axios.get('http://18.221.224.217:8080/register?')
            .then((res) => {
                console.log(res);
            })
    }

    render(){
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.content}
                    placeholder="Please enter your answer here...."
                    multiline={true}
                    onChangeText={(text) => this.setState({text})}
                />
                <View style={{flexDirection:'row-reverse'}}>
                    <TouchableOpacity style={styles.postButton}>
                        <Text style={{fontSize:20,color:'black'}}>Post</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default AnswerPage;