import React, { Component } from "react"
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native"
import { List, ListItem, Avatar } from "react-native-elements"
import { connect } from "react-redux"

import axios from 'axios'

class ContactPage extends Component {
  static navigationOptions = {
    title: 'Conversation',
  }

  constructor(props) {
    super();
    this.navigation = props.navigation;
    this.state = {
      data: [],
      pic_cache: {},
      refreshing: false,
    };
  }

  componentWillMount() {
    this.setState({ refreshing: true })
    this.props.navigation.addListener('willFocus', this.fetchData)
    setInterval(this.fetchData, 1000)
  }

  fetchData = async () => {
    /*
    this.setState({
      refreshing: true,
    });*/
    res1 = await axios.get('http://18.221.224.217:8080/get/chat_summary_list', {
      params: {
        user_id: this.props.userInfo.user_id
      }
    });

    this.setState({
      data: res1.data,
    });

    const l = this.state.data.length;
    for (var i = 0; i < l; i++) {
      pic_id = res1.data[i].contact_info.pic_id;
      user_id = res1.data[i].contact_info.user_id;
      if (pic_id !== undefined && pic_id != "" && (!(user_id in this.state.pic_cache))) {
        res2 = await axios.get('http://18.221.224.217:8080/get/pic', {
          params: {
            pic_id: pic_id
          }
        })
        var pic_cache_new = Object.assign({}, this.state.pic_cache)
        pic_cache_new[user_id] = res2.data;
        this.setState({
          pic_cache: pic_cache_new,
        })
      }
    }

    this.setState({
      refreshing: false,
    })
  }

  showChat = contact_id => {
    this.navigation.navigate('ChatScreen',
      { contact_id: contact_id })
  }

  render() {
    return (
      <View style={{flex:1}}>
        <FlatList
          data={this.state.data}
          keyExtractor={x => x.contact_info.user_id}
          renderItem={({ item }) => this.renderItem(item)}
          ItemSeparatorComponent={this.renderSeparator}
          onRefresh={() => this.fetchData()}
          refreshing={this.state.refreshing}
        />
      </View>
    );
  }

  renderItem = item => {
    const contact_id = item.contact_info.user_id;
    if (!(contact_id in this.state.pic_cache)) {
      return (
        <TouchableOpacity onPress={() => this.showChat(contact_id)} >
          <ListItem
            leftAvatar={{
              rounded: true,
              title: `${item.contact_info.first_name.charAt(0)} ${item.contact_info.last_name.charAt(0)}`
            }}
            title={`${item.contact_info.first_name} ${item.contact_info.last_name}`}
            subtitle={item.message.content}
            containerStyle={{ borderBottomWidth: 0 }}
          />
        </TouchableOpacity>
      )
    }
    else {
      return (
        <TouchableOpacity onPress={() => this.showChat(contact_id)}>
          <ListItem
            leftAvatar={{
              rounded: true,
              source: { uri: this.state.pic_cache[contact_id] },
            }}
            title={`${item.contact_info.first_name} ${item.contact_info.last_name}`}
            subtitle={item.message.content}
            containerStyle={{ borderBottomWidth: 0 }}
          />
        </TouchableOpacity>
      )
    }
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return { userInfo: state.reducers.userInfo };
}

export default connect(mapStateToProps)(ContactPage);
