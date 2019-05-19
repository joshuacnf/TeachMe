import React, {Component} from 'react';
import {View,Text,TextInput,Button,TouchableOpacity,ScrollView} from 'react-native';
import {styles} from './styles';

class SelectTagsPage extends Component {
    static navigationOptions = {
        title: "SelectTagsPage"
    };

    constructor(props){
        super(props);
        this.navigation = props.navigation;
        this.state = {
            text:''
        };
    }

    _submitTag = () => {
        this.navigation.navigate('PostPage',{
            tagName:this.state.text
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <TextInput 
                    style={styles.title}
                    placeholder="Type your own tags here..."
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <Button 
                    title="Confirm" 
                    color="blue"
                    onPress={this._submitTag}
                />
                
            </View>
        );
    }
}

export default SelectTagsPage;
