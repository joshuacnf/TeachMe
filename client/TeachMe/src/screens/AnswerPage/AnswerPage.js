import React, {Component} from 'react';
import {View,Text,TextInput,Button,TouchableOpacity} from 'react-native';
import {styles} from './styles';
import axios from 'axios';

class AnswerPage extends Component{
    static navigationOptions = {
        title: "Answer"
    };

    constructor(props){
        super(props);
        this.navigation = props.navigation;
        this.state = {
            user_id:'',
            post_id:'',
            content:'',
            pics:[],
            pics_id:[],
        };
    }

    _answer(){
        answer_content = {
            user_id: this.state.user_id,
            post_id: this.state.post_id,
            content: this.state.content,
            pics: this.state.pics,
        };
    
        axios.post('http://18.221.224.217:8080/post/answer', {params:{answer_content}})
            .then(res => {
                console.log(res);
                if (res.status == 200){
                    // answer succeeded
                    console.log(response)
                }
            })
            .catch(error => {
                console.log(error.response)
            });
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
                    <TouchableOpacity
                        style={styles.postButton}
                        onPress={() => this._answer()}
                    >
                        <Text style={{fontSize:20,color:'black'}}>Answer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default AnswerPage;