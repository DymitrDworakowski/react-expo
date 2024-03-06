import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Button } from 'react-native';
import Login from "./Login";
import Device from "./Device";
import Home from "./Home";

const MainStack = createStackNavigator();

const LoginScreen = () => {
  const navigation = useNavigation();
  
  return (
    <>
      <Login />
      <Button
        onPress={() => navigation.navigate('Device')}
        title="Navigate to Device screen"
        color="black"
      />
    </>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName='Login'>
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'AMS Intersport',
            headerStyle: {
              backgroundColor: "blue"
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            }
          }}
        />
        <MainStack.Screen name="Home" component={Home} options={{title:'Start screen'}}/>
        <MainStack.Screen name="Device" component={Device} options={{title:'Device screen'}}/>
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
