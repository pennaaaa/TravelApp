import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Home from "./components/Home";
import Details from "./components/Details";
import HotelDetails from "./components/HotelDetails";
import SearchView from "./components/SearchView";
import Find from "./components/Find";
import Profile from "./components/Profile";
import colors from "./assets/color/colors";
import Entypo from "react-native-vector-icons/Entypo";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import FoodDetails from "./components/FoodDetails";
import FoodBooking from "./components/FoodBooking";
import VehicleDetails from "./components/VehicleDetails";

Entypo.loadFont();
AntDesign.loadFont();
SimpleLineIcons.loadFont();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: styles.tabBar,
        activeTintColor: colors.yelow,
        inactiveTintColor: colors.darkblue,
      }}
    >
      <Tab.Screen
        name="Khám phá"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="home" size={32} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Tìm Kiếm"
        component={Find}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="magnifying-glass" size={32} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Tài Khoản"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={32} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({ route }) => ({
            headerBackTitle: "",
            headerTitle: route.params.name,
          })}
        />
        <Stack.Screen
          name="HotelDetails"
          component={HotelDetails}
          options={({ route }) => ({
            headerBackTitle: "",
            headerTitle: route.params.name,
          })}
        />
        <Stack.Screen
          name="FoodDetails"
          component={FoodDetails}
          options={({ route }) => ({
            headerBackTitle: "",
            headerTitle: route.params.name,
          })}
        />
        <Stack.Screen
          name="FoodBooking"
          component={FoodBooking}
          options={({ route }) => ({
            headerBackTitle: "",
            headerTitle: route.params.name,
          })}
        />
         <Stack.Screen
          name="VehicleDetails"
          component={VehicleDetails}
          options={({ route }) => ({
            headerBackTitle: "",
            headerTitle: route.params.name,
          })}
        />
        <Stack.Screen
          name="SearchView"
          component={SearchView}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: "flex",
  },
});
export default App;
