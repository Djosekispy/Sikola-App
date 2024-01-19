import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Modal,
  Image,
  ActivityIndicator
} from "react-native";
import { useForm,  Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {useNavigation} from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import {styles} from './style';
import '../../globals/global.css';
import { signInWithEmailAndPassword,
sendPasswordResetEmail,
sendEmailVerification 
 } from "firebase/auth";

import {auth} from '../../../firebaseConfig';
import { Pressable } from "react-native";


const foto = 'https://img.freepik.com/free-vector/kids-different-races-dancing-together_1308-135104.jpg?size=626&ext=jpg&uid=R37946861&ga=GA1.2.833094731.1702764577&semt=ais';
const schema = yup
  .object({
   email: yup.string().email("Insira um Email Válido").required("Este Campo é obrigatório"),
  password: yup.string().min(8,"Deve ter pelo menos 6 caracteres").max(32,"Apenas 32 caracteres são permitidos").required("Este Campo é obrigatório"),
  })
  .required()


  type UserProps = {
    email: string;
    password: string,
  }
const Login = () => {
  const navigation = useNavigation();
   const [show, setShow] = useState(true);
   const [isloading, SetIsloading] = useState(false);
   const [modalVisible, setModalVisible] = useState(false);
   const [email, setEmail] = useState('');
 const {
   control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data:UserProps) =>{
    SetIsloading(true)
  signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      const user = userCredential.user;
        if (user.emailVerified) {
           handleLogin();
      } else {
       Alert.alert("Login","Parece que a sua conta não foi verificada.",[
        {text:'Continuar', style:'cancel'},
        {text:'Reenviar', onPress: ()=>{reenviarEmaildeConfirmacao(user)}}
      ]);
      }
    })
    .catch((error) => {
      Alert.alert("Login","Verifique a sua conexão de internet ou Crie uma conta.",[
        {text:'Cancelar', style:'cancel'},
        {text:'Criar Conta', onPress: ()=>handleRegister}
      ]);
    })
    .finally(()=>SetIsloading(false));
  }

const reenviarEmaildeConfirmacao = async (user) => {
        await sendEmailVerification(user);
  };



const newPassword = ()=>{
sendPasswordResetEmail(auth, email)
  .then(() => {
    Alert.alert("Enviado","Enviamos-lhe um código para reposição da sua senha!",[
      {text:'Continuar', style:'cancel'}
    ]);
  })
  .catch((error) => {
        Alert.alert("Message","Notamos um ao tentar mandar o E-mail, verifique a sua conexão e tente mais tarde",[
      {text:'Tentar Novamente', style:'cancel'}
    ]);
  });
};
  const handleLogin = () => {
    navigation.navigate('main');
  };

const handleRegister = () => {
    navigation.navigate('register');
  };

  return (
   <ScrollView className='bg-[#0F0817]'>
    <View className="flex-1 justify-center">
    <View style={{
    justifyContent: 'center',
     paddingTop: 34,
    alignItems: 'center'}}>
    <View style={{   position: 'relative',
    height: 370,
    width:370,
    borderBottomRightRadius: 100,
    borderTopLeftRadius: 100,
   
    overflow: 'hidden'}}>
      <Image source={{ uri: foto }} style={styles.image} />
      </View>
</View>

      <View style={styles.form}>
        <Text className='text-[#c51162] pb-4 '>{errors.email?.message}</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="E-mail"
              className="w-full bg-[#fff] h-12 text-left px-4 rounded-full"
              inputMode='email'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
        <Text className='text-[#c51162] my-2' >{errors.password?.message}</Text>
       <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{position:'relative'}}>
          <TextInput
            placeholder="Palavra passe"
              className="w-full bg-[#fff] h-12 text-left px-4 rounded-full"
              inputMode='text'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={show}
          />
          { show ?
           <Ionicons name="lock-closed" size={24} onPress={()=>setShow(!show)}
            
             className='absolute top-2 right-3'
             /> :
               <Ionicons name="lock-open-outline" size={24} onPress={()=>setShow(!show)}
             style={{position:'absolute',top:3,right:2}} />
          }
        </View>
        )}
        name="password"
      />

        
  <Text className='font-ligth text-[#fff] pb-4 pt-4' onPress={() => {
  setModalVisible(true)
   SetIsloading(true);
  }}>Esqueceu sua senha?</Text>
 

      <Pressable className="w-full py-4">

      {isloading? 
      <ActivityIndicator size={24} color='#6b4fb7'  /> 
         : 
     
     <Text  onPress={handleSubmit(onSubmit)}  className='bg-[#c51162] rounded-full w-94  text-black  text-[#fff] py-4 text-center text-2xl'> Entrar </Text>
      }
      </Pressable>

      <Text className='text-[#fff] text-center p-2'><Text></Text>Ou</Text>
 <Text className="text-[#fff] text-center my-8 bg-[#6b4fb7] p-4 rounded-full" onPress={handleRegister}>Criar conta</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          SetIsloading(!isloading);
        }}>
        <View style={styles.centeredView}>


          <View style={styles.modalView}>
           <Ionicons name='close' size={24} 
           style={styles.buttonClose}
            className='bg-[#ff]' 
            onPress={()=>{
                SetIsloading(!isloading);
              setModalVisible(!modalVisible)
            }}
            />
            <Text style={styles.modalText} className='text-2xl text-white'>Seu E-mail</Text>
            <TextInput
            placeholder="example@gmail.com"
              style={[styles.input,{backgroundColor:'white'}]}
              inputMode='text'
            onChangeText={setEmail}
            value={email}
          />
            <Pressable
              className='bg-[#6b4fb7]'
              style={[styles.buttons]}
              onPress={() =>{ 
                newPassword();
              setModalVisible(!modalVisible)
              SetIsloading(false);
              }}>
              <Text style={styles.textStyle}>Receber sms</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
        </View>
    </ScrollView>
  );
};


export default Login;
