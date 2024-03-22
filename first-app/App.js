import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Button } from 'react-native';
import Login from "./Login";
import Device from "./Device";
import Filter from "./Filter";
import Locations from "./Locations";
import ShopStuf from "./ShopStuf";
import Product from "./Product";
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
        <MainStack.Screen name="Filter" component={Filter} options={{title:'Filter'}}/>
        <MainStack.Screen name="Device" component={Device} options={{title:'Device screen'}}/>
        <MainStack.Screen name="Locations" component={Locations} options={{title:'Wybierz salon'}}/>
        <MainStack.Screen name="ShopStuf" component={ShopStuf} options={{title:'Produkty'}}/>
        <MainStack.Screen name="Product" component={Product} options={{title:'Product'}}/>
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
