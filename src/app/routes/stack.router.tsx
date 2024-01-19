import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/login'
import Register from '../../screens/register'
import Minhasaulas from '../../screens/aulas';
import { auth } from '../../../firebaseConfig';
import { onAuthStateChanged} from "firebase/auth";
import { useEffect, useState } from 'react';
import DrawerRoutes from './drower.router';
import Watch from '../../screens/watch';
import Welcome from '../../screens/welcome';
import { LogBox } from 'react-native';

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['new NativeEventEmitter']); 
LogBox.ignoreAllLogs();

export default function StackRoutes() {
  const [user, setUser] = useState(null);

  const userCredencial = auth?.currentUser?.emailVerified



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    }); 
    return () => unsubscribe();
  }, []);

  return (  
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
      <Stack.Screen name="main" component={DrawerRoutes} />
      <Stack.Screen name="watch" component={Watch} />
        </>
      ) : (
        <>
        <Stack.Screen name="welcome" component={Welcome} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
}
