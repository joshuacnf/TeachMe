import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';
import {styles} from './styles';
import { throwStatement } from '@babel/types';
import ImagePicker from 'react-native-image-picker';



export default class ProfilePage extends Component{

    static navigationOptions = {
      title: "Profile"
    };

    constructor(props){
        super(props);
        this.navigation = props.navigation;
        this.state = {
            userName:'Chengyu Wang',
            imageSource:null
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

    startChat(){
      this.navigation.navigate('ChatPage');
    }



    render(){
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
                    
                    
                    <Text style={styles.userName}>Chengyu Wang</Text>

                    <TouchableOpacity 
                      style={styles.sendMessage}
                      onPress={() => this.startChat()}
                    > 
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

