import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
    },  
    header:{
        flex:0.5,
        paddingTop:15,
        alignItems: 'center',
    },
    userImage:{
        borderRadius: 65,
        width:130,
        height:130,
        borderWidth:0.5,
        borderColor: 'grey',
    },
    userName:{
        marginTop:20,
        fontSize:25,
        color:'grey'
    },
    sendMessage:{
            marginTop:20,
            backgroundColor:'#1a8cff',
            alignItems: 'center',
            width:'90%',
            borderRadius: 23,
            justifyContent:'center',
            height:45
        
    },
   row:{
       width:'100%',
       height:50,
       borderBottomColor: 'grey',
       borderBottomWidth: 0.25,
       justifyContent:'center',
       alignItems:'center'
   } 
});

export {styles};

