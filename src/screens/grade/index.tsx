import {
  TextInput,
  Button,
  Modal,
  ActivityIndicator, FlatList,
   Text, View, Pressable, Alert, Image } from 'react-native';
   import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import * as DocumentPicker from 'expo-document-picker';
import Mailer from 'react-native-mail';
import { useState, useEffect, useCallback} from 'react';
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db, auth } from '../../../firebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';
import Moduloslist from '../../components/Cardlist';
import '../../globals/global.css';
import { Feather, FontAwesome } from '@expo/vector-icons';
import VideoList from '../../components/videos/'
import {getAuth, onAuthStateChanged, sendEmailVerification} from 'firebase/auth';
import {styles}  from './style';
import { useNavigation } from '@react-navigation/native';
import {FileProps, pagamentoProps, aulasProps, UserProps, diciplinas } from '../../globals/types';

import * as MailComposer from 'expo-mail-composer';
import Swiper from 'react-native-swiper';
import Home from '../home/home';


const imag1 = "https://cdn.pixabay.com/photo/2018/04/17/09/02/child-3326960_1280.png";
const imag2 = "https://cdn.pixabay.com/photo/2022/07/31/06/09/day-care-center-7355024_1280.jpg";


export default function Grade() {
  const [modulopagar, setModulopagar] = useState(null)
  const [infoVisible, setInfoVisible] = useState(false);
   const [modalVisible, setModalVisible] = useState(false);
const [lessons, setLessons] = useState<diciplinas[]>([]);
const [info, setInfo] = useState<diciplinas | null>(null);
const [ids, setIds] = useState<string[]>([]);
const [meuspacotes, setMeuspacote] = useState<pagamentoProps>();
const [email, setEmail] = useState<string>('');
const [userdata, setUserdata] = useState<UserProps>();
 const [useruuid, setUseruuid] = useState<string>('');
const [moduloid, setModuloid] = useState(0);
 let myModulo = lessons[moduloid];
let mymoduloid =  ids[moduloid];
const navigation = useNavigation();
const [codpagamento, setCodpagamento] = useState<string>('')
 const [fileUri, setFileUri] = useState(null);
 const [fileData, setFileDate] = useState<FileProps>();
 
 const [UserCredencials, setUserCredencials] = useState(null)

  const images = [
    "https://img.freepik.com/fotos-premium/retrato-de-tres-criancas-escola-ficar-contra-quadro-negro_107420-35449.jpg?w=740",
"https://img.freepik.com/fotos-gratis/carreira-quadro-copia-do-doodle-corredor-espaco_1134-1226.jpg?w=740&t=st=1704548969~exp=1704549569~hmac=f68e591affb2dab2f6d3cbc0857c44d630343ab579a10d3c37f0a110288c8815",
"https://img.freepik.com/fotos-gratis/rapariga-sorridente-de-tiro-medio-escrevendo-no-caderno_23-2148789725.jpg?w=360&t=st=1704548660~exp=1704549260~hmac=f538bc51bfcd669e210c5120a60ceef31831a9135a6baf63e6175bc038a6c216",
"https://img.freepik.com/fotos-gratis/negociar-elegante-colega-negocio-vazio_1134-1181.jpg?t=st=1704548767~exp=1704549367~hmac=ad6855387f1ba39cff8b46f6b3ecfbc9bd2f0db9429928c1ea72a21997146e73",
"https://img.freepik.com/fotos-gratis/grupo-de-criancas-africanas-aprendendo-juntos_23-2148892526.jpg?w=740&t=st=1704548820~exp=1704549420~hmac=e4e22383542a1383e9a3bc81d905c5b135304a1bd291167576d30f3c6ff7771f"
    ];

  const indexImag = ['world,history','play,child','reading,book','children,reading']

const reenviarEmaildeConfirmacao = async () => {
        const user = auth?.currentUser;
        await sendEmailVerification(user);
  };


const loudUser = ()=>{
     const user = auth?.currentUser?.emailVerified;
     setUserCredencials(user);
}



/*
Enviar Email
*/
const pickDocument = async () => {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
        multiple: false,
      });
      const InfoFile = result.assets;
      setFileUri(InfoFile);
      if (result.canceled) {
        return Alert.alert("Messagem","Requisição cancelada! Deseja Voltar a tentar?",[
           {text: "Sim", onPress:()=> {return pickDocument()}},
           {text: 'Não', onPress:()=>{return setModalVisible(false)}}
          ]);
      }
  };

   const sendEmail = async () => {
          const isAvaliable = await MailComposer.isAvailableAsync();
          if(fileUri){
           
    if (isAvaliable) {
     const sendingEmal = await MailComposer.composeAsync({
       subject: "comprovativo de Pagamento",
         body: `<div>Saudações! Sikola. Aqui está o comprovativo de pagamento</div>
          <div>Ficheiro: ${fileUri[0].name}</div> 
          <div>Nome: ${userdata?.nome} </div>
          <div>Referencia: ${useruuid}</div> 
          <div> Modulo: ${modulopagar} </div>
          `,
         recipients: ["globof129@gmail.com"],
         isHtml: true, 
         attachments: [fileUri[0]?.uri],
     });
    if(sendingEmal.status === 'sent'){
       Alert.alert("Mensagem","Muito Obrigado por Adquirir nossos pacotes o seu modulo estará liberado dentro em breve");
     }

  }else{ 
    Alert.alert("Mensagem","Deve carregar um arquivo em PDF");
  }
    }
    setModalVisible(false); 
  };


  


