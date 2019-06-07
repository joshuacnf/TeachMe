import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
//import {styles} from './styles';
import { GiftedChat } from 'react-native-gifted-chat'

import axios from 'axios';
import { connect } from "react-redux";

class ChatPage extends Component {
  state = {
    messages: [],
  }

  constructor(props) {
    super();
    this.navigation = props.navigation;
    console.log(props);
    this.state = {
      messages: [],
      contact_id: props.navigation.state.params.contact_id,
      contact_info: '',
      user_info: '',
    };
  }

  componentDidMount() {
    axios.get('http://18.221.224.217:8080/get/profile',
      { params: {user_id: this.state.contact_id} }
    ).then(res => {
      console.log(res)
      this.setState({contact_info: res.data});
      this.fetchData();
    })
    this.setState({
      // messages: [
      //   {
      //     _id: 1,
      //     text: 'Hello developer',
      //     createdAt: new Date(),
      //     user: {
      //       _id: 2,
      //       name: 'React Native',
      //       avatar: 'https://placeimg.com/140/140/any',
      //     },
      //   },
      // ],
      messages: [],
      user_info: this.props.userInfo,
    })
    this.props.navigation.addListener('willFocus', this.fetchData)
    setInterval(this.fetchData, 2000);
  }

  fetchData = async () => {
    if (this.state.contact_info == '' || this.state.user_id == '') {
      return
    }
    axios.get(
      'http://18.221.224.217:8080/get/chat', {
        params: {
          user1_id: this.state.contact_info.user_id,
          user2_id: this.state.user_info.user_id,
        }
      }
    ).then(res => {
      msgs = res.data
      tmp = []
      idx = 0
      for (var i = 0; i < msgs.length; i++) {
        if (msgs[i].from == this.state.contact_info.user_id) {
          message = {
            _id: idx,
            text: msgs[i].content,
            createdAt: new Date(msgs[i].timestamp),
            user: {
              _id: this.state.contact_info.user_id,
              name: `${this.state.contact_info.first_name} ${this.state.contact_info.last_name}`,
              // avatar: '',
            }
          }
          tmp.push(message)
          idx = idx + 1
        }
        if (msgs[i].from == this.state.user_info.user_id) {
          message = {
            _id: idx,
            text: msgs[i].content,
            createdAt: new Date(msgs[i].timestamp),
            user: {
              _id: this.state.user_info.user_id,
              name: `${this.state.user_info.first_name} ${this.state.user_info.last_name}`,
            }
          }
          tmp.push(message)
          idx = idx + 1
        }
      }
      this.setState({ messages: tmp });
    });
  }

  onSend(messages = []) {
    console.log(messages[0])
    for (const message of messages) {
      msg = {
        from: this.state.user_info.user_id,
        to: this.state.contact_info.user_id,
        content: message.text,
        timestamp: 0 + Math.ceil(message.createdAt.getTime()),
      }
      axios.post('http://18.221.224.217:8080/post/message', msg)
        .then(res => {
          if (res.status == 200) {
            // post succeeded
            console.log(response)
          }
        })
        .catch(error => {
          console.log(error.response)
        });
    }

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  onPressAvatar = user => {
    this.navigation.navigate('ProfileScreen', {user_id: user._id});
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.state.user_info.user_id,
          name: `${this.state.user_info.first_name} ${this.state.user_info.last_name}`,
        }}
        showUserAvatar={true}
        onPressAvatar={this.onPressAvatar}
        // renderUsernameOnMessage={true}
      />
    )
  }
}

function mapStateToProps(state) {
  return { userInfo: state.reducers.userInfo };
}

export default connect(mapStateToProps)(ChatPage);

