import { StyleSheet } from "react-native";
import { useFonts } from 'expo-font';

/*export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
  });
}*/

export const imageContainer = StyleSheet.create({
  container : {
    marginTop: 10,
    width: 150,
    height: 180,
   alignItems: 'center'

  },
  imagen:{
    width: "100%",
    height:"100%",
    borderRadius: 50,
    aspectRatio: "1/1"
  }

});