import { StyleSheet } from 'react-native';

/*const styles = StyleSheet.create({
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
);*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        paddingTop:10,
        backgroundColor: 'white',
      },
      title:{
          fontSize:20,
          width:'100%'
      },
      content:{
          fontSize:18,
          marginTop:15,
          width:'100%',
          height:260
      },
      tagArea:{
          marginTop:20
      },
      addTag:{
          marginTop:17,
          marginLeft:12
      },
      uploadBtn:{
          backgroundColor:'#1a8cff',
          alignItems: 'center',
          width:'100%',
          borderRadius: 23,
          justifyContent:'center',
          height:45
      },
      textInputView: {
        padding:2
      },
      textInput: {
        flex:0.8,
        borderRadius: 10,
        borderColor: '#CCC',
        fontSize: 18,
        textAlignVertical: 'top'
      },
      textInputButton: {
        flex:0.2,
        backgroundColor:"#1a8cff",
        width:70,
        borderRadius:15,
        height:30,
        alignItems:'center',
        justifyContent: 'center'
      },
      tagTyping:{
          marginTop:10,
          flexDirection:'row',
          alignItems:'center'
      }
});

export {styles};