import React, { Component } from 'react';
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

  constructor(props) {
    super();
    this.navigation = props.navigation;
    this.state = {
      data: [],
      refreshing: '',
      keyword: '',      
    }
  }

  componentWillMount() {
    this.fetchData()
    this.props.navigation.addListener('willFocus', this.fetchData)
  }

  fetchData = async () => {
    this.setState({ refreshing: true })
    axios.get('http://18.221.224.217:8080/get/post_summary_list', {
      params: {
        user_id: this.props.userInfo.user_id,
        keyword: this.state.keyword ? this.state.keyword : ''
      }
    }).then(res => {
        this.setState({ refreshing: false })
        this.setState({ data: res.data });
        console.log("++++++++++++++++++++++++")
        console.log(res.data)
      })
  }

  _updateSearch = keyword => {
    this.setState({ keyword }, function() {
      this.fetchData()
    });
  }

  showPost = post_id => {
    this.navigation.navigate('PostScreen', { post_id: post_id });
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

    renderTags = (tags) => {
      return (
        <View style={{marginTop:2,marginBottom:5,flexDirection:'row'}}>
          {tags.map(item => {
            return (
              <Text style={{backgroundColor:'#F5F5F5',
                    padding:5,fontSize:12,color:'grey',marginRight:8}} key={item}
              >
                {item}
              </Text>
            )
          })}
        </View>
      );
    };

    /*renderItem = item => {
      return (
        <View style={{ height: 90 }}>
        <TouchableOpacity onPress = {()=>this.showPost(item.post_id)}>
          <ListItem
            title={
              <View >
                {item.tags.map(tag => this.renderTag(tag))}
                <Text>{item.title}</Text>
              </View>         
            }
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
    }*/

    renderItem = item => {
      return (
        <View style={{marginTop:5,paddingLeft:8,paddingBottom:3}}>
          <TouchableOpacity onPress={() => this.showPost(item.post_id)} >
            {item.tags.length >0 ? this.renderTags(item.tags): null}
            <Text style={{fontSize:18,fontWeight:'bold'}}>{item.title}</Text>
            <Text style={{color: '#a9a9a9', fontWeight: '400',marginTop:10}}>
              {this.epochToTime(item.timestamp_create)}
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    renderSeparator = () => {
      return (
        <View
          style={{
            height: 4,
            width: "100%",
            backgroundColor: "#D3D3D3",
          }}
        />
      );
    }

  render() {
    const { keyword } = this.state
    return (
      <View style={{ flex: 1 }}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this._updateSearch}
          value={keyword}
          style={styles.search}
        />
        <FlatList
          data={this.state.data}
          keyExtractor={item => item.post_id}
          renderItem={({ item }) => this.renderItem(item)}
          ItemSeparatorComponent={this.renderSeparator}
          onRefresh={() => this.fetchData()}
          refreshing={this.state.refreshing}
        />
      </View>
    );
  }

  epochToTime = epoch => {
    var a = new Date(epoch);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    if (hour < 10) {
      hour = '0' + hour;
    }
    var min = a.getMinutes();
    if (min < 10) {
      min = '0' + min;
    }    
    var sec = a.getSeconds();
    var time = month + ' ' + date + ' ' + year + ' ' + hour + ':' + min;
    return time;
  }
}

function mapStateToProps(state) {
  return { userInfo: state.reducers.userInfo };
}

export default connect(mapStateToProps)(Home);
