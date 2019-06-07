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
        this.props.navigation.addListener('willFocus', this.fetchData);
    }

    fetchData = async () => {
        const res1 = await axios.get('http://18.221.224.217:8080/get/post', {
            params: {
                post_id: this.state.post_id
            }
        });

        this.setState({post:res1.data});

        const res2 = await axios.get('http://18.221.224.217:8080/get/pic',{
            params:{
                pic_id:this.state.post.post_summary.user_info.pic_id
            }
        });

        this.setState({imageSource:{uri:res2.data}});

        //this.setState({answers:[]});
        for(const answer_id of res1.data.answer_ids){
            if(this.state.answer_ids.includes(answer_id)){
                continue;
            }
            const res3 = await axios.get('http://18.221.224.217:8080/get/answer', {params: {answer_id: answer_id}});
            
            var joined = this.state.answers.concat(res3.data);
            this.setState({answers: joined});
            var joined1 = this.state.answer_ids.concat(answer_id);
            this.setState({answer_ids:joined1});
            
            

            pic_id = res3.data.user_info.pic_id;
            user_id = res3.data.user_info.user_id;

            if(pic_id !== null && pic_id!==""){
                if ( ! (pic_id in this.state.pic_cache)){
                    res4 = await axios.get('http://18.221.224.217:8080/get/pic', {
                        params: {
                        pic_id: pic_id
                        }
                    });
                    var pic_cache_new = Object.assign({}, this.state.pic_cache)
                    pic_cache_new[user_id] = res4.data;
                    this.setState({
                        pic_cache: pic_cache_new,
                    })
                }
            }
        }

    }


    constructor(props) {
        super();
        this.navigation = props.navigation;
        this.state = {
            post_id: props.navigation.state.params.post_id,
            post: null,
            answers: [],
            imageSource:null,
            pic_cache:{},
            answer_ids:[]
        };
    }

    _renderAnswer = answer => {
        const user_id = answer.user_info.user_id;
        return (
            <View style={styles.answer}>
                <TouchableOpacity onPress={()=> this.navigation.navigate("PostProfileScreen",{user_id: user_id})}>
                    {(user_id in this.state.pic_cache) ?
                        <Image 
                            source={{uri:this.state.pic_cache[user_id]}}
                            style={styles.answerImage}
                        />
                        :
                        <Image 
                            source={require('../images/default.png')} 
                            style={styles.answerImage}
                        />
                    }
                </TouchableOpacity>

                <View>
                    <Text style={{}}>
                        {answer.user_info.first_name+' '+answer.user_info.last_name}
                    </Text>

                    <Text style={{fontSize:17,marginTop:6}}>
                        {answer.content}
                    </Text>

                    <Text style={{color:'grey',marginTop:6}}>
                        {this.epochToTime(answer.timestamp_create)}
                    </Text>

                </View>
                   
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

                    <View style={{borderBottomWidth:2,borderBottomColor:'#DCDCDC',
                                 paddingBottom:15}}>
                        <Text style={{
                            fontSize:19,marginTop:10,
                            
                        }}>
                            {this.state.post.content}
                        </Text>
                    </View>
                    
                    
                    <FlatList
                        style={{marginTop:15}}
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
                </ScrollView>
        );
        
    }
}

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
        paddingBottom:10,
        flexDirection:'row',
        paddingRight:30
    },
    answerImage:{
        borderRadius: 18,
        width:36,
        height:36,
        borderWidth:0.5,
        borderColor: 'grey',
        marginRight:5
    }
});