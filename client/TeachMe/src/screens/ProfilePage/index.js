import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { styles } from './styles';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from "react-redux";
import axios from 'axios';
import { Avatar } from 'react-native-elements';

class ProfilePage extends Component {
  static navigationOptions = {
    title: 'User',
    // headerLeft: null,
    // tabBarIcon: ({ focused }) => {
    // return <Icon name="user" size={20} color={focused ? '#2196F3' : '#808080'}/>
    // },
  }

  constructor(props) {
    super();
    this.navigation = props.navigation;
    user_id = this.navigation.getParam('user_id');
    this.state = {
      userId: user_id == undefined ? props.userInfo.user_id : user_id,
      imageSource: null,
      userInfo: null,
    }
  }

  componentWillMount() {
    this.fetchData()
    this.props.navigation.addListener('willFocus', this.fetchData)
  }

  componentWillReceiveProps(nextProps) {
    const user_id = nextProps.navigation.getParam('userId');
    if (user_id !== undefined) {
      this.setState({
        userId: user_id,
        imageSource: null,
        userInfo: null,
      });
      this.fetchData();
    }
  }

  fetchData = async () => {
    axios.get('http://18.221.224.217:8080/get/profile', {
      params: {
        user_id: this.state.userId,
      }
    }).then(res => {
      user_info = res.data;
      console.log('=====================================')
      console.log(user_info)
      this.setState({
        userInfo: user_info,
      })
      if (user_info.pic_id == '' || user_info.pic_id === undefined) {
        this.setState({
          imageSource: null,
        })
      }
      else {
        axios.get('http://18.221.224.217:8080/get/pic', {
          params: {
            pic_id: user_info.pic_id,
          }
        })
          .then(res => {
            this.setState({
              imageSource: { uri: res.data }
            })
          })
      }
    })
  }

  startChat() {
    this.navigation.navigate('ChatScreen');
  }

  selectPhotoTapped() {
    console.log("hhh");
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // let source = { uri: response.uri };
        // You can also display the image using data:
        image_data = 'data:image/jpeg;base64,' + response.data;
        axios.post('http://18.221.224.217:8080/post/profile_pic'
          , image_data,
          { params: { user_id: this.props.userInfo.user_id } }
        ).then((res) => {
          if (res.status == 200) {
            console.log("response", res);
            console.log("success upload image");
          }
        })
      }
    })
  }

  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.selectPhotoTapped()}>
            {this.state.imageSource === null ?
              <Image                
                source={require('../../images/default.png')}
                style={styles.userImage}
              /> :
              <Image                
                source={this.state.imageSource}
                style={styles.userImage}
              />
            }
          </TouchableOpacity>

          <Text style={styles.userName}>{this.props.userInfo.first_name + " " + this.props.userInfo.last_name}</Text>

          <TouchableOpacity
            style={styles.sendMessage}
            onPress={() => this.startChat()}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>Send Message</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 0.5 }}>
          <TouchableOpacity style={styles.row}>
            <Text style={{ fontSize: 18, color: 'grey', fontWeight: 'bold' }}>View past posts</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <Text style={{ fontSize: 18, color: 'grey', fontWeight: 'bold' }}>View past answers</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => this.navigation.navigate("SignIn")}>
            <Text style={{ fontSize: 18, color: 'grey', fontWeight: 'bold' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { userInfo: state.reducers.userInfo };
}

export default connect(mapStateToProps)(ProfilePage);