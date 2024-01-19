import {View, Image, Text} from 'react-native';
import { imageContainer } from './style';
import GraficLessons from '../grafic/GraficLensons';

export default function Imagen(){
    return (
        <View style={imageContainer.container}>
      <GraficLessons />
        </View>
    );
}