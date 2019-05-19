import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#43a1c9',
    },
    content:{
        borderTopColor: 'grey',
        borderTopWidth: 1,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        height:450,
        fontSize:20,
        marginTop:20
    },
    postButton:{
        marginTop:15,
        backgroundColor:'grey',
        height: 46,
        paddingLeft: 16,
        paddingRight: 16,
        width:150,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row-reverse',
    }
});

export {styles};