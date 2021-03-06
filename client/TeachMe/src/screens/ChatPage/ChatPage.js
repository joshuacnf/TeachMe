import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
//import {styles} from './styles';
import { GiftedChat } from 'react-native-gifted-chat'

import axios from 'axios';
import { connect } from "react-redux";

class ChatPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

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
      contact_pic: '',
      user_pic: '',
    };
  }

  componentDidMount() {
    axios.get('http://18.221.224.217:8080/get/profile',
      { params: { user_id: this.state.contact_id } }
    ).then(res => {
      const contact_info = res.data
      this.props.navigation.setParams({title: `${contact_info.first_name} ${contact_info.last_name}` });      
      this.setState({ contact_info: contact_info });
      const contact_pic_id = this.state.contact_info.pic_id
      const user_pic_id = this.state.user_info.pic_id
      if (contact_pic_id !== undefined && contact_pic_id !== "") {
        axios.get('http://18.221.224.217:8080/get/pic',
          { params: { pic_id: contact_pic_id } }
        ).then(res2 => {
          this.setState({
            contact_pic: res2.data
          })
        })
      }
      if (user_pic_id !== undefined && user_pic_id !== "") {
        axios.get('http://18.221.224.217:8080/get/pic',
          { params: { pic_id: user_pic_id } }
        ).then(res2 => {
          this.setState({
            user_pic: res2.data,
          })
        })
      }
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
    setInterval(this.fetchData, 1000);
  }

  fetchData = async () => {
    if (this.state.contact_info == '' || this.state.user_id == '') {
      return
    }
    res = await axios.get('http://18.221.224.217:8080/get/chat', {
      params: {
        user1_id: this.state.contact_info.user_id,
        user2_id: this.state.user_info.user_id,
      }
    })

    msgs = res.data
    tmp = []
    idx = 0

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
            avatar: this.state.contact_pic,
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
            avatar: this.state.user_pic,
          }
        }
        tmp.push(message)
        idx = idx + 1
      }
    }

    this.setState({ messages: tmp });
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
    this.navigation.navigate('ProfileScreen', { user_id: user._id });
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

