import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      paddingTop:8,
      backgroundColor: '#43a1c9',
    },
    title:{
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        height:40,
        fontSize:20,
        marginTop:1,
    },
    tagText:{
        flexDirection: 'row',
        paddingTop:5,
        height:35
    },
    tagContainer:{
        marginTop:2,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    content:{
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        height:350,
        fontSize:20,
        marginTop:5,

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

    }
);

export {styles};