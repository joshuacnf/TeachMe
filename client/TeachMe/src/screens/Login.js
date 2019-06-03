import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Home'
  }

  constructor(props) {
      super(props);
      this.navigation = props.navigation;
      this.state = {
          email: '',
          password: '',
      }
  }

  login() {
    userInfo = {
      user_id: '',
      first_name: '',
      last_name: '',
      email: this.state.email,
      password: this.state.password,
  };

  axios.get('http://18.221.224.217:8080/login', {params:{user_info: userInfo}})
      .then(res => {
          console.log(res);
          if(res.status == 404){
            // login failed
            this.setState({email:'', password:''})
          }
          else if (res.status == 200){
            // login succeeded
            this.navigation.navigate('Home', {email: this.state.email});
            this.props.
          }
      })
      .catch(error => {
          console.log(error.response)
      });
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../images/Octocat.png')}
            />
            <Text style={styles.title}>An App made for online and offline tutoring</Text>
          </View>
          <View style={styles.formContainer}>
          <TextInput
            placeholder="@edu email"
            placeholderTextColor='rgba(255,255,255,0.7)'
            style={styles.input}
            onChangeText={(email) => this.setState({email})}
          />
          <TextInput
            placeholder="password"
            placeholderTextColor='rgba(255,255,255,0.7)'
            secureTextEntry
            style={styles.input}
            onChangeText={(password) => this.setState({password})}
          />
          <TouchableOpacity 
            style={styles.buttonContainer} 
            onPress={() => this.login()}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          </View>
        </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    width: 160,
    textAlign: 'center',
    opacity: 0.9
  }, 
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 20
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  }
});
