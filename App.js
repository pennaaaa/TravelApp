import React, { useContext, useEffect, useState } from "react";
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
import AppLoading from "./components/AppLoading";
import OnBoarding from "./components/OnBoarding";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AuthContext from "./store/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

Entypo.loadFont();
AntDesign.loadFont();
SimpleLineIcons.loadFont();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        style: styles.tabBar,
        tabBarActiveTintColor: "#68BD48",
      }}
    >
      <Tab.Screen
        name="Khám phá"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="home" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Tìm Kiếm"
        component={Find}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="magnifying-glass" size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Tài Khoản"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const initialLoginState = {
    isLoading: true,
    userName: "",
    userToken: "",
    userEmail: "",
    userId: "",
    gender: "",
    phone: "",
    userRefreshToken: "",
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          userName: action.name,
          userEmail: action.email,
          userId: action.id,
          gender: action.gender,
          phone: action.phone,
          isLoading: false,
          userRefreshToken: action.refreshToken,
        };
      case "LOGIN":
        return {
          ...prevState,
          userEmail: action.mail,
          userName: action.name,
          userId: action.id,
          gender: action.gender,
          phone: action.phone,
          userToken: action.token,
          userRefreshToken: action.refreshToken,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );
  const data = { email: "hoangnguyenvubk@gmail.com", password: "nguyenvu124" };

  const authContext = React.useMemo(() => ({
    signIn: async (email, password) => {
      let userToken, user;
      if (email == "A" && password == "b") {
        try {
          // userToken = "abdefgh";
          Promise.all(
            await fetch("https://pbl6-travelapp.herokuapp.com/auth/login", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((response) => response.json())
              .then((responseJson) => {
                // console.log(responseJson);
                userToken = responseJson.tokens;
                user = responseJson.user;
                console.log(responseJson);
                AsyncStorage.setItem("userToken", userToken.access.token);
                AsyncStorage.setItem("userId", user.id);
                AsyncStorage.setItem("userEmail", user.email);
                AsyncStorage.setItem("userName", user.name);
                AsyncStorage.setItem("userPhone", user.phone);
                AsyncStorage.setItem("Gender", user.gender);
                AsyncStorage.setItem(
                  "userRefreshToken",
                  userToken.refresh.token
                );
              })
              .catch((error) => {
                console.error(error);
              })
          );
          // console.log("day roi", user);
        } catch (e) {
          console.log(e);
        }
      }
      // console.log(userToken.refresh.token);x
      dispatch({
        type: "LOGIN",
        mail: user.email,
        token: userToken.access.token,
        id: user.id,
        name: user.name,
        phone: user.phone,
        gender: user.gender,
        refreshToken: userToken.refresh.token,
      });
    },
    signOut: async () => {
      try {
        // gui token
        let data = { refreshToken: loginState.userRefreshToken };
        await fetch("https://pbl6-travelapp.herokuapp.com/auth/logout", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((response) => {
          console.log(response.status);
        });
        // xoa du lieu lu trong may
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("userId");
        await AsyncStorage.removeItem("userEmail");
        await AsyncStorage.removeItem("userName");
        await AsyncStorage.removeItem("userPhone");
        await AsyncStorage.removeItem("Gender");
        await AsyncStorage.removeItem("userRefreshToken");
        // console.log(loginState.userRefreshToken);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "LOGOUT" });
    },
    signUp: () => {
      setUserToken("abcdef");
    },
    userName: loginState.userName,
    userToken: loginState.userToken,
    userEmail: loginState.userEmail,
    userId: loginState.userId,
    gender: loginState.gender,
    phone: loginState.phone,
    userRefreshToken: loginState.userRefreshToken,
  }));

  useEffect(() => {
    setTimeout(async () => {
      let userToken,
        userId,
        userEmail,
        userName,
        userPhone,
        gender,
        userRefreshToken;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        userRefreshToken = await AsyncStorage.getItem("userRefreshToken");
        userId = await AsyncStorage.getItem("userId");
        userEmail = await AsyncStorage.getItem("userEmail");
        userName = await AsyncStorage.getItem("userName");
        userPhone = await AsyncStorage.getItem("userPhone");
        gender = await AsyncStorage.getItem("Gender");
      } catch (e) {
        console.log(e);
      }
      dispatch({
        type: "RETRIEVE_TOKEN",
        token: userToken,
        refreshToken: userRefreshToken,
        id: userId,
        email: userEmail,
        name: userName,
        phone: userPhone,
        gender: gender,
      });
    }, 2000);
  });
  // console.log(loginState);
  if (loginState.isLoading) {
    return <AppLoading />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      {loginState.userToken == null ? (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="OnBoarding"
              component={OnBoarding}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
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
      )}
    </AuthContext.Provider>
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
