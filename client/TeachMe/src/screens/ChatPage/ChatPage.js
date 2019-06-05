import React, {Component} from 'react';
import {View,Text,TextInput,Button,TouchableOpacity,ScrollView} from 'react-native';
//import {styles} from './styles';
import { GiftedChat } from 'react-native-gifted-chat'


class ChatPage extends Component{
    state = {
        messages: [],
      }
    
      componentWillMount() {
        this.setState({
          messages: [
            {
              _id: 1,
              text: 'Hello developer',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
          ],
        })
      }
    
      onSend(messages = []) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
      }
    
      render() {
        return (
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
        )
      }
}

export default ChatPage;

