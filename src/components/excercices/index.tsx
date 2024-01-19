// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {addDoc,
 collection,
onSnapshot,
where, 
query
} from 'firebase/firestore';
import {onAuthStateChanged} from 'firebase/auth';
import {db, auth} from '../../../firebaseConfig';
import { UserProps } from '../../globals/types';
import { useNavigation } from '@react-navigation/native';

  const questions = [
    {
      question: 'Quanto é 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
    },
    {
      question: 'O que vem primeiro, o ovo ou a galinha?',
      options: ['Ovo', 'Galinha'],
      correctAnswer: 'Ovo',
    },
    {
      question: 'Quem é a protagonista de "Romeu e Julieta"?',
      options: ['Romeu', 'Julieta'],
      correctAnswer: 'Julieta',
    },
    {
      question: 'Quantos planetas existem no sistema solar?',
      options: ['7', '8', '9', '10'],
      correctAnswer: '8',
    },
    {
      question: 'Quem pintou a Mona Lisa?',
      options: ['Van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
      correctAnswer: 'Leonardo da Vinci',
    },
    {
      question: 'Qual é a capital do Japão?',
      options: ['Pequim', 'Tóquio', 'Seul', 'Bangkok'],
      correctAnswer: 'Tóquio',
    },
    {
      question: 'Qual é a maior montanha do mundo?',
      options: ['Everest', 'K2', 'Makalu', 'Lhotse'],
      correctAnswer: 'Everest',
    },
    {
      question: 'Quem escreveu "Dom Quixote"?',
      options: ['William Shakespeare', 'Miguel de Cervantes', 'Jane Austen', 'Fyodor Dostoevsky'],
      correctAnswer: 'Miguel de Cervantes',
    },
  ];

const LogicGameScreen = () => {
  const navigation = useNavigation();
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userId, setUserId] = useState<string>('');
  const [userDate, setUserData] = useState<UserProps>();
  const handleAnswer = (selectedAnswer) => {
    const isCorrect = selectedAnswer === questions[questionIndex].correctAnswer;
    setScore((prevScore) => (isCorrect ? prevScore + 1 : Math.max(0, prevScore - 1)));

    // Avança para a próxima pergunta
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const resetGame = () => {
    setScore(0);
    setQuestionIndex(0);
  };

//coletar dados do Usuario
const dadosDoUsuario = ()=>{
      const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user.uid);
    });
}


  const finalizar = async()=>{
    await addDoc(collection(db,'pontos'),{
      valores: score,
      idUser: userId
    });
  navigation.navigate('Activity');
  }

useEffect(()=>{
  dadosDoUsuario();
},[]);

  return (
    <View style={styles.container}>
      {questionIndex < questions.length ? (
        <View>
          <Text style={styles.question}>{questions[questionIndex].question}</Text>
          {questions[questionIndex].options.map((option, index) => (
            <Button
              key={index}
              title={option}
              onPress={() => handleAnswer(option)}
            />
          ))}
        </View>
      ) : (
        <View>
          <Text style={styles.result}>Pontuação Final: {score}</Text>
          <Button title="Reiniciar Jogo" onPress={resetGame} style={{margin: 3}} />
           <Button title="Finalizar" onPress={()=>finalizar()} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default LogicGameScreen;