//assistir aulas
const verAulas = ()=>{
   navigation.navigate('watch',{
     myModulo,
     userdata,
     mymoduloid
   })
}

//Obter aulas
//Obter aulas
const datasets = (id:number)=>{
     const data = lessons[id];
  setInfo(data);
  setModuloid(id);
  setInfoVisible(true);
}


//coletar dados do Usuario
const dadosDoUsuario = ()=>{
      const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUseruuid(user.uid);
         const q = query(collection(db, "users"), where("email", "==", `${user?.email}`));
  const unsubscribeData = onSnapshot(q, (querySnapshot) => {
     const modulo = [];
     querySnapshot.forEach((doc) => {
       setUserdata({
         "createdAt":doc.data().createdAt,
"email":doc.data().email,
"endereco": doc.data().endereco,
"nome": doc.data().nome,
"password":doc.data().password,
"telefone":doc.data().telefone
       });
     });
    });
    });
}




//Veriicar pagamento
const carregarPagamentos = ()=>{
     const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUseruuid(user.uid);
       const q = query(collection(db, "pagamentos"), where("estado", "==", "activo"), where("userId", "==", `${user?.uid}`));
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
  datasets(1);
     });
    });
    });

};

const carregandoModulos =()=>{
    const q = query(collection(db, "modulos"));
  const unsubscribeData = onSnapshot(q, (querySnapshot) => {
     const modulo = [];
     const id = [];
     querySnapshot.forEach((doc) => {
      id.push(doc.id)
      modulo.push({
        "image":"https://source.unsplash.com/random/?children,book",
        "name": doc.data().name,
  "descricao": doc.data().descricao,
  "preço": doc.data().preço,
  "uuid": doc.id
      });
     });
  setLessons(modulo);
  setIds(id);
    })
}

