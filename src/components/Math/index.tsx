import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  Easing,
  withSequence,
  withTiming,
} from 'react-native-reanimated';


import AnimatedModal from './animatedComponent';

const questions = [
  { question: '2 + 2', answer: 4 },
  { question: '5 - 3', answer: 2 },
  { question: '7 +  3', answer: 10 },
  // Adicione mais perguntas conforme necessário
];

const options = [
  [2,4,12,18 ],
  [7,8,2,28 ],
  [10,5,12,8 ],
  // Adicione mais perguntas conforme necessário
];





const MathQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const fadeAnimation = useSharedValue(1);
 const [modalVisible, setModalVisible] = useState(false);
  const [result, setResult] = useState('');

  const handleAnswer = (userAnswer: any) => {
    if (userAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
      fadeAnimation.value = withTiming(0, { duration: 500 });
      setCurrentQuestion(currentQuestion + 1);
      handleVictory()
    } else {
      fadeAnimation.value = withSequence(
        withTiming(1, { duration: 500 }),
        withTiming(0, { duration: 500 })
      );
      handleDefeat()
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnimation.value,
    };
  });

  const handleVictory = () => {
    setResult('Vitória!');
    setModalVisible(true);
  };

  const handleDefeat = () => {
    setResult('Derrota!');
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };




  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questions[currentQuestion].question}</Text>

{
  options[currentQuestion].map((item, index)=>(
<TouchableOpacity  key={index} onPress={() => handleAnswer(item)}>
        <Text style={styles.answer}>{item}</Text>
        </TouchableOpacity>
  ))
}
<Text style={styles.point}>{score} Pontos </Text>
      <Animated.View style={[styles.feedback, animatedStyle]}>
        <Text>{score > 0 ? 'Correct!' : 'Tentar Novamente!'}</Text>
      </Animated.View>
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  point:{
     padding: 12,
     textAlign: 'center'
  },
  question: {
    fontSize: 24,
    marginBottom: 20,
  },
  answer: {
    fontSize: 20,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
  },
  score: {
    marginTop: 20,
    fontSize: 18,
  },
  feedback: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#00ff00',
    borderRadius: 5,
  },
});

export default MathQuiz;
