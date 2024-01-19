import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  FlatList,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import { styles } from './style';
import { Container, IconContainer, InputText } from '../../components/input/Styles';
import  smsData  from '../../services/boot';

import { inserirDados, obterTodosOsDados } from '../../services/database';



type RespostaProps = {
  id: string;
  time: string;
  text: string;
  input: string;
}



function formatarData( dataString: string) {
  const data = new Date(dataString);

  const ano = data.getUTCFullYear();
  const mes = String(data.getUTCMonth() + 1).padStart(2, '0'); // Mês é baseado em zero
  const dia = String(data.getUTCDate()).padStart(2, '0');
  const horas = String(data.getUTCHours()).padStart(2, '0');
  const minutos = String(data.getUTCMinutes()).padStart(2, '0');
  const segundos = String(data.getUTCSeconds()).padStart(2, '0');
  const milissegundos = String(data.getUTCMilliseconds()).padStart(3, '0');

  const dataFormatada = `${horas}:${minutos}`;
  return dataFormatada;
}



export default function Chats() {
  const [isFocused, setIsFocused] = useState(false);
  const [messages, setMessages] = useState();
  const [resposta, setResposta] = useState<RespostaProps[]>([]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef(null);
  const [isloading, setIsloading] = useState(false)
  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

 const handleSendMessage = async () => {
  setIsloading(true);

  try {
    if (inputText.trim() !== '') {

 const response = await smsData(inputText);
     if (response.status.code !== 10000) {
        console.log(response.status);
      } else {
   const openaiMessage = {
   time: response.outputs[0].created_at, 
   text: response.outputs[0].data.text.raw,
   input: response.outputs[0].input.data.text.raw
         };  
            await inserirDados(openaiMessage);
            carregarDados(); 
        setMessages('');
        setInputText('');
      }
    }
  } catch (error) {
    Alert.alert("Mensagem",'Erro durante o envio da mensagem:'+ error,);
  } finally {
    setIsloading(false);
  }

   setMessages(inputText);
    
      setInputText('');
};



 const carregarDados = async () => {
        try {
            const result = await obterTodosOsDados();
            setResposta(result.rows._array);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    };


  useEffect(() => {
    carregarDados()
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [resposta]);

  return (
    <SafeAreaView style={styles.smsContainer}>
      <View style={styles.container}>

          
{
  resposta && <FlatList 
  showsVerticalScrollIndicator={false}
  data={resposta}
  renderItem = {({item, index})=>(
        <View key={item.id}>
    <View style={styles.partnerMessage}>
          <Text >
              {item.input}
              </Text> 
             <Text style={styles.sendTime}>
              <Ionicons name='watch' />
              {formatarData(item.time)}</Text>
              </View> 
              <View style={styles.userMessage}>
              <Text >
              {item.text}
              </Text>
              <Text style={styles.sendTime}>
              <Ionicons name='watch' />
              {formatarData(item.time)}</Text>
              </View>
             </View>)}
   /> 
}
 

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.senInput}
            placeholder="Digite uma mensagem"
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onSubmitEditing={handleSendMessage}
          />
      <TouchableOpacity onPress={handleSendMessage} disabled={isloading}>
            <IconContainer isFocused={isFocused}>
            { isloading ?
            <ActivityIndicator size={24} color='red' />
              : <Feather name="send" size={24} color={isFocused ? '#DC1637' : '#AEAEB3'} />
              
            }
            </IconContainer>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
