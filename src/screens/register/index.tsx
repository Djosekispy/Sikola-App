import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
   Alert,
   Image
} from "react-native";
import { useForm,  Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {useNavigation} from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import {styles} from './style';
import { doc, setDoc,addDoc,serverTimestamp,collection } from "firebase/firestore"; 
import {auth} from '../../../firebaseConfig';
import {db} from '../../../firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const foto = 'https://img.freepik.com/fotos-gratis/organizados-em-livros-verticais_1101-119.jpg?1&w=740&t=st=1704384971~exp=1704385571~hmac=f98961f9d1eeb14203c993de06c1d4355345ba6b4b757c4191741d6fba20ce3b';

const schema = yup
  .object({
    nome: yup.string().min(10, "É permitido apenas acima de 9 caracteres").required("Este Campo é obrigatório"),
    telefone: yup.number().min(8,"Deve ter no minimo 9 digitos").required("Este Campo é obrigatório"),
   email: yup.string().email("Insira um Email Válido").required("Este Campo é obrigatório"),
  password: yup.string().min(8,"Deve ter pelo menos 6 caracteres").max(32,"Apenas 32 caracteres são permitidos").required("Este Campo é obrigatório"),
   confirm_password: yup.string().min(8,"Deve ter pelo menos 6 caracteres").max(32,"Apenas 32 caracteres são permitidos").oneOf([yup.ref('password')], 'A senha não é igual').required("Este Campo é obrigatório"),
  })
  .required();

type UserProps = {
  nome: string;
  telefone: string;
  email: string;
  password: string;
  confirm_password: string
}


const Register = () => {
  const navigation = useNavigation();

 const [show, setShow] = useState(true);
 const [confirshow, setConfirshow] = useState(false);
 const [isloading, SetIsloading] = useState(false);
 
  const handleRegister = () => {
    navigation.navigate('login');
  };
   const {
   control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const sendData = (data :  UserProps )=>{
    onSubmit(data);
  }
  const onSubmit = async (data: UserProps) => {
    SetIsloading(true);
   const myuser = await  createUserWithEmailAndPassword(auth,
    data.email, data.password);
    const user = myuser.user;
      await sendEmailVerification(user);
     addDoc(collection(db, "users"), {
      nome: data.nome,
      telefone: data.telefone,
      email: user.email,
      password: user.uid,
      createdAt: serverTimestamp()
    })
    .then(()=>handleRegister())
    .catch((err)=>{
      Alert.alert("Cadastro","Erro no registro",[
        {text:'sair', onPress:()=>handleRegister()},
        {text:'Continuar', style:'cancel'}
      ])
    }).finally(()=>SetIsloading(false));
    ;
  }







  return (
    <>
    <ScrollView className='bg-[#0F0817]'>
    <View style={{
    justifyContent: 'center',
     paddingTop: 34,
    alignItems: 'center'}}>
    <View style={{   position: 'relative',
    height: 200,
    width:200,
    borderRadius: 100,
 marginTop: 24,   
    overflow: 'hidden'}}>
      <Image source={{ uri: foto }} style={styles.image} />
      </View>
</View>

<Text className='text-center text-[#fff] text-3xl py-3'>Cadastrar</Text>

  <View className='bg-[#6b4fb7]' style={{borderRadius: 50}}>
    <View className="flex-1 justify-center">
      <View style={styles.form}>
       <Text style={{color:"red"}}>{errors.nome?.message}</Text>
         <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Nome Completo"
              className="w-full bg-[#fff] h-12 text-left px-4 rounded-full"
              inputMode='text'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="nome"
      />
        <Text style={{color:"red"}}>{errors.email?.message}</Text>
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

       <Text style={{color:"red"}}>{errors.telefone?.message}</Text>
       <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Telefone"
              className="w-full bg-[#fff] h-12 text-left px-4 rounded-full"
              inputMode='numeric'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="telefone"
      />

       <Text style={{color:"red"}}>{errors.password?.message}</Text>
       <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{position:'relative'}}>
          <TextInput
            placeholder="Senha"
              className="w-full bg-[#fff] h-12 text-left px-4 rounded-full"
              inputMode='text'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={show}
          />
          { show ?
           <Ionicons name="lock-closed" size={24} onPress={()=>setShow(!show)}
             style={{position:'absolute',top:5,right:10}} /> :
               <Ionicons name="lock-open-outline" size={24} onPress={()=>setShow(!show)}
             style={{position:'absolute',top:5,right:10}} />
          }
        </View>
        )}
        name="password"
      />

       <Text style={{color:"red"}}>{errors.confirm_password?.message}</Text>
         <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{position:'relative'}}>
          <TextInput
            placeholder="Confirmar Senha"
              className="w-full bg-[#fff] h-12 text-left px-4 rounded-full"
              inputMode='text'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={confirshow}
          />
          { confirshow ?
           <Ionicons name="lock-closed" size={24} onPress={()=>setConfirshow(confirshow)}
             style={{position:'absolute',top:5,right:10}} /> :
               <Ionicons name="lock-open-outline" size={24} onPress={()=>setConfirshow(!confirshow)}
             style={{position:'absolute',top:5,right:10}} />
          }
        </View>
        )}
        name="confirm_password"
      />
  <View style={styles.footer}>
  <Text  onPress={handleRegister} className='text-[#fff]'>Já Tens uma conta?  <Text style={{textDecorationLine:'underline'}}>Login</Text></Text>
 
  </View>
  <Text
onPress={handleSubmit(sendData)}
      disabled={isloading} 
   className="text-[#fff] text-center my-8 bg-[#c51162] p-4 rounded-full">Cadastrar</Text>
         
      </View>

        </View>
    </View>
    </ScrollView>
    </>
  );
};


export default Register;
