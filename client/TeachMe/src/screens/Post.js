import React, {Component} from 'react';
import { ScrollView,View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
                
                axios.get('http://18.221.224.217:8080/get/pic',{
                    params:{
                        pic_id:this.state.post.post_summary.user_info.pic_id
                    }
                })
                    .then(res => {
                        this.setState({
                            imageSource: { uri: res.data }
                    })
                    });
                
                for (const answer_id of res.data.answer_ids){
                    console.log(answer_id);
                    axios.get('http://18.221.224.217:8080/get/answer', {params: {answer_id: answer_id}})
                    .then(res => {
                        var joined = this.state.answers.concat(res.data);
                        this.setState({answers: joined});
                        
                        pic_id = res.data.user_info.pic_id;
                        user_id = res.data.user_info.user_id;
                        if(pic_id !== null && pic_id !== undefined && pic_id !== ""){
                            if((!pic_id in this.state.imageDict)){
                                
                                axios.get('http://18.221.224.217:8080/get/pic', {
                                    params: {
                                        pic_id: pic_id
                                    }
                                }).then(res2 => {
                                this.setState((prevState) => {return  {
                                image_dict: {
                                    ...prevState.imageDict,
                                    [user_id]: res2.data,
                                },
                                }});
           
                                })
                            }
                        }

                    })
                };
            })
    }

    constructor(props) {
        super();
        this.navigation = props.navigation;
        this.state = {
            post_id: props.navigation.state.params.post_id,
            post: null,
            answers: [],
            imageSource:null,
            imageDict:{}
        };
    }

    _renderAnswer = answer => {
        const user_id = answer.user_info.user_id;
        return (
            <View style={styles.answer}>
                {user_id in this.state.imageDict ?
                    <Image source={{uri:this.state.imageDict[user_id]}} />
                    :
                    <Image source={require('../images/default.png')} />
                }

                <Text style={{color:'grey'}}>
                    {answer.user_info.first_name+' '+answer.user_info.last_name}
                </Text>

                <Text style={{fontSize:17,marginTop:6}}>
                    {answer.content}
                </Text>   
            </View>
        );
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
  


    renderTags = (tags) => {
        return (
          <View style={{marginTop:15,marginBottom:5,flexDirection:'row'}}>
            {tags.map(item => {
              return (
                <Text style={{backgroundColor:'#F5F5F5',padding:5,fontSize:12,color:'grey',marginRight:8}}>
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
                <ScrollView style={styles.container} >
                    

                    <View style={{flexDirection:'row'}}>
                        
                        <TouchableOpacity
                            onPress={()=>this.navigation.navigate("PostProfileScreen",{user_id: this.state.post.post_summary.user_info.user_id})}
                        >
                        {this.state.imageSource?
                            <Image
                                source={this.state.imageSource}
                                style={styles.userImage}
                            />  :
                            <Image 
                                source={require('../images/default.png')}
                                style={styles.userImage}
                            />
                        }
                        </TouchableOpacity>
                        
                        <View style={{marginLeft:10}}>
                            <Text style={{fontSize:18,}}>
                                {this.state.post.post_summary.user_info.first_name+' '+this.state.post.post_summary.user_info.last_name}
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
                    
                    
                    {this.state.answers.map((answer) => this._renderAnswer(answer))}
                        
                    
                    <Button
                        onPress={() => this.navigation.navigate('AnswerScreen',
                        {post_id: this.state.post.post_summary.post_id})} 
                        title="add your answer" 
                        style={styles.buttonText}
                    />
                </ScrollView>
        );
        
    }
}
/** 
 * <FlatList
                        style={{marginTop:15}}
                        data={this.state.answers}
                        renderItem={({item}) => this._renderAnswer(item)}
                        keyExtractor={item => item.answer_id}
                    />
 */

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:15,
        paddingRight:0
    },
    userImage:{
        borderRadius: 24,
        width:48,
        height:48,
        borderWidth:0.5,
        borderColor: 'grey',
    },
    answer:{
        borderBottomColor:'#D3D3D3',
        borderBottomWidth: 0.8,
        paddingTop:12,
        paddingBottom:10
        
    }
});