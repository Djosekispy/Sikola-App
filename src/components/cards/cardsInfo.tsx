import {Text, View } from 'react-native';
import {container} from './style';
type props = {
    title: string;
    content: string;
}

export default function Cards(prop: props){
    return (
        <View className='my-4 rounded py-4 mx-12 w-94 bg-cyan-700'>
            <Text style={container.title}>{prop.title}</Text>
            <Text style={container.text}>{prop.content}</Text>
        </View>
    );
}

