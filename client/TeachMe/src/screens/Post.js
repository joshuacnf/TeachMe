import React, {Component} from 'react';
import { View, Text, Button, FlatList,StyleSheet, TouchableOpacity,Image } from 'react-native';
import { Card } from 'react-native-elements';

//import styles from './style'
import axios from 'axios';

export default class Post extends Component {
    static navigationOptions = {
        title: "Post",
    }

    componentWillMount() {
        axios.get('http://18.221.224.217:8080/get/post', {params: {post_id: this.state.post_id}})
            .then(res => {
                this.setState({post: res.data});
                for (const answer_id of res.data.answer_ids){
                    console.log(answer_id);
                    axios.get('http://18.221.224.217:8080/get/answer', {params: {answer_id: answer_id}})
                    .then(res => {
                        var joined = this.state.answers.concat(res.data);
                        this.setState({answers: joined});
                    })
                }
            })
    }

    constructor(props) {
        super();
        this.navigation = props.navigation;
        this.state = {
            post_id: props.navigation.state.params.post_id,
            post: null,
            answers: [],
        };
    }

    _renderAnswer = answer =>{
        console.log("~~~~~~~~~~~~~~~~~~answer")
        return (
            <Card>
                <Text>
                    {answer.content}
                </Text>
            </Card>
        )
    }

    epochToTime = epoch => {
        var a = new Date(epoch);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = month + ' ' + date + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      }
  

    /*render() {
        return (
            <View
                style={styles.container}
            >
                {this.state.post ?
                <View>
                <Card>
                    <Text
                        style={styles.title}
                    >
                        {this.state.post.post_summary.title}
                    </Text>
                    <Text
                        style={styles.smalltext}
                    >
                        {this.state.post.post_summary.user_info.last_name}
                    </Text>
                    <Text
                        style={styles.smalltext}
                    >
                        {this.state.post.post_summary.timestamp_update}
                    </Text>
                </Card>
                <Card>
                    <Text>
                        {this.state.post.content}
                    </Text>
                </Card>
                <FlatList
                    data={this.state.answers}
                    renderItem={({item}) => this._renderAnswer(item)}
                    keyExtractor={item => item.answer_id}
                />
                <Button
                    onPress={() => this.navigation.navigate('AnswerScreen',
                    {post_id: this.state.post.post_summary.post_id})}
                    title="add your answer"
                    style={styles.buttonText}
                />
                </View>
            : <View/>}
            </View>
        );
    
    }*/

    renderTags = (tags) => {
        return (
          <View style={{marginTop:15,marginBottom:5,flexDirection:'row'}}>
            {tags.map(item => {
              return (
                <Text style={{backgroundColor:'#F5F5F5',padding:5,fontSize:12,color:'grey'}}>
                  {item}
                </Text>
              )
            })}
          </View>
        );
      };
    
    render(){
        return (
            this.state.post === null ? 
                <View>
                </View>
                :
                <View style={styles.container}>
                    

                    <View style={{flexDirection:'row'}}>
                        <Image
                            source={require('../images/default.png')}
                            style={styles.userImage}
                        />  
                        <View style={{marginLeft:10}}>
                            <Text style={{fontSize:18,}}>
                                {this.state.post.post_summary.user_info.last_name}
                            </Text>
                
                            <Text style={{fontSize:12,color:'grey',marginTop:8}}>
                                {this.epochToTime(this.state.post.post_summary.timestamp_create)}
                            </Text>
                        </View>
                    </View>
                    
                    {this.renderTags(this.state.post.post_summary.tags)}

                    <Text style={{fontWeight:'700',fontSize:24}}>
                        {this.state.post.post_summary.title}
                    </Text>

                
                    <Text style={{fontSize:19,marginTop:10}}>
                        {this.state.post.content}
                    </Text>

                    <FlatList
                        data={this.state.answers}
                        renderItem={({item}) => this._renderAnswer(item)}
                        keyExtractor={item => item.answer_id}
                    />
                    <Button
                        onPress={() => this.navigation.navigate('AnswerScreen',
                        {post_id: this.state.post.post_summary.post_id})} 
                        title="add your answer" 
                        style={styles.buttonText}
                    />
                </View>
        );
        
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:15
    },
    userImage:{
        borderRadius: 24,
        width:48,
        height:48,
        borderWidth:0.5,
        borderColor: 'grey',
    }
});