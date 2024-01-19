import {createDrawerNavigator} from '@react-navigation/drawer';
import Activity from '../extras/activity';
import Extra from '../extras/extra';
import Aulas from '../home/grade';
import Chat from '../home/chat';
import Index from '../home/index';
import {Feather} from '@expo/vector-icons';
import { Logout } from '../../screens/logout';
import { auth } from '../../../firebaseConfig';
import {useEffect, useState} from 'react';

const Drawer = createDrawerNavigator();



export default function DrawerRoutes(){
   
    const [user, setUser] = useState(null)

const loudUser = ()=>{
     const user = auth?.currentUser?.emailVerified;
     setUser(user);
}

useEffect(()=>{
    loudUser();
},[user]);

    return (
        <>
     {
         user ? <>
<Drawer.Navigator 
        screenOptions={{title:'', 
      
        drawerContentContainerStyle: {
            backgroundColor: '#0F0817',
            flex:1
        }, 
        overlayColor:'transparent',
        drawerLabelStyle: {
            color: "white",
           fontSize:16,
           fontStyle: 'italic',
            padding: 12,
            borderRadius: 6
        }

    }} 

        >
             <Drawer.Screen 
        name="Grade"

        component={Aulas}
        options={{
            drawerIcon: ({color, size, focused}) => <Feather name='book-open' color={focused ? color : 'white'} size={size} />,
            drawerLabel: "Aulas"
        }}
        />
 <Drawer.Screen 
        name="Activity"
        component={Activity}
        options={{

            drawerIcon: ({color, size, focused}) => <Feather name='play' color={focused ? color : 'white'} size={size} />,
            drawerLabel: "jogos",
          
        }}
        />

 <Drawer.Screen 
      name="Chat" 
      component={Chat} 
      options={
        {
            drawerIcon: ({color, size, focused})=> <Feather name="message-circle" color={focused ? color : 'white'} size={size} />,
             drawerLabel: "Chat"
        }
      }
      />
    <Drawer.Screen 
        name="Extra"
        component={Extra}
        options={{
            drawerIcon: ({color, size, focused}) => <Feather name='video' color={focused ? color : 'white'} size={size} />,
            drawerLabel: "Extras"
        }}
        />

     

<Drawer.Screen 
        name="logout"
        component={Logout}
        options={{
            drawerIcon: ({color, size, focused}) => <Feather name='log-out' color={focused ? color : 'white'} size={size} />,
            drawerLabel: "Sair"
        }}
        />

        </Drawer.Navigator>
         </>
         :
         <>
<Drawer.Navigator 
        screenOptions={{title:'', 
      
        drawerContentContainerStyle: {
            backgroundColor: '#0F0817',
            flex:1
        }, 
        overlayColor:'transparent',
        drawerLabelStyle: {
            color: "white",
           fontSize:16,
           fontStyle: 'italic',
            padding: 12,
            borderRadius: 6
        }

    }} 

        >
             <Drawer.Screen 
        name="Grade"

        component={Aulas}
        options={{
            drawerIcon: ({color, size, focused}) => <Feather name='book-open' color={focused ? color : 'white'} size={size} />,
            drawerLabel: "Aulas"
        }}
        />
    <Drawer.Screen 
        name="Extra"
        component={Extra}
        options={{
            drawerIcon: ({color, size, focused}) => <Feather name='video' color={focused ? color : 'white'} size={size} />,
            drawerLabel: "Extras"
        }}
        />

     

<Drawer.Screen 
        name="logout"
        component={Logout}
        options={{
            drawerIcon: ({color, size, focused}) => <Feather name='log-out' color={focused ? color : 'white'} size={size} />,
            drawerLabel: "Sair"
        }}
        />

        </Drawer.Navigator>
         </>
     }
</>
        
    );
}