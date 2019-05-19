import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';


export default class TagButton extends React.Component{
    render(){
        return (
            <TouchableOpacity style={styles.touchable}>
                <View style={styles.view}>
                    <Text style={styles.text}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    touchable:{
        marginRight: 12,
        marginBottom:15
    },
    view: {
        flexDirection: 'row',
        borderRadius: 23,
        borderColor: 'white',
        borderWidth: 1,
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white',
        paddingLeft: 16,
        paddingRight: 16
      },
      text: {
        fontSize: 18,
        textAlign: 'center',
        color: 'black',
        fontSize: 16
      }

});