import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { styles } from '../style/styles';
import { Link, router, useNavigation } from 'expo-router';
import React, { useState, useEffect } from 'react';
import VideoList from '../../components/videos/'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebaseConfig';

type videos = {
  title: string;
   youtube_id: string;

}

export default function Extra() {
  const [data, setData] = useState<videos[]>([])
  

useEffect(()=>{
  const q = query(collection(db, "extras"));
 const unsubscribeData = onSnapshot(q, (querySnapshot) => {
    const extra = [];
    querySnapshot.forEach((doc) => {
      extra.push(doc.data());
    });
    setData(extra);
  });
  
  return ()=> unsubscribeData();
},[]);


  return (
   <>
   <View className="bg-[#0F0817] py-8">
     <FlatList
     data={data}
     renderItem={({item, index}) => <VideoList
    key={index} 
    videoid={item.youtube_id}
    title={item.title}
   />}
     keyExtractor={item => item.youtube_id}
   />
</View>
    </>
  );
}
