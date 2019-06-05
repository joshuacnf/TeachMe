import React, {Component} from 'react';
import { View, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar, List, ListItem, Avatar } from "react-native-elements"
import { Card } from '@shoutem/ui/components/Card'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from "react-redux";

import styles from './style';
import axios from 'axios';

class Home extends Component {
    static navigationOptions = {
      title: 'Home',      
      // headerLeft: null,
      // tabBarIcon: ({ focused }) => {
      //     return <Icon name="home" size={20} color={focused ? '#2196F3' : '#808080'}/>
      //   },
    }

    componentWillMount() {
        axios.get('http://18.221.224.217:8080/get/post_summary_list', {
            params: {
                user_id: this.props.userInfo.user_id
            }})
            .then(res => {
                this.setState({data: res.data});
            })
    }

    constructor(props) {
        super();
        this.navigation = props.navigation;
        this.state = {
            search: '',
            data: [],
        }
    }

    _updateSearch = search => {
        this.setState({search});
    }

    showPost = post_id => {
        this.navigation.navigate('PostScreen', {post_id: post_id});
    }

    // styles = StyleSheet.create({
    //   subtitleView: {
    //     flexDirection: 'row',
    //     paddingLeft: 10,
    //     paddingTop: 5
    //   },
    //   ratingImage: {
    //     height: 19.21,
    //     width: 100
    //   },
    //   ratingText: {
    //     paddingLeft: 10,
    //     color: 'grey'
    //   }
    // })

    renderItem = item => {
      return (
        <View style={{ height: 70 }}>
        <TouchableOpacity onPress = {()=>this.showPost(item.post_id)}>
          <ListItem
            title={item.title}
            titleStyle={{ fontWeight: 'bold' }}
            // subtitle={item.content}
            // rightSubtitle={`${item.contact_info.first_name} ${item.contact_info.last_name}`}
            subtitle={this.epochToTime(item.timestamp_create)}
            subtitleStyle={{ color: '#a9a9a9', fontWeight: '400' }}
            containerStyle={{ borderBottomWidth: 0 }}
          />
        </TouchableOpacity>
        </View>
      )
    }

    renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "90%",
            backgroundColor: "#CED0CE",
            marginLeft: "5%"
          }}
        />
      );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this._updateSearch}
                    value={this.state.search}
                    style={styles.search}
                />
                <FlatList
                  data={this.state.data}
                  keyExtractor={item => item.post_id}
                  renderItem={({ item }) => this.renderItem(item)}
                  ItemSeparatorComponent={this.renderSeparator}
                />
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
}

function mapStateToProps(state) {
    return { userInfo: state.reducers.userInfo };
}

export default connect(mapStateToProps)(Home);
