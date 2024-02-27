import 'react-native-gesture-handler'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import Login from "./Login";
import Home from "./Home";

const MainStack = createStackNavigator();
export default function App() {
  return (
   <NavigationContainer>
    <MainStack.Navigator initialRouteName='Login'>
      <MainStack.Screen name="Login" component={Login} options={{
        title: 'Login Screen Title',
        headerStyle:{
          
          backgroundColor: "blue"
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerRight: () => (
          <Button
          onPress={() =>alert("Login")}
          title="Press me"
          color ="black"/>
          
        ),
      }}/>
      <MainStack.Screen name="Home" component={Home} options={{title:'Start screen'}}/>
    </MainStack.Navigator>
   </NavigationContainer>
  );
}
