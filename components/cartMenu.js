import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import colors from "../assets/color/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CartHotel from "./CartHotel";
import CartRestaurant from "./CartRestaurant";
import CartVehicle from "./CartVehicle";

const cartMenu = ({ route, navigation }) => {
  const { item } = route.params;
  const Tab = createMaterialTopTabNavigator();
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen
          name="Khách sạn"
          children={() => <CartHotel item={item} navigation={navigation} />}
        />
        <Tab.Screen
          name="Nhà hàng"
          children={() => (
            <CartRestaurant item={item} navigation={navigation} />
          )}
        />
        <Tab.Screen
          name="Phương tiện"
          children={() => (
            <CartVehicle item={item} navigation={navigation} />
          )}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listDetails: {
    flexDirection: "row",
    height: 45,
    width: "100%",
    paddingLeft: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  listActivityDetailsItem: {
    height: 35,
    width: 100,
    justifyContent: "center",
    alignContent: "center",
  },
  listActivityDetailsItemText: {
    fontSize: 16,
  },
});
export default cartMenu;
