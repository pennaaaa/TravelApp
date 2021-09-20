import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import colors from "../assets/color/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OverviewCity from "./OverviewCity";
import HotelCityList from "./HotelCityList";
import EntertainmetCityList from "./EntertainmeniCityList";
import FoodCityList from "./FoodCityList";

const Details = ({ route, navigation }) => {
  const { item } = route.params;
  const Tab = createMaterialTopTabNavigator();
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen
          name="Tổng quan"
          children={() => <OverviewCity item={item} />}
        />
        <Tab.Screen
          name="Khách sạn"
          children={() => <HotelCityList item={item} />}
        />
        <Tab.Screen
          name="Giải trí"
          children={() => <EntertainmetCityList item={item} />}
        />
        <Tab.Screen
          name="Ẩm thực"
          children={() => <FoodCityList item={item} />}
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
export default Details;
