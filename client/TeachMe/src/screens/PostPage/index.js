import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { styles } from './styles';
import TagButton from '../../components/TagButton';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import { InputAccessoryView } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import axios from 'axios';
import { connect } from "react-redux";

class PostPage extends Component {
  static navigationOptions = {
    title: "PostPage",
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
    this.props.navigation.addListener('willFocus', this.refresh)
  }

  refresh = () => {
    this.setState({
      title: '',
      tags: [],
      content: '',
      pics: []
    })
  }

  _post() {
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



  /* _showTag(){
       
       this.setState((prevState) => {
           return {isKeyboardVisible:!prevState.isKeyboardVisible};
       });
   }
 
   _renderSelectTags(){
           if(this.state.isKeyboardVisible){
               return (
                   
                   <KeyboardAccessoryView 
                       hideBorder={true}
                       style={{backgroundColor:'white',marginBottom:-120}}
                   > 
                       <View style={styles.textInputView}>
                           <View>
                               <Text style={{fontSize:16,color:'grey'}}>Suggested</Text>
                           </View>
   
                           
                           <View style={styles.tagTyping}>
                               <TextInput
                                   underlineColorAndroid="transparent"
                                   placeholder="Enter a tag"
                                   style={styles.textInput}
                                   keyboardType="default"
                                   autoFocus={true}
                               />
                           
                               <TouchableOpacity style={styles.textInputButton}>
                                   <Text style={{color:'white',fontSize:16}}>Add</Text>
                               </TouchableOpacity>   
                           </View>
                       
                       </View>
                   </KeyboardAccessoryView>           
               );
           }
 
           else{
               return null;
           }
           
   }*/


  render() {
    return (
      <View style={styles.container} >

        <TextInput
          onChangeText={txt => this.setState({ title: txt })}
          style={styles.title}
          placeholder="Add title"
          placeholderTextColor={'grey'}
          fontWeight={'bold'}
          multiline={true}
          value={this.state.title}
        />
        <TextInput
          onChangeText={txt => this.setState({ content: txt })}
          style={styles.content}
          placeholder="Enter your post here"
          multiline={true}
          value={this.state.content}
        />

        <View style={styles.tagArea}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Tags</Text>
          <TouchableOpacity
            style={styles.addTag}
            onPress={() => this._selectTags()}
          >
            <Text style={{ color: '#1a8cff', fontSize: 18, fontWeight: 'bold' }}>+ Add Tags</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10 }}>
          {this.state.tags.map(value => this._renderTag(value))}
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 5 }}>
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => this._post()}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>Upload</Text>
          </TouchableOpacity>
        </View>



      </View>
    );
  }
}

function mapStateToProps(state) {
  return { userInfo: state.reducers.userInfo };
}

export default connect(mapStateToProps)(PostPage);



