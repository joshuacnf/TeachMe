import React, {Component} from "react"
import { FlatList, Text, View } from "react-native"
import { List, ListItem, Avatar } from "react-native-elements"

export default class MyList extends Component {

  constructor(props) {
    super();
    this.navigation = props.navigation;
    this.state = {
      data: [],
      page: 0,
      loading: false
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    fetch(
      "http://18.221.224.217:8080/get/chat_summary_list?user_id=5cf618e0f3295c559afd3281"
    )
    .then(res => res.json())
    .then(res => {
      this.setState({data: res});
    });
  }

  render() {
    return (
        <View >
          <FlatList
            data={this.state.data}
            keyExtractor={x => x.contact_info.user_id}
            renderItem={({ item }) => this.renderItem(item)}
            ItemSeparatorComponent={this.renderSeparator}
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