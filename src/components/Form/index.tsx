import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Button } from '../Button';
import { ControlledInput } from '../ControlledInput';
import { Container } from './styles';
import {useForm} from 'react-hook-form';
import * as yup from  'yup';
import {yupResolver} from '@hookform/resolvers/yup'; 
import { Text } from 'react-native';

type FormData = {
  address: string; 
  phone: number;
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const schema = yup.object({
name: yup.string().required("Informe o seu nome"),
email: yup.string().email("E-mail Inválido").required("Infrome seu E-mail"),
password: yup.string().min(6,"A senha deve ter ao menos 6 digitos").required("Informe a sua senha"),
password_confirm: yup.string().oneOf(
  [yup.ref('password'), null], 'A senha de confirmação não confere'),
phone: yup.number().required("Informe seu Telemovel"),  
address: yup.string().required("Informe seu Endereço")

});

export function Form() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const { control, handleSubmit, formState: {
    errors
  } } = useForm<FormData>({
    resolver : yupResolver(schema)
  })
  function handleUserRegister({ name, address, phone, password, email }: FormData) {

 

  return (
    <Container>
      {error && <Text style={{ backgroundColor: "red", color: "white", borderRadius: 12, textAlign: "center" }}>{error}</Text>}
      <ControlledInput
        name="name"
        icon="user"
        placeholder="Nome"
        control={control}
        error={errors.name}
      />
      <ControlledInput
      name="email"
       control={control}
        icon="mail"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize='none'
        error={errors.email}
      />
      <ControlledInput
        name="phone"
        control={control}
        icon="phone"
        placeholder="Telemovel"
        autoCapitalize='none'
        error={errors.phone}
      />
      <ControlledInput
        name="address"
        control={control}
        icon="home"
        placeholder="Endereço"
        autoCapitalize='none'
        error={errors.address}
      />

      <ControlledInput
        name="password"
        control={control}
        icon="lock"
        placeholder="Senha"
        secureTextEntry
        error={errors.password}
      />
      <ControlledInput
      name="password_confirm"
       control={control}
        icon="lock"
        placeholder="Confirme a senha"
        secureTextEntry
        error={errors.password_confirm}
      />

      <Button
        title="Cadastrar"
        onPress={handleSubmit(handleUserRegister)}
      />
    </Container>
  )
}