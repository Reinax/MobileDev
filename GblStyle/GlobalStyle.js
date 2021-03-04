import { StyleSheet } from 'react-native';

const global_styles = StyleSheet.create ({
    background: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
    },
    signInBackground: {
        flex:1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView: {
        width:"80%",
        backgroundColor:"#2196F3",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText: {
        height:50 ,
        color: "white"
      },
    profileText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 75,
        color: "white"
    },
    profileContainer: {
        flex:1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    itemView: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    itemInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40
      },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 20,
        margin: 20
    },
    buttonStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    }
});

export { global_styles }