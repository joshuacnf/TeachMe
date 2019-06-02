import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      paddingTop:8,
      backgroundColor: 'white',
    },
    title:{
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        height:40,
        fontSize:20,
        marginTop:1,
    },
    suggestedTag:{
      borderBottomColor:'grey',
      borderBottomWidth:0.3,
      paddingBottom: 16,
      paddingTop:16
    },
    textInput: {
      flex:0.8,
      borderRadius: 10,
      borderColor: '#CCC',
      fontSize: 20,
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