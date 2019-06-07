import React, { Component } from "react"
import { FlatList, Text, View, Image, TouchableOpacity} from "react-native"
import { List, ListItem, Avatar } from "react-native-elements"
import { connect } from "react-redux"

import axios from 'axios'

class ContactPage extends Component {

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
    this.fetchData();
    this.props.navigation.addListener('willFocus', this.fetchData)
  }

  fetchData = async () => {
    axios.get('http://18.221.224.217:8080/get/chat_summary_list', {
      params: {
        user_id: this.props.userInfo.user_id
      }
    }).then(res => {
      this.setState({ refreshing: false })
      this.setState({ data: res.data });
      for (var i = 0; i < res.data.length; i++) {
        user_id = res.data[i].contact_info.user_id;
        pic_id = res.data[i].contact_info.pic_id;
        if (pic_id !== undefined && pic_id != "") {
          axios.get('http://18.221.224.217:8080/get/pic', {
            params: {
              pic_id: pic_id
            }
          }).then(res2 => {
            // pic_cache_ = this.state.pic_cache
            // pic_cache_[user_id] = res2.data
            this.setState({
              pic_cache: {
                ...this.state.pic_cache,
                [user_id]: res2.data,
              },
            });
            console.log(this.state.pic_cache);
          })
        }
      }
    })
  }

  showChat = contact_id => {
    this.navigation.navigate('ChatScreen', 
      { contact_id: contact_id })
  }

  render() {
    return (
      <View >
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
      // console.log(this.state.pic_cache[contact_id])
      return (
        <TouchableOpacity onPress={() => this.showChat(contact_id)}>
          <ListItem
            // leftAvatar={{
            //   rounded: true,
            //   source: { uri : this.state.pic_cache[pic_id] },
            // }}
            avatar={
              <Image
                rounded
                imageProps={{ resizeMode: 'cover' }}
                source={{ uri: this.state.pic_cache[pic_id] }}
              />
            }
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
