import React, {Component} from 'react';
import {View,Text,TextInput,Button,TouchableOpacity} from 'react-native';
import {styles} from './styles';

class AnswerPage extends Component{
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