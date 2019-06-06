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
            text:'',
            suggestedTags:['Computer Science','Writing','parking','ENG110','Administration'
                            ,'Sports','Ashe Center','Food','CS146','traffic','graduation',
                        'Research','Internship']
        };
    }

    _submitTag = () => {
        this.navigation.navigate('AddPostScreen',{
            tagName:this.state.text
        });
    }

    _submitSuggestedTag = (name) => {
        this.navigation.navigate('AddPostScreen',{
            tagName:name
        });
    }

    _renderSuggested = (name) => {
        return (
            <TouchableOpacity 
                style={styles.suggestedTag} 
                onPress={() => this._submitSuggestedTag(name)}
            >
                <Text style={{fontSize:18}}>{name}</Text>
            </TouchableOpacity>
        )
    }

    render(){
        return (
            <ScrollView style={styles.container}>
                <View >                       
                    <View style={styles.tagTyping}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Enter a tag"
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({text})}
                            autoFocus={true}
                        />
                            
                        <TouchableOpacity style={styles.textInputButton} onPress={this._submitTag}>
                            <Text style={{color:'white',fontSize:16}}>Add</Text>
                        </TouchableOpacity>   
                    </View>     
                </View>

                <Text style={{color:'grey',fontSize:24,marginTop:30}}>Suggested</Text>

                <View style={{marginTop:2}}>
                    {this.state.suggestedTags.map(value => this._renderSuggested(value))}
                </View>
                
                
            </ScrollView>
        );
    }
}

export default SelectTagsPage;
