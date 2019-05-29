import React, {Component} from 'react';
import { View, Text, Button } from 'react-native';
import { Card } from 'react-native-elements';

import styles from './style'
import axios from 'axios';

export default class Post extends Component {
    static navigationOptions = {
        title: "Post"
    };

    // componentDidMount() {
    //     axios.get('http://18.221.224.217:8080/get')
    //         .then(res => {
    //             console.log(res);
    //             this.setState({posts: res.data});
    //         })
    // }
  
    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {
        };
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
                <Card>
                    <Text>
                        answer 1
                    </Text>
                </Card>
                <Card>
                    <Text>
                        answer 2
                    </Text>
                </Card>
                <Card>
                    <Text>
                        answer 3
                    </Text>
                </Card>
                <Button
                    onPress={() => this.navigation.navigate('AnswerPage')} 
                    title="add your answer" 
                    style={styles.buttonText}
                />
                {/* <TouchableHighlight 
                    style={styles.addButton}
                    onPress = {this._addAnswer}
                >
                    <Icon name="plus" size={30}/>
                </TouchableHighlight> */}
            </View>
        );
    }
}