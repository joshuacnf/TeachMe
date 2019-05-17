import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      paddingTop: 25,
      backgroundColor: '#F5FCFF',
    },
    title:{
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        height:40,
        fontSize:20,
        marginTop:10,
    },
    tags:{
        flexDirection: 'row',
        paddingTop:10,
        height:35
    },
    tagContainer:{
        marginTop:8,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    content:{
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        height:350,
        fontSize:20,
        marginTop:10,

    },
    postButton:{
        marginTop:15,
        borderRadius: 23,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: '#ff3333',
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