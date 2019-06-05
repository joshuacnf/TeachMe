import React, { Component } from 'react';
import { View, Button } from 'react-native';
import styles from './style';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';

export default class Register extends Component {
    static navigationOptions = {
        title: "Post"
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
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={(firstname) => this.setState({firstname})}
                    value={this.state.text}
                    placeholder="First Name"
                    style={styles.input}
                />
                <TextInput
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.text}
                    placeholder="Last Name"
                    style={styles.input}
                />
                <TextInput
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.text}
                    placeholder="Email (@edu)"
                    style={styles.input}
                />
                <TextInput
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.text}
                    placeholder="Password"
                    style={styles.input}
                />
                <Button 
                    title="Sign Up" 
                    onPress={() => this.register()} 
                    style={styles.button}
                />
            </View>
        );
    }
}
