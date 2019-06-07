import { StyleSheet } from 'react-native';


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
          height:280,
          borderBottomColor: '#DCDCDC',
          borderBottomWidth: 0.8,
      },
      tagArea:{
          marginTop:15
      },
      addTag:{
          marginTop:14,
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
