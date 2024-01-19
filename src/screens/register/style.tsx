import {StyleSheet} from 'react-native'


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems:'center',
    alignContent:'center',
    alignSelf:'center',
    justifyContent:'center',
    paddingTop:'3%',
    width:"100%"
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
    color: "#ffffff",
    borderRadius: 5,
    fontWeight: "bold",
  },
     image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});