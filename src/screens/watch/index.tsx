import { useNavigation } from '@react-navigation/native';
import {View, Text, Image, FlatList} from 'react-native';
import '../../globals/global.css';
import {useState, useEffect} from 'react';
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { Feather, FontAwesome } from '@expo/vector-icons';
import { db, auth } from '../../../firebaseConfig';
import VideoList from '../../components/videos/';


import {FileProps, pagamentoProps, aulasProps, UserProps, diciplinas } from '../../globals/types';
type props = {
  myModulo: diciplinas;
  userdata: UserProps,
  mymoduloid: string;
}


export default function Watch({ route }: { route: { params: props } }){
	const { 
		myModulo,
  userdata,
  mymoduloid
} = route.params;
const [aula , setAula] = useState<aulasProps[]>([]);
const [height, setHeight] = useState(1);
const navigation = useNavigation();
	
  //buscar aulas
const aulas = (id:string) => {
  console.log(mymoduloid)
 const q = query(collection(db, "aulas"), where("moduloId", "==", `${mymoduloid}`),where("disciplinaid", "==", `${id}`));
  const unsubscribeData = onSnapshot(q, (querySnapshot) => {
     const modulo = [];
     querySnapshot.forEach((doc) => {
      modulo.push(doc.data());
     });
  setAula(modulo);
    });
};

useEffect(()=>{
  aulas("1");
},[]);


return (
<>
	<View className="w-full flex-1 bg-black py-3">

              <View className='w-96  gap-12 flex-row mt-2 justify-center p-4'>

               <FontAwesome name="close" size={30} color='red'  onPress={()=>{
   navigation.navigate('Grade',{
     myModulo,
     userdata,
     mymoduloid
   })
   }
   }
     />
   
   <FontAwesome name="calculator" size={30} color='white'  onPress={()=>{
     setHeight(0);
     aulas('1');
   }
     
   }
     />
   
   <FontAwesome name="book" size={30} color='white'
onPress={()=>{
     setHeight(0);
     aulas('2');
   }
     
   }
   />
   <Feather  name="users" size={30} color='white' 
onPress={()=>{
     setHeight(0);
     aulas('3');
   }
     
   }
   />
   <FontAwesome name="pencil" size={30} color='white' 
onPress={()=>{
     setHeight(0);
     aulas('4');
   }
     
   }
   />
    </View> 
<View className="my-8">

{
  aula ?  <FlatList
     data={aula}
     renderItem={({item, index}) => <VideoList
    key={index} 
    videoid={item.youtubeid}
    title={`Nº.${item.licao} - ${item.tema}`}
   />}
     keyExtractor={item => item.youtubeid}
   />
   :
   <Text className="text-[#fff]"> Aulas indisponivéis </Text>
}
        
</View>
	</View>


</>

	);
}