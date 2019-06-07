import React, {Component} from 'react';
import {View,Text,TextInput,Button,TouchableOpacity,
        ScrollView,Keyboard,TouchableWithoutFeedback,Alert
    } from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {styles} from './styles';
import TagButton from '../../components/TagButton';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import { InputAccessoryView } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import axios from 'axios';
import { connect } from "react-redux";

class PostPage extends Component {
  static navigationOptions = {
    title: "Add New Post",
    // tabBarIcon: ({ focused }) => {
    //     return <Icon name="plus" size={20} color={focused ? '#2196F3' : '#808080'}/>
    // },
  };

  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = {
      title: '',
      user_id: '',
      tags: [],
      content: '',
      pics: [],
    };
  }

  componentDidMount() {
    // this.props.navigation.addListener('didBlur', this.refresh)
  }

  reset = () => {
    this.setState({
      title: '',
      tags: [],
      content: '',
      pics: [],
    })
  }

  _post() {
    if(this.state.title === ''){
      Alert.alert(
        'Alert',
        'Please enter a title',
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );
      return;
    }
    post_content = {
      post_summary: {
        user_info: {
          user_id: this.props.userInfo.user_id,
        },
        title: this.state.title,
        tags: this.state.tags,
      },
      content: this.state.content,
      // pics: this.state.pics,
      // user_id: this.state.user_id,
      title: this.state.title,
      tags: this.state.tags,
      content: this.state.content,
      pics: this.state.pics,
    };

    axios.post('http://18.221.224.217:8080/post/post', post_content)
      .then(res => {
        if (res.status == 200) {
          // post succeeded
          console.log(response)
        }
      })
      .catch(error => {
        console.log(error.response)
      });

    this.reset();

    this.navigation.navigate('HomeScreen')
  }

  componentWillReceiveProps(nextProps) {
    const tagName = nextProps.navigation.getParam('tagName');
    if (tagName !== undefined && tagName !== '') {
      if (!this.state.tags.includes(tagName)) {
        this.setState({ tags: [...this.state.tags, tagName] });
      }
    }
  }

  _selectTags = () => {
    this.navigation.navigate('SelectTagsScreen');
  }

  _deleteTag = (name) => {
    this.setState((prevState) => {
      return {
        tags: prevState.tags.filter((value) => {
          return name !== value;
        })
      }
    });
  }

  _renderTag = (name) => {
    return (
      <TagButton title={name} key={name} delete={this._deleteTag.bind(this)} />
    )
  }

    render(){
        return (
            <KeyboardAvoidingView style={styles.container} behavior='height' enabled>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{paddingBottom:40}}>
                        <TextInput
                            onChangeText={txt=> this.setState({title:txt})}
                            style = {styles.title}
                            placeholder = "Add title"
                            placeholderTextColor={'grey'}
                            fontWeight= {'bold'}
                            multiline = {true}
                        />

                        <TextInput
                            onChangeText={txt=> this.setState({content:txt})}
                            style = {styles.content}
                            placeholder="Enter your post here"
                            multiline={true}
                        />
                    </View>
                </TouchableWithoutFeedback>
                
                
                

                <View style={styles.tagArea}>
                    <Text style={{fontWeight:'bold',fontSize:20}}>Tags</Text>
                    <TouchableOpacity 
                        style={styles.addTag}
                        onPress={() => this._selectTags()}
                    >
                        <Text style={{color:'#1a8cff',fontSize:18,fontWeight:'bold'}}>+ Add Tags</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row',flexWrap:'wrap',paddingTop:10}}>
                    {this.state.tags.map(value => this._renderTag(value))}
                </View>

                <View style={{flex:1,justifyContent:'flex-end',marginBottom:5}}>
                    <TouchableOpacity
                        style={styles.uploadBtn}
                        onPress={() => this._post()}
                    > 
                        <Text style={{color:'white',fontSize:20}}>Upload</Text>
                    </TouchableOpacity>
                </View>
           
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state) {
  return { userInfo: state.reducers.userInfo };
}

export default connect(mapStateToProps)(PostPage);



