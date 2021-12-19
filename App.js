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
import HotelBooking from "./components/HotelBooking";
import VehicleDetails from "./components/VehicleDetails";
import AppLoading from "./components/AppLoading";
import OnBoarding from "./components/OnBoarding";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AuthContext from "./store/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserInfo from "./components/UserInfo";
import cart from "./components/CartHotel";
import historyBooking from "./components/HistoryMenu";
import BookingBill from "./components/BookingBill";
import RestaurantBill from "./components/RestaurantBill";
import cartMenu from "./components/cartMenu";
import HistoryMenu from "./components/HistoryMenu";
import VehicleBill from "./components/VehicleBill";

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
        component={SearchView}
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
    birth: "",
    iNum: "",
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
          birth: action.birth,
          iNum: action.identityNumber,
          isLoading: false,
          userRefreshToken: action.refreshToken,
        };
      case "NEXT":
        return {
          userToken: "NoToken",
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userEmail: action.mail,
          userName: action.name,
          userId: action.id,
          gender: action.gender,
          phone: action.phone,
          birth: action.birth,
          iNum: action.identityNumber,
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
  const authContext = React.useMemo(() => ({
    signIn: async (email, password) => {
      let userToken, user;
      try {
        const data = { email: email, password: password };
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
              console.log(responseJson);
              if (responseJson.tokens != null) {
                userToken = responseJson.tokens;
                user = responseJson.user;
                console.log(responseJson);
                AsyncStorage.setItem("userToken", userToken.access.token);
                AsyncStorage.setItem("userId", user.id);
                AsyncStorage.setItem("userEmail", user.email);
                AsyncStorage.setItem("userName", user.name);
                AsyncStorage.setItem("userPhone", user.phone);
                AsyncStorage.setItem("userBirth", user.birth);
                AsyncStorage.setItem("userINum", user.identityNumber);
                AsyncStorage.setItem("Gender", user.gender);
                AsyncStorage.setItem(
                  "userRefreshToken",
                  userToken.refresh.token
                );
              } else {
                alert("Incorrect email or password");
              }
            })
            .catch((error) => {
              console.error(error);
            })
        );
      } catch (e) {
        console.log(e);
      }
      dispatch({
        type: "LOGIN",
        mail: user.email,
        token: userToken.access.token,
        id: user.id,
        name: user.name,
        phone: user.phone,
        birth: user.birth,
        iNum: user.identityNumber,
        gender: user.gender,
        refreshToken: userToken.refresh.token,
      });
    },
    next_guest: async () => {
      AsyncStorage.setItem("userToken", "NoToken");
      dispatch({ type: "NEXT" });
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
        await AsyncStorage.removeItem("userBirth");
        await AsyncStorage.removeItem("userINum");
        await AsyncStorage.removeItem("Gender");
        await AsyncStorage.removeItem("userRefreshToken");
        // console.log(loginState.userRefreshToken);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "LOGOUT" });
    },
    signUp: async (email, name, password) => {
      let data = {
        email: email,
        name: name,
        password: password,
        role: "guest",
        birth: "01/01/2000",
        phone: "0",
        gender: "male",
        identityNumber: "0",
      };
      let userToken, user;
      try {
        await fetch("http://odanang.net:5000/auth/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            if (responseJson.code)
              if (responseJson.code != 201) {
                alert(responseJson.message);
              }
            userToken = responseJson.tokens;
            user = responseJson.user;
            console.log(responseJson);
            AsyncStorage.setItem("userToken", userToken.access.token);
            AsyncStorage.setItem("userId", user.id);
            AsyncStorage.setItem("userEmail", user.email);
            AsyncStorage.setItem("userName", user.name);
            AsyncStorage.setItem("userPhone", user.phone);
            AsyncStorage.setItem("userBirth", user.birth);
            AsyncStorage.setItem("userINum", user.identityNumber);
            AsyncStorage.setItem("Gender", user.gender);
            AsyncStorage.setItem("userRefreshToken", userToken.refresh.token);
          });
      } catch (e) {
        console.log(e);
      }
      dispatch({
        type: "REGISTER",
        mail: user.email,
        token: userToken.access.token,
        id: user.id,
        name: user.name,
        phone: user.phone,
        birth: user.birth,
        iNum: user.identityNumber,
        gender: user.gender,
        refreshToken: userToken.refresh.token,
      });
    },
    userName: loginState.userName,
    userToken: loginState.userToken,
    userEmail: loginState.userEmail,
    userId: loginState.userId,
    gender: loginState.gender,
    phone: loginState.phone,
    birth: loginState.birth,
    iNum: loginState.iNum,
    userRefreshToken: loginState.userRefreshToken,
  }));

  useEffect(() => {
    setTimeout(async () => {
      let userToken,
        userId,
        userEmail,
        userName,
        userPhone,
        userBirth,
        userINum,
        gender,
        userRefreshToken;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        userRefreshToken = await AsyncStorage.getItem("userRefreshToken");
        userId = await AsyncStorage.getItem("userId");
        userEmail = await AsyncStorage.getItem("userEmail");
        userName = await AsyncStorage.getItem("userName");
        userPhone = await AsyncStorage.getItem("userPhone");
        userBirth = await AsyncStorage.getItem("userBirth");
        userINum = await AsyncStorage.getItem("userINum");
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
        birth: userBirth,
        iNum: userINum,
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
      {!loginState.userToken ? (
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
                headerTitle: "Go Go",
              })}
            />
            <Stack.Screen
              name="cartMenu"
              component={cartMenu}
              options={({ route }) => ({
                headerBackTitle: "",
                headerTitle: "Hàng chờ",
              })}
            />
            <Stack.Screen
              name="HotelDetails"
              component={HotelDetails}
              options={({ route }) => ({
                headerBackTitle: "",
                headerTitle: "Thông tin phòng",
              })}
            />
            <Stack.Screen
              name="FoodDetails"
              component={FoodDetails}
              options={({ route }) => ({
                headerBackTitle: "",
                headerTitle: "Thông tin nhà hàng",
              })}
            />
            <Stack.Screen
              name="FoodBooking"
              component={FoodBooking}
              options={({ route }) => ({
                headerBackTitle: "",
                headerTitle: "Đặt bàn",
              })}
            />
            <Stack.Screen
              name="RestaurantBill"
              component={RestaurantBill}
              options={({ route }) => ({
                headerBackTitle: "",
                headerTitle: "Hóa đơn thanh toán",
              })}
            /><Stack.Screen
            name="VehicleBill"
            component={VehicleBill}
            options={({ route }) => ({
              headerBackTitle: "",
              headerTitle: "Hóa đơn thanh toán",
            })}
          />
            <Stack.Screen
              name="VehicleDetails"
              component={VehicleDetails}
              options={({ route }) => ({
                headerBackTitle: "",
                headerTitle: "Thông tin xe",
              })}
            />
            <Stack.Screen
              name="SearchView"
              component={SearchView}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="HotelBooking"
              component={HotelBooking}
              options={({ route }) => ({
                headerBackTitle: "",
                headerTitle: "Đặt phòng",
              })}
            />
            <Stack.Screen
              name="BookingBill"
              component={BookingBill}
              options={({ route }) => ({
                headerBackTitle: "",
                headerTitle: "Hóa đơn thanh toán",
              })}
            />

            <Stack.Screen
              name="UserInfo"
              component={UserInfo}
              options={({ route }) => ({
                headerBackTitle: "",
                headerTitle: "Thông tin cá nhân",
              })}
            />
            {/* <Stack.Screen
              name="cart"
              component={cart}
              options={({ route }) => ({
                headerBackTitle: "",
                headerTitle: "Hàng chờ",
              })}
            /> */}
            <Stack.Screen
              name="HistoryMenu"
              component={HistoryMenu}
              options={({ route }) => ({
                headerBackTitle: "",
                headerTitle: "Lịch sử",
              })}
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
