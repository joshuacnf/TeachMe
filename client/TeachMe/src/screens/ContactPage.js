import React, {Component} from "react"
import { FlatList, Text, View } from "react-native"
import { List, ListItem, Avatar } from "react-native-elements"
import { connect } from "react-redux"

import axios from 'axios'

class ContactPage extends Component {

  constructor(props) {
    super();
    this.navigation = props.navigation;
    this.state = {
      data: [],
      refreshing: false,
    };
  }

  componentWillMount() {
    this.setState({refreshing: true})
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
      })
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
    return (
      <ListItem
        leftAvatar={{ rounded: true,
            title: `${item.contact_info.first_name.charAt(0)} ${item.contact_info.last_name.charAt(0)}`}}
        title={`${item.contact_info.first_name} ${item.contact_info.last_name}`}
        subtitle={item.message.content}
        containerStyle={{ borderBottomWidth: 0 }}
      />
    )
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
