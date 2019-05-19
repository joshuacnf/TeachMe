import React, {Component} from 'react';
import {View,Text,TextInput,Button,TouchableOpacity,ScrollView} from 'react-native';
import {styles} from './styles';
import TagButton from './TagButton';

class PostPage extends Component {
    static navigationOptions = {
        title: "PostPage"
    };

    constructor(props){
        super(props);
        this.navigation = props.navigation;
        this.state = {
            tags:[]
        };
    }

    //componentWillMount(){
    //    const tagName = this.props.navigation.getParam('tagName');
      //  console.log(tagName);
      
        //this.setState({tags:[...this.state.tags,tagName]});
  // }

    _renderTags = (name) => {
        return (
            <TagButton title={name} key={name}/>
        );
    }


    _selectTags = () => {
        this.navigation.navigate('SelectTagsPage');
    }

    _showAnswer = () => {
        this.navigation.navigate('AnswerPage');
    }

    componentWillReceiveProps(nextProps){
        const tagName = nextProps.navigation.getParam('tagName');
        if(tagName !== undefined && tagName !== ''){
            if(!this.state.tags.includes(tagName)){
                this.setState({tags:[...this.state.tags,tagName]});
            }
        }
    }

    render(){
       
        return (
            <View style={styles.container}>
                <ScrollView>
                    <TextInput
                        style={styles.title}
                        placeholder="Please enter your post title here"
                        onChangeText={(text) => this.setState({text})}
                    />
                    <View style={styles.tagContainer}>
                        <View style={styles.tagText}>
                            <Text style={{ fontSize:20}}>All Tags:</Text>
                            <TouchableOpacity onPress={this._selectTags}>
                                <Text style={{color:'blue',fontSize:20}}>  Add a new tag</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',flexWrap:'wrap',paddingTop:5}}>
                            {this.state.tags.map(value => this._renderTags(value))}
                        </View>
                    </View>
                    <TextInput
                        style={styles.content}
                        placeholder="Please enter your content here...."
                        multiline={true}
                        onChangeText={(text) => this.setState({text})}
                    />
                    <View style={{flexDirection:'row-reverse'}}>
                        <TouchableOpacity style={styles.postButton} onPress={this._showAnswer}>
                            <Text style={{fontSize:20}}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default PostPage;

