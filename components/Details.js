import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import colors from "../assets/color/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FoodCityList from "./FoodCityList";
import VehicleRentalList from "./VehicleRentalList";
import HotelList from "./HotelList";


const Details = ({ route, navigation }) => {
  const { item } = route.params;
  const Tab = createMaterialTopTabNavigator();
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen
          name="Khách sạn"
          children={() => <HotelList item={item} navigation={navigation} />}

        />
        <Tab.Screen
          name="Thuê xe"
          children={() => <VehicleRentalList item={item} navigation={navigation} />}
        />

        <Tab.Screen
          name="Ẩm thực"
          children={() => <FoodCityList item={item} navigation={navigation} />}
        />
        {/* <Tab.Screen
          name="Giải trí"
          children={() => <EntertainmetCityList item={item} />}
        /> */}
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
