import {Text, View } from 'react-native';
import {container2} from './style';
import { Card } from '@rneui/themed';

type props = {
    title: string;
    content: number;
}

export default function SecondCard({title, content, ...rest}: props){
    return (
        <View {...rest}>
            <Text style={container2.title}>{title}</Text>
            <Text style={container2.content}>{content}</Text>
        </View>
    );
}

