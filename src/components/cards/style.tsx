import { StyleSheet } from "react-native";


export const container = StyleSheet.create({
    card: {
        borderRadius: 10,
        backgroundColor: '#6b4fb7',
        shadowColor: '#000000',
        width: 250,
        height: 90,
        marginTop: 20,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      title: {
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontSize: 25
        
      },
      text: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
      
      },

});


export const container2 = StyleSheet.create({
    cards: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#32098a',
        shadowColor: '#000000',
        width: "50%",
        height: 100,
        marginTop: 10,
        marginLeft: 2,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      title: {
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontSize: 25
        
      },
      content: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
      },

});
