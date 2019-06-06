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

class OtherProfilePage extends Component{
    static navigationOptions = {
        title: 'User',
        // headerLeft: null,
        // tabBarIcon: ({ focused }) => {
            // return <Icon name="user" size={20} color={focused ? '#2196F3' : '#808080'}/>
        // },
    }

    constructor(props){
        super(props);
        this.navigation = props.navigation;
        this.state = {
            imageSource:null,
            userInfo: props.navigation.state.params.userInfo,
        }
    }


    render(){
        console.log(this.props)
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity>
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

                    <Text style={styles.userName}>{this.state.userInfo.first_name+" "+this.state.userInfo.last_name}</Text>

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

export default connect(mapStateToProps)(OtherProfilePage);
