import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
    },  
    header:{
        flex:0.3,
        paddingTop:15,
        alignItems: 'center',
    },
    userImage:{
        borderRadius: 50,
        width:100,
        height:100,
        borderWidth:0.5,
        borderColor: 'grey',
    },
    userName:{
        marginTop:10,
        fontSize:20,
        color:'black'
    },
    userEmail:{
        marginTop:5,
        fontSize:15,
        color:'grey',
    },  
    sendMessage:{
            marginTop:15,
            backgroundColor:'#1a8cff',
            alignItems: 'center',
            width:'90%',
            borderRadius: 23,
            justifyContent:'center',
            height:45, 
    },
   row:{
       marginTop:70,
       width:'100%',
       height:30,
       borderBottomColor: 'grey',
       borderBottomWidth: 0.35,
       justifyContent:'center',
       alignItems:'center'
   } 
});

export {styles};