useEffect(()=>{
    dadosDoUsuario();
  carregandoModulos();
  carregarPagamentos();
  loudUser();
 
},[UserCredencials]);

  return (
    <>
    
      <ScrollView className='bg-[#fff]'>
       <View className="bg-[#0F0817]  pt-8">

      <Text className="px-12">
      
        {userdata ? <Text className="font-bold px-12 text-[#FFFFFFFF] text-3xl">{userdata.nome}</Text>:
         <Text className="font-bold px-12 text-[#FFFFFFFF] text-3xl">Seja Bem Vindo!</Text>}
      
      </Text>
      <Text className="text-[#A5A5A5] px-12 font-semibold text-sm pt-1 pb-6">
       Esteja a vontade para escolher o melhor para seu filho hoje.
       Ajude seu filho a tirar o máximo proveito nas aulas e bons estudos!
      </Text>
      </View>
            <View>
 <Swiper style={styles.wrapper} autoplay>
      {images.map((image, index) => (
        <View key={index} style={styles.slide}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      ))}
    </Swiper>
</View>

{ UserCredencials ?  <ScrollView 
 className="w-full mt-3 flex-1 px-2 flex-row overflow-auto" 
 horizontal={true}
showsHorizontalScrollIndicator={false}
 >
       {  lessons.map((item,index) => {
          return (
            <View className='flex gap-2 ml-5 relative' key={index}>
            <View className='w-60 h-60 rounded-2xl overflow-hidden'>
            <Image
                      style={{
                        flex: 1,
                        width: '100%',
                        backgroundColor: '#0553',
                      }}
                      resizeMode='cover'
                      source={{ uri: `https://source.unsplash.com/random/?${indexImag[index]}` }}
                      progressiveRenderingEnabled={true}
                    />
             
            </View>
            <View>
            <Pressable onPressIn={()=>datasets(index)}>
                <Text className='text-[#212121] text-lg h-6 w-28 '>{item.name}</Text>
                <Text className='text-[#212121] h-5 w-24 text-sm text-ellipsis overflow-x-hidden'>{item.preço} kz</Text>
              </Pressable>

                </View>
            </View>
            
              );
       }
       )
  }         
      </ScrollView> : <Text className='p-3 m-2 text-xl text-dark'> Por favor Verifique a sua conta! <Text className='underline text-blue' onPress={reenviarEmaildeConfirmacao}>Clique aqui.</Text>  </Text>

}

{
  info && <View>
   <View className='gap-4 mx-4 my-12 shadow-amber-800  w-96 rounded-lg shadow-2xl bg-[#212121] p-4'>
  <Feather name='skip-back' 
  color='white' 
  className='text-[#fff]' 
  onPress={()=>setInfo(null)}
  />
  <Text className='text-right text-[#FFFFFFFF]'>{info?.preço} kz</Text>
  <Text className='font-bold text-xl text-[#FFFFFFFF]'>{info?.name}</Text>
  <View className="w-full gap-2 justify-start flex-1 flex-row">
   <FontAwesome name='money' size={15}/>
   {info?.uuid === meuspacotes?.modulo ?
  <Text className='font-bold text-sm font-bold text-[#e65100]'> Plano Activo</Text>
  : <Text className='font-bold text-sm font-bold text-cyan-500 underline' onPress={() => {
  setModalVisible(true)
  setModulopagar(meuspacotes?.modulo)
  }}>Adquirir Plano</Text>
  }
  </View>
  <Text className='font-light text-lg text-[#FFFFFFFF] '>{info?.descricao}</Text>

  {info?.uuid === meuspacotes?.modulo ?
  <Pressable onPress={()=>verAulas()} className="bg-[#ff8a65] w-23  mx-12 justify-center rounded-full h-20 shadow-2xl ring-2 ring-offset-4">
    <View>
     <Text className="text-center text-xl gap-4 text-[#fff] font-bold w-full">Assistir Aulas</Text>
     <Feather name='unlock' color={'white'} size={25} className="text-center text-xl gap-4 text-[#fff] font-bold w-full"/>
    </View>
  </Pressable>
   :
  <Pressable onPress={()=>{
    Alert.alert("Pacote Errado","Ops! parece que você ainda não adqueriu este pacote",[
        {text:'Cancelar', style:'cancel'},
        {text: 'Quero Agora', onPress: ()=>{setModalVisible(true)
        setModulopagar(meuspacotes?.modulo)
      }}
      ]);
  } } className="bg-cyan-500 w-23  mx-12 justify-center rounded-full h-20 shadow-2xl ring-2 ring-offset-4">
    <View>
     <Text className="text-center text-xl gap-4 text-[#fff] font-bold w-full">Assistir Aulas</Text>
     <Feather name='lock' color={'white'} size={25} className="text-center text-xl gap-4 text-[#fff] font-bold w-full"/>
    </View>
  </Pressable>
}
  </View>
  </View>
}

{ UserCredencials && <Home /> }

<VideoList title='Música de Boas Vindas' videoid='PmzTrqrZ9Nc' />




<View className='w-full mx-9 mb-0 px-8 pb-0'>
<Feather name='book-open' color='yellow' size={30}/>
<Text className='pt-5 text-xl text-[#212121]'>Marcos Andrade, Lubango-Huíla</Text>
<Text className='py-5 text-lg text-[#212121] font-light italic'>
  É muito Bom ver as crianças aprendendo novas coisas,
  gosto imenso da didática e da iteractividade com as crianças,
  sempre que chego em casa elas têem sempre uma novidade.
</Text>

</View>


<View className='w-full mt-0 pt-0 px-8'>

<Feather name='book-open' color='#ffea00' size={30} className='text-right'/>
<Text className='pt-5 text-xl text-[#212121] text-right'>Angelino dos Santos, Cacuaco-Luanda</Text>

<Text className='py-5 text-lg text-[#212121] font-light italic'>
  "É bastante gratificante saber que as nossas crianças podem aprender algo valioso a 
  qualquer hora. As curiosidades animadas dão os meus filhos o tipo de entretenimento, que qualquer
  pai quer para seu filho,
 é uma maravilha usar esta plataforma."
</Text>

</View>

<View className='w-full gap-5 justify-center flex-1 flex-row mt-12 px-5 pt-12 bg-[#A5A5A5]'>


    <View>
   <Text className='pb-4 text-lg font-bold'>Outros Serviços </Text>
    <Text>Mentoria Particular </Text>
    <Text>Ensino Especial</Text>
    <Text>Consultoria  </Text>
    <Text> Cursos Técnicos</Text>
    </View>
    <View>
   <Text className='pb-4 text-lg font-bold'>Nossos Contactos </Text>
    <Text>sikola243@gmail.com </Text>
    <Text>927023710 - 946587615</Text>
    <Text>globof129@gmai.com</Text>
    </View>
    </View>
    <View className='w-full gap-8 justify-center flex-1 flex-row p-8 pb-18 bg-[#A5A5A5]'>
    <FontAwesome name='facebook-square' size={30}  />
    <FontAwesome name='youtube-square' size={30} />
    <FontAwesome name='whatsapp' size={30} />
    <FontAwesome name='instagram' size={30} />
    </View>

    <View className='w-full gap-8 justify-center flex-1 flex-row px-8 pb-12 bg-[#A5A5A5]'>
      <Text className='font-extralight italic'>Copyright © 2023 Sikola ltda</Text>
      <Text className='font-extralight italic'>Lubango- Huíla,Angola</Text>
    </View>
</ScrollView>

     <Modal
     className="relative  w-94"
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView} className='rounded-lg'>
 <FontAwesome name='close' size={28} className='absolute top-6 right-5' onPress={()=>setModalVisible(false)} />

            <Text className='my-3 text-center text-[#fff] text-2xl font-semibold'>Efectuar pagamento</Text>
          <Text className='text-lg text-[#fff] text-center'>IBAN BCI: 0000 7305 5745 1019 7</Text>
          <Text className='text-lg text-[#fff] text-center'>IBAN BAI: 0000 7305 5745 0612 3 </Text>
          <Text className='text-lg text-[#fff] text-center'>Nome: Sociedade Globo ltda </Text>
            <TextInput
            editable={false}
            multiline={false}
          numberOfLines={1}

            placeholder="Nome do seu comprovativo, aparece aqui!"
           className="text-black px-2 my-4 rounded disabled h-12 w-full bg-[#fff]"
              inputMode='text'

            onChangeText={setCodpagamento}
            value={fileUri ? fileUri[0]?.name : ''}
          />
            <Button color='#c51162' title="Escolher Arquivo" onPress={pickDocument} />
            <Pressable
            className="my-8 h-18 text-[#fff] bg-[#6b4fb7] p-4 rounded-full"
              onPress={() =>{ 
              setModalVisible(!modalVisible)
              sendEmail();
              }}>
              <Text className="text-[#fff]">Enviar comprovativo</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </>
  );
}
