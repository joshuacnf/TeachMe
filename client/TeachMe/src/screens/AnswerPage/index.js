import React, {Component} from 'react';
import {View,Text,TextInput,Button,TouchableOpacity} from 'react-native';
import axios from 'axios';
import {styles} from './styles';
import { connect } from "react-redux";

class AnswerPage extends Component{
    static navigationOptions = {
        title: "Answer"
    };

    constructor(props){
        super();
        console.log("props~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log(props);
        this.navigation = props.navigation;
        this.state = {
            user_id: '',
            post_id: props.navigation.state.params.post_id,
            content:'',
            pics:[],
            pics_id:[],
        };
    }

    componentWillMount(){
        this.setState({
            user_id: this.props.userInfo.user_id
        })
    }

    _answer(){
        answer_content = {
            user_info: this.props.userInfo,
            // user_id: this.state.user_id,
            post_id: this.state.post_id,
            content: this.state.content,
            pics: this.state.pics,
        };
        axios.post('http://18.221.224.217:8080/post/answer', answer_content)
            .then(res => {
                if (res.status == 200){
                    console.log("answer success")
                    this.navigation.goBack();
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
                    onChangeText={(content) => this.setState({content})}
                    value={this.state.content}
                />
                <View style={{flex:1,justifyContent:'flex-end',marginBottom:5}}>
                    <TouchableOpacity
                        style={styles.uploadBtn}
                        onPress={() => this._answer()}
                    >
                        <Text style={{fontSize:20,color:'white'}}>Answer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}



function mapStateToProps(state) {
    return { userInfo: state.reducers.userInfo };
}

export default connect(mapStateToProps)(AnswerPage);
