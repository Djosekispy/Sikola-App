import { useEffect } from "react";
import {signOut} from 'firebase/auth';
import { auth } from "../../../firebaseConfig";
import {useNavigation} from '@react-navigation/native'
export function Logout(){
     const navigation = useNavigation();
       const handleLogin = () => {
    navigation.navigate('login');
  };
    useEffect(()=>{
     signOut(auth);
      handleLogin();
    },[]);
}