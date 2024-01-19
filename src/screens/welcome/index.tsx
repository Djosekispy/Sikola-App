
import {ImageBackground,
 View,
  Text, 
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { LogBox } from 'react-native';
import {useNavigation} from '@react-navigation/native'
const foto = "https://img.freepik.com/vetores-gratis/bonita-crianca-sorridente-feliz-isolada-no-branco_1308-40486.jpg?w=360&t=st=1704549432~exp=1704550032~hmac=6ba38a3b72a6bfec1244fe9e175ed3297d9a37b1c9c46e1fce9329706751a9af";
export default function Welcome(){
const navigation = useNavigation();

LogBox.ignoreLogs(['new NativeEventEmitter']); 
LogBox.ignoreAllLogs();

  const handleLogin = () => {
    navigation.navigate('login');
  };
return(
  <View style={styles.container}>
    <ImageBackground source={{uri: foto}} resizeMode="center" style={styles.image}>
    </ImageBackground>
    <Text style={styles.title}>
    Sikola App
    </Text>
       <Text style={styles.content}>
   O melhor lugar para aprender a qualquer momento
    </Text>
            <TouchableOpacity 
            style={styles.button}
            onPress={handleLogin}
            >
  <Text  style={styles.text}>Continuar</Text>
      </TouchableOpacity>

  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
   fontSize: 18,
   fontWeight: 'bold',
   textAlign: 'center'
  },
    content: {
   fontSize: 12,
   fontWeight: '400',
   textAlign: 'center'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    marginTop: 12,
    marginBottom: 16
  },
  text: {
  borderRadius: 20,
    padding:10,
    marginLeft: 12,
    marginRight: 12,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#6b4fb7',
  },
});