import { Text, View } from 'react-native';
import { styles } from '../style/styles';
import { Link, router, useNavigation } from 'expo-router';
import React, { useState, useEffect } from 'react';
import Chats from '../../screens/chat/chatOpenai';


export default function Chat() {
  return (
    <Chats />
  );
}
