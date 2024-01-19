import {View, FlatList} from 'react-native';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import { useEffect, useState } from 'react';
import VideoList from '../../components/videos';
type PlayerProps = {
    id: string;
    licao: number;
    tema: string;
    youtube_id: string;
  };

export default function Minhasaulas({ route }: { route: { params: PlayerProps } }){
    const { id } = route.params;
    const [aula, setAula] = useState<PlayerProps[]>()
    useEffect(()=>{
        const q = query(collection(db, "aulas"));
        const unsubscribeData = onSnapshot(q, (querySnapshot) => {
           const modulo = [];
           querySnapshot.forEach((doc) => {
            modulo.push(doc.data());
           });
        setAula(modulo)
          });
        return ()=> unsubscribeData();
      },[]);
return (
    <View>
         <FlatList
     data={aula}
     renderItem={({item, index}) => <VideoList
    key={index} 
    videoid={item.youtube_id}
    title={`Nº. ${item.licao} - ${item.tema}`}
   />}
     keyExtractor={item => item.youtube_id}
   />
        </View>
);
}