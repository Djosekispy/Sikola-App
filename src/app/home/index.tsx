import { Text, View,SafeAreaView, StyleSheet } from 'react-native';
import { styles } from '../style/styles';
import Home from '../../screens/home/home';

export default function Index() {
  
  return (
    <>
    <SafeAreaView className='bg-[#0F0817]'>
    <View>
     <Home /> 
    </View>
    </SafeAreaView>
    </>
  );
}
