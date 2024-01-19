import {View, Text, Image} from 'react-native';
import { style } from './style';



export default function Profile(){
    const image= "https://avatars.githubusercontent.com/u/123516423?v=4";
    return(
        <View style={style.profile}>
            <View style={style.imageContainer}>
            <Image source={{ uri: image }} style={style.img} />
            </View>
        </View>
    );
}