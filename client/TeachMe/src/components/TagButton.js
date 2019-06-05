import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';


export default class TagButton extends React.Component{
    render(){
        return (
            <TouchableOpacity style={styles.touchable} onPress={() => this.props.delete(this.props.title)}>
                <View style={styles.view}>
                    <Text style={styles.text}>{this.props.title}</Text>
                    <Icon 
                        name="close"
                        color="grey"
                    />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    touchable:{
        marginRight: 11,
        marginBottom:15
    },
    view: {
        flexDirection: 'row',
        borderColor: 'grey',
        borderWidth: 1,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white',
        paddingLeft: 12,
        paddingRight: 2
      },
      text: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        fontSize: 16
      }

});