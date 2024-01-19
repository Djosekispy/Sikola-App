import {NavigationContainer} from '@react-navigation/native';
import StackRoutes from './src/app/routes/stack.router';



import {StatusBar} from 'react-native'


export default function Routes(){
    return (
        <NavigationContainer>
       <StatusBar 
       backgroundColor="black" 
       translucent={true}
        barStyle="light-content"/>
            <StackRoutes />
        </NavigationContainer>
    );
}