import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';

import styles from './style'

export default class Post extends Component {
    static navigationOptions = {
        title: "Post"
    };
  
    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {
            answer: '',
        };
    }
    
    _submitAnswer = answer => {
        this.setState({answer});
    }

    _changeAnswer(){
        // POST
    }

    render() {
        return (
            <View
                style={styles.container}
            >
                <Card>
                    <Text
                        style={styles.title}
                    >
                        {/* {this.props.title} */}
                        title
                    </Text>
                    <Text
                        style={styles.smalltext}
                    >
                        {/* {this.props.author} */}
                        author
                    </Text>
                    <Text
                        style={styles.smalltext}
                    >
                        {/* {this.props.time} */}
                        time
                    </Text>
                </Card>
                <Card>
                    <Text>
                        {/* {this.props.details} */}
                        details
                    </Text>
                </Card>
                <TextInput
                    placeholder='your answer here'
                    onChange={this._changeAnswer}
                    style={styles.textbox}
                />
                <Button
                    onPress={this._submitAnswer}
                    title="Submit" 
                    style={styles.button}
                />
            </View>
        );
    }
}