import { View, Text, Image} from 'react-native';
import {styles} from './style';

type videos = {
	title: string,
	url: string,
	cover: string,
	discipline: string
}

export default function LessonsList({title, url, cover, discipline}: videos){

	return (
 	  <View style={styles.flexContent}>
<View style={styles.imageContent}>
<Image source={{uri: url}} style={styles.imagen} />
</View>

<View style={styles.titleContent}>
<Text style={styles.title}>{title} </Text>
</View>
 	  </View>

		);
}