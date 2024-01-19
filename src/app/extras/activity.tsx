import React, {useState} from 'react';
import { View, StatusBar, StyleSheet, Text, Alert  } from 'react-native';
import MathQuiz from '../../components/Math/index';
import LogicGameScreen from '../../components/excercices/index';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native'

const App = () => {
  const navigation = useNavigation();
  const [game, setGame] = useState<boolean>(false)
const gamePlay = () => {
setGame(!game);
}

  const gameList = [
    {
      nome: 'Logica',
      pontos: 150,
      duracao: '2 horas',
    },
    {
      nome: 'Matématica',
      pontos: 200,
      duracao: '1.5 horas',
    },
    {
      nome: 'Quebra-cabeça',
      pontos: 180,
      duracao: '3 horas',
    },
    {
      nome: 'Língua Portuguesa',
      pontos: 120,
      duracao: '1 hora',
    },
    // Adicione mais jogos conforme necessário
  ];

  return (
    <>
    {
      game && <Ionicons onPress={()=>gamePlay()} name='close' className='p-3' size={28} color='black' />
    }
    {
    game ?
     <LogicGameScreen />:
    <View style={styles.container}>
      {gameList.map((game, index) => (
        <View key={index} style={styles.gameItem} className='gap-3'>
          <Text style={styles.gameName} onPress={()=>gamePlay()}>{game.nome}</Text>
          <Text style={styles.gameInfo}>Pontos: {game.pontos}</Text>
          <Text style={styles.gameInfo}>Duração: {game.duracao}</Text>
        </View>
      ))}
    </View>
    }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gameItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
  },
  gameName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gameInfo: {
    fontSize: 16,
  },
});

export default App;
