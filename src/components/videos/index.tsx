import React, { useState, useCallback, useRef, useEffect } from "react";
import { Text, View, Alert} from "react-native";
import {useNavigation} from '@react-navigation/native'
import YoutubePlayer from "react-native-youtube-iframe";
import { ActivityIndicator} from 'react-native';
import { doc, setDoc,addDoc,serverTimestamp,collection } from "firebase/firestore"; 
import {auth} from '../../../firebaseConfig';
import {db} from '../../../firebaseConfig';
import {onAuthStateChanged} from 'firebase/auth';

import * as ScreenOrientation from 'expo-screen-orientation';
type video = {
	videoid:string,
  title: string;
}

export default function VideoList({videoid, title}:video) {
  const [playing, setPlaying] = useState(false);
 const [ready, setReady] = useState(false);
 const navigation = useNavigation();
 const [useruuid, setUseruuid] = useState<string>('');


 const userUuid =  () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUseruuid(user.uid);
    });
  };


  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
     addDoc(collection(db, "assistidos"), {
      idVideo: videoid,
      userId: useruuid,
      vistoEm: serverTimestamp()
    })
      Alert.alert("Video Finalizado!","Que Bom Você terminou de assistir um belo video.",[
        {text: 'Continuar Assistindo', style:'cancel'},
        {text:'Fechar', style:'destructive'},
      ]);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  const onFullScreenChange = useCallback((isFullScreen: boolean)=>{
    if(isFullScreen){
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }else{
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  },[]);

useEffect(()=>{
  userUuid()
},[]);




  return (
    <View style={{paddingLeft:10, paddingRight:10, marginBottom:10}}>
      <Text style={{fontStyle:'italic',fontWeight:'bold',
       fontSize:18,backgroundColor:'darkgrey',
         paddingLeft:10}}>{title}</Text>

      <YoutubePlayer
        height={ready ? 200 : 0}
        play={playing}
        videoId={videoid}
        onChangeState={onStateChange}
        allowWebViewZoom={true}
        onFullScreenChange={onFullScreenChange}
        onReady={()=>setReady(true)}
      />
      
  { !ready && <ActivityIndicator size={30} color="red" style={{marginBottom:20}} />}
    </View>
  );
}