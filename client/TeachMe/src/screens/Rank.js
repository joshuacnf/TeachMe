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
        title: "Rank",
        headerLeft: null,
        tabBarIcon: ({ focused }) => {
                return <Icon name="rank" size={20} color={focused ? '#2196F3' : '#808080'}/>
            },
    }

    componentWillMount() {
        axios.get('http://18.221.224.217:8080/get/rank', {params: {user_id: this.props.userInfo.user_id}})
            .then(res => {
                this.setState({rank_info: res.data});
            })
    }
  
    constructor(props) {
        super();
        this.navigation = props.navigation;
        this.state = {
            rank_info: null,
        };
    }

    showProfile = user_id => {
        this.navigation.navigate('Profile', {user_id: user_id});
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
        <TouchableOpacity onPress = {()=>this.showProfile(item.user_id)}>
          <ListItem
            name={item.user_firstname + ' ' + item.user_lastname}
            titleStyle={{ fontWeight: 'bold' }}
            // subtitle={item.content}
            // rightSubtitle={`${item.contact_info.first_name} ${item.contact_info.last_name}`}
            score={item.score}
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

                <FlatList
                  data={this.state.data}
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