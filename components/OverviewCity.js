import React from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import hotelDataInCity from "../assets/data/hotelDataInCity";
import colors from "../assets/color/colors";
import { useFonts } from "@use-expo/font";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

Entypo.loadFont();
Ionicons.loadFont();

const OverviewCity = (props) => {
  const [isLoaded] = useFonts({
    "SourceSans-Light": require("../assets/fonts/LexendDeca-ExtraBold/SourceSansPro-Light.ttf"),
    "SourceSans-Regular": require("../assets/fonts/LexendDeca-ExtraBold/SourceSansPro-Regular.ttf"),
    "SourceSans-SemiBold": require("../assets/fonts/LexendDeca-ExtraBold/SourceSansPro-SemiBold.ttf"),
    "SourceSans-Bold": require("../assets/fonts/LexendDeca-ExtraBold/SourceSansPro-Bold.ttf"),
  });
  const item = props.item;
  const renderHotelDataInCityItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.itemContainer} shadowOffset={{ height: 10 }}>
          <Image
            source={item.image}
            style={styles.discorverItem}
          />
          <View style={styles.itemViewText}>
            <Text
              style={{
                marginLeft: 10,
                marginTop: 5,
                fontFamily: "SourceSans-SemiBold",
                fontSize: 18,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                marginLeft: 10,
                marginVertical: 5,
                fontFamily: "SourceSans-Regular",
                fontSize: 18,
                color: "#7B7B7B",
              }}
            >
              {item.location}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        // forceInset={{ bottom: "never" }}
        style={{ backgroundColor: colors.white }}
      >
        {/* Image */}
        <View style={styles.viewImage}>
          <Image source={item.imageBig} style={styles.image} />
        </View>
        {/* decription */}
        <View style={styles.cityName}>
          <Text style={styles.cityNameText}>{item.title}</Text>
        </View>
        <View style={styles.decription}>
          <Text style={styles.decriptionText}>{item.decription}</Text>
        </View>
        {/* Hotel in city */}
        <View style={styles.cityHighContainer}>
          <Text style={styles.highTitle}>Khách sạn</Text>
          <View style={styles.highItemWrapper}>
            <FlatList
              data={hotelDataInCity}
              // data={hotelData}
              renderItem={renderHotelDataInCityItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <Text>Giới thiệu Hà Nội Giới thiệu Hà Nội Giới thiệu Hà Nội</Text>
        <View style={styles.cityHighContainer}>
          <Text style={styles.highTitle}>Khách sạn</Text>
          <View style={styles.highItemWrapper}>
            <FlatList
              data={hotelDataInCity}
              // data={hotelData}
              renderItem={renderHotelDataInCityItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  viewImage: {
    // justifyContent: "center",
    // alignContent: "center",
    width: "100%",
    height: "40%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    height: "100%",
    width: "100%",
    // padding:100,
    // marginLeft:50,
    alignSelf: "center",
  },
  cityNameText: {
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 10,
  },
  cityName: {
    // height: 40,
    // width: 190,
  },
  decription: {
    // height: 139,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    // alignSelf: "center",
  }, // // marginTop: 15,
  // marginLeft: 20,
  // padding: 10,
  decriptionText: {
    fontSize: 16,
    // paddingLeft: 20,
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
    width: 220,
    height: 130,
    resizeMode: "stretch",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
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
  itemViewText: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cityHighContainer: {},
  highTitle: {
    color: "black",
    fontSize: 22,
    paddingLeft: 10,
    fontFamily: "SourceSans-SemiBold",
  },
  highItemWrapper: {
    // paddingLeft:10,
    // paddingRight:10,
    flexDirection: "row",
    marginTop: 15,
  },
  itemContainer: {
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 20,
  },
});
export default OverviewCity;
