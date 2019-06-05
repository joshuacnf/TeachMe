import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import {styles} from './styles';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from "react-redux";

class ProfilePage extends Component{
    static navigationOptions = {
        title: 'User',
        // headerLeft: null,
        // tabBarIcon: ({ focused }) => {
            // return <Icon name="user" size={20} color={focused ? '#2196F3' : '#808080'}/>
        // },
    }

    constructor(props){
        super(props);
        this.state = {
            imageSource:null,
            userInfo: this.props.userInfo,
        }
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
            let source = { uri: response.uri };
    
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
            this.setState({
              imageSource: source
            });
          }
        });
    }

    render(){
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
                    
                    <Text style={styles.userName}>{this.props.userInfo.first_name+" "+this.props.userInfo.last_name}</Text>

                    <TouchableOpacity style={styles.sendMessage}> 
                        <Text style={{color:'white',fontSize:20}}>Send Message</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex:0.5}}>              
                    <TouchableOpacity style={styles.row}>
                        <Text style={{fontSize:18,color:'grey',fontWeight:'bold'}}>View past posts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.row}>
                        <Text style={{fontSize:18,color:'grey',fontWeight:'bold'}}>View past answers</Text>
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