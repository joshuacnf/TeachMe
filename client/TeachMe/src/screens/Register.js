import React, { Component } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';

export default class Register extends Component {
    static navigationOptions = {
        title: "Register"
    };

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        };
    }

    register() {
        userInfo = {
            user_id: '',
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
        };

        axios.get('http://18.221.224.217:8080/register', {params:{user_info: userInfo}})
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error.response)
            });
        this.navigation.navigate('SignIn')
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={(firstname) => this.setState({firstname})}
                    value={this.state.text}
                    placeholder="First Name"
                    style={styles.input}
                    autoCorrect = 'none'
                />
                <TextInput
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.text}
                    placeholder="Last Name"
                    style={styles.input}
                    autoCorrect = 'none'
                />
                <TextInput
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.text}
                    placeholder="Email (@edu)"
                    style={styles.input}
                    autoCapitalize = 'none'
                />
                <TextInput
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.text}
                    placeholder="Password"
                    style={styles.input}
                    autoCorrect = 'none'
                    secureTextEntry
                />
                <TouchableOpacity
                  title="Sign Up"
                  style={styles.buttonContainer}
                  onPress={() => this.register()}
                >
                  <Text style={styles.buttonText}>SIGNUP</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
/*
#1a8cff
    backgroundColor: 'rgba(255,255,255,0.2)',
        backgroundColor: '#2980b9',
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    marginTop:20
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
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    color: '#000000',
    paddingHorizontal: 20
  },
  buttonContainer: {
    backgroundColor: '#1a8cff',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  formContainer:{
    marginTop:50
  }
});
