import { StyleSheet} from 'react-native'


export const styles = StyleSheet.create({
	flexContent: {
		display:"flex",
		flexDirection: "row",
		padding:4,
		borderBottomColor: "darkgrey",
		borderBottomWidth:2
	},
	imageContent: {
		width: "20%",
		height: 70,
		borderRadius: 50,
		borderWidth:2,
		borderColor: "skyblue",
		overflow: 'hidden'
	},
	 imagen:{
    width: "100%",
    height:"100%",
    borderRadius: 50,
    aspectRatio: "1/1"
  },
  titleContent: {
  	maxWidth: '60%', 
  	marginLeft:10,
  	height:50,
  	overflow:'hidden',
  	paddingTop: "3%"
  },
  title:{
  		fontWeight: '700',
  		width: 'auto',
  		fontSize: 15
  }
});