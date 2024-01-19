import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  wrapper: {
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "#ffffff",
    alignItems:'center',
    alignContent:'center',
    alignSelf:'center',
    justifyContent:'center',
    borderRadius:10,
  },
  footer: {
 display:'flex',
 justifyContent: 'flex-start',
 flexDirection:'row',
 flexWrap:'nowrap',
 padding:6
  },
  textFooter:{
   fontSize:15,
   color:"darkblue",
   marginRight:10
  },
  logo: {
    width: 100,
    height: 100,
    margin: 20,
  },
  form: {
    margin: 20,
  },
  input: {
    width: 300,
    height: 40,
    marginBottom:10,
    borderRadius: 5,
    borderColor: "#000000",
    borderWidth: 1,
    padding: 10,
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: "#000000",
    color: "#ffffff",
    borderRadius: 5,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#424242',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttons: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});