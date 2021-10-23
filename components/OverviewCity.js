import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import hotelDataInCity from "../assets/data/hotelDataInCity";
import colors from "../assets/color/colors";

import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

Entypo.loadFont();
Ionicons.loadFont();

const OverviewCity = (props) => {
  const item = props.item;
  const renderHotelDataInCityItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <ImageBackground
          source={item.image}
          style={styles.discorverItem}
          imageStyle={styles.discorverItemImage}
        >
          <View style={styles.discorverItemLocationWrapper}>
            <Entypo name="location-pin" size={18} color={colors.white} />
            <Text style={styles.discorverItemLocationText}>
              {item.location}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView>
      {/* Image */}
      <View style={styles.viewImage}>
        <Image source={item.imageBig} style={styles.image} />
      </View>
      {/* decription */}
      <View style={styles.cityName}>
        <Text style={styles.cityNameText}>{item.location}</Text>
      </View>
      <View style={styles.decription}>
        <Text style={styles.decriptionText}>{item.decription}</Text>
      </View>
      {/* Hotel in city */}
      <View style={styles.containerHotel}>
        <View style={styles.headerHotel}>
          <Text style={styles.categoryTitle}>Khách sạn</Text>
        </View>
        <View style={{ paddingTop: 10 }}>
          <FlatList
            data={hotelDataInCity}
            renderItem={renderHotelDataInCityItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
      <View style={styles.containerHotel}>
        <View style={styles.headerHotel}>
          <Text style={styles.categoryTitle}>Nhà hàng</Text>
        </View>
        <View style={{ paddingTop: 10 }}>
          <FlatList
            data={hotelDataInCity}
            renderItem={renderHotelDataInCityItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  viewImage: {
    justifyContent: "center",
    alignContent: "center",
  },
  image: {
    height: 210,
    width: 350,
    alignSelf: "center",
  },
  cityNameText: {
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 20,
  },
  cityName: {
    height: 40,
    width: 190,
  },
  decription: {
    height: 139,
    width: 345,
  },
  decriptionText: {
    fontSize: 16,
    paddingLeft: 20,
  },
  containerHotel: {
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  headerHotel: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  discorverItem: {
    width: 177,
    height: 204,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginRight: 20,
  },
  discorverItemImage: {
    borderRadius: 30,
  },
  discorverItemLocationWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  discorverItemLocationText: {
    fontSize: 18,
    color: colors.white,
    marginLeft: 5,
  },
  categoryTitle:{
    fontFamily: "SourceSans-Bold",
    fontSize:24,
    color:'#333333'
  },
});
export default OverviewCity;
