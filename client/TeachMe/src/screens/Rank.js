import React, { Component } from 'react';
import { View, Button, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SearchBar, List, ListItem, Avatar } from "react-native-elements"
import { Card } from '@shoutem/ui/components/Card'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from "react-redux";

import styles from './style';
import axios from 'axios';

/*
const rank_info_data = [
  {
    user_id: "1",
    first_name: "Ken",
    last_name: "Xu",
    score: 100,
  },
  {
    user_id: "2",
    first_name: "Joshua",
    last_name: "Zhang",
    score: 99,
  },
  {
    user_id: "3",
    first_name: "Zack",
    last_name: "Yang",
    score: 98,
  }

]
*/

class Rank extends Component {
  static navigationOptions = {
    title: "Rank",
    //headerLeft: null,
    //tabBarIcon: ({ focused }) => {
    //        return <Icon name="rank" size={20} color={focused ? '#2196F3' : '#808080'}/>
    //    },
  }

  constructor(props) {
    super();
    this.navigation = props.navigation;
    this.state = {
      rank_info: [],
      rankNumber: 0
    };
  }

  componentWillMount() {
    this.fetchData()
    this.props.navigation.addListener('willFocus', this.fetchData)
  }

  fetchData = () => {
    axios.get('http://18.221.224.217:8080/get/rank', { params: { user_id: this.props.userInfo.user_id } })
      .then(res => {
        var i = 1;
        for (var key in res.data) {
          res.data[key].rankNumber = i++;
        }
        console.log(res.data);
        this.setState({ rank_info: res.data });
      })
  }

  showProfile = user_id => {
    this.navigation.navigate('OtherProfileScreen', { user_id: user_id });
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
      <View style={{ marginTop: 5, paddingLeft: 5, paddingBottom: 3 }}>
        <TouchableOpacity onPress={() => this.showProfile(item.user_id)} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}} >
          <View style={{ flexWrap: 'wrap', flexDirection: 'row' , margin: 20,  alignItems: 'center'}}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.rankNumber+ " "}</Text>
            <Text style={{ fontSize: 16}} >{item.first_name + " " + item.last_name}</Text>
          </View>
          <View style={{ margin: 20, flexWrap: 'wrap', flexDirection:'row', alignItems: 'center' }}>
          { item.rankNumber == 1 &&
          <Image
            style={{width: 30, height: 40}}
            source={require('../images/gold.png')}
          />}
          { item.rankNumber == 2 &&
          <Image
            style={{width: 30, height: 40}}
            source={require('../images/silver.png')}
          />}
          { item.rankNumber == 3 &&
          <Image
            style={{width: 30, height: 40}}
            source={require('../images/bronze.png')}
          />}
             <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{"   "+ item.score}</Text>
             <Text> pts</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

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

        <FlatList
          data={this.state.rank_info}
          keyExtractor={item => item.user_id}
          renderItem={({ item }) => this.renderItem(item)}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { userInfo: state.reducers.userInfo };
}

export default connect(mapStateToProps)(Rank);
