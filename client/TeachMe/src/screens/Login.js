import React, { Component } from 'react';
import { 
    StyleSheet, 
    Image, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity,
    KeyboardAvoidingView
  } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions';

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
    headerLeft: null
  }

  constructor(props) {
      super();
      this.navigation = props.navigation;
      this.state = {
          email: props.userInfo.email,
          password: props.userInfo.password,
      }
  }
  changeReduxStore(userInfo) {
        this.props.setUserInfo(userInfo);
    };

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
        if(res.status == 404){
          // login failed
          this.setState({email:'', password:''})
          //  add error message to user
        }
        else if (res.status == 200){
          // login succeeded
          this.changeReduxStore(res.data);
          this.navigation.navigate('BottomTab', {email: this.state.email});
        }
    })
    .catch(error => {
        console.log(error.response)
    });
  }

  register = () => {
    this.navigation.navigate('SignUp');
  };

  render() {
    return (
        <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../images/Octocat.png')}
            />
            <Text style={styles.title}>An App made for online and offline tutoring</Text>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              autoCapitalize = 'none'
              style={styles.input}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
            <TextInput
              secureTextEntry
              style={styles.input}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              secureTextEntry={true}
            />
            <TouchableOpacity 
              style={styles.buttonContainer} 
              onPress={() => this.login()}
            >
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.buttonContainer} 
              onPress={() => this.navigation.navigate('SignUp')}
            >
              <Text style={styles.buttonText}>SIGNUP</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
    return { userInfo: state.reducers.userInfo };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
