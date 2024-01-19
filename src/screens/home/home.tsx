import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FlexContainer } from './style';
import Profile from '../../components/user/profile';
import Cards from '../../components/cards/cardsInfo';
import SecondCard from '../../components/cards/cardsecond';
import { AntDesign } from '@expo/vector-icons'; // Importar o ícone desejado
import Grafic from '../../components/grafic/Grafic';
import GraficHistoric from '../../components/grafic/GraficHistoric';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { collection, query, onSnapshot, where } from "firebase/firestore";
import {FileProps, pagamentoProps, aulasProps, UserProps, diciplinas } from '../../globals/types';
import { db, auth } from '../../../firebaseConfig';

type PontoProps = {
  valores: number;
  idUser: string;
}

export default function Home() {
const [meuspacotes, setMeuspacote] = useState<pagamentoProps>();
 const [useruuid, setUseruuid] = useState<string|undefined>('');
const [aula , setAula] = useState<aulasProps[]>([]);
const [assistir , setAssistir] = useState([]);
const [ponto, setPonto] = useState<PontoProps[]>([]);
const [pontosTotal, setPontosTotal] = useState<number>(0);
  //buscar aulas
const aulas = () => {
 const q = query(collection(db, "aulas"), where("moduloId", "==", `${meuspacotes?.modulo}`));
  const unsubscribeData = onSnapshot(q, (querySnapshot) => {
     const modulo: any = [];
     querySnapshot.forEach((doc) => {
      modulo.push(doc.data());
     });
  setAula(modulo);
    });
};


  //buscar Videos Assistidos
const assistidos = () => {
 const q = query(collection(db, "assistidos"), where("userId", "==", `${useruuid}`));
  const unsubscribeData = onSnapshot(q, (querySnapshot) => {
     const modulo: any = [];
     querySnapshot.forEach((doc) => {
      modulo.push(doc.data());
     });
  setAssistir(modulo);
    });
};

const pontos = () => {
 const q = query(collection(db, "pontos"), where("idUser", "==", `${useruuid}`));
  const unsubscribeData = onSnapshot(q, (querySnapshot) => {
     const modulo : any = [];
     querySnapshot.forEach((doc) => {
      modulo.push(doc.data());
     });
  setPonto(modulo);
    });
};

const calcularPontos = ()=>{
 const ArrayPontos = ponto.map((item)=>item.valores);
 //const TotalPontos = ArrayPontos.reduce((a,b)=>a+b);
  //setPontosTotal(TotalPontos);
}


//metada dados do usuario
 const coletarUsuario =  () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUseruuid(user?.uid);
    });
  };

//Veriicar pagamento
const carregarPagamentos = ()=>{
 const q = query(collection(db, "pagamentos"), where("estado", "==", "activo"), where("userId", "==", `${useruuid}`));
  const unsubscribeData = onSnapshot(q, (querySnapshot) => {
     const modulo = [];
     querySnapshot.forEach((doc) => {
  setMeuspacote({
      "estado": doc.data().estado,
"expiraEm": doc.data().expiraEm,
"modulo":doc.data().modulo,
"pagoEm": doc.data().pagoEm,
"userId": doc.data().userId
  });
     });
    });
};

useEffect(()=>{
   coletarUsuario();
  carregarPagamentos();
   pontos();
  assistidos();
    aulas();
    calcularPontos();
 
},[aula,pontosTotal]);


  return (
    <ScrollView className='my-4'>
 

      <View>
        <View>
        </View>
         <View style={FlexContainer.flex}>
          <SecondCard title="Assistidos" content={assistir?.length} className='gap-5 shadow-2xl w-44 h-44 bg-[#6b4fb7] shadow-slate-900 p-4 rounded-xl m-3 '/>
          <SecondCard title="Pontos" content={pontosTotal} className=' gap-5 shadow-2xl w-44 h-44 bg-[#c51162] w-36 shadow-slate-900 p-4 rounded-xl m-3 ' />
        </View>
      </View>

      <View style={FlexContainer.flex}>
        <SecondCard title="Jogos" content={4} className='gap-5 shadow-2xl w-44 h-44 bg-[#c51162] shadow-slate-900 p-4 rounded-xl m-3 '/>
        <SecondCard title="Aulas" content={aula?.length}  className='gap-5  w-44 h-44 shadow-2xl bg-[#6b4fb7] shadow-slate-900 p-4 rounded-xl m-3 '/>
      </View>

    </ScrollView>
  );
}
