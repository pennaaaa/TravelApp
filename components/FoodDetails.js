import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../assets/color/colors";
import { LinearGradient } from "expo-linear-gradient";
import { SliderBox } from "react-native-image-slider-box";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

Entypo.loadFont();
Ionicons.loadFont();
FontAwesome.loadFont();

const FoodDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const data = item.imageFood;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <SliderBox
            images={item.images}
            sliderBoxHeight={height * 0.4}
            dotColor="#87BB73"
            inactiveDotColor="white"
          ></SliderBox>
          <View style={styles.descriptionTextWrapper}>
            <View style={styles.resTitle}>
              <Text style={styles.titleText}>{item.name}</Text>
            </View>

            <Text style={styles.resAddress}>
              <Entypo name="location-pin" size={20} color={"#87BB73"} />{" "}
              {item.address}
            </Text>

            <View style={styles.infoWrapper}>
              <View style={styles.infoRes}>
                <Text style={styles.addressText}>
                  <Ionicons name="restaurant" size={16} color={"#87BB73"} />{" "}
                  {"   "}
                  {item.type}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              ></View>

              <View style={styles.infoRoom}>
                <Text style={styles.addressText}>
                  <Ionicons name="fast-food" size={16} color={"#87BB73"} />{" "}
                  {"  "}
                  {(item.priceFrom + item.priceTo) / 2}đ/món
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.resPrice}>
          <Text style={styles.resText}>{item.fee} $</Text>
          <Text style={styles.perdayText}> (Phí đặt bàn)</Text>
        </View>
        <TouchableOpacity
          style={styles.signIn}
          onPress={() =>
            navigation.navigate("FoodBooking", {
              item: item,
              name: item.location,
            })
          }
        >
          <LinearGradient
            colors={["#3FA344", "#8DCA70"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={styles.signIn}
          >
            <Text style={styles.buttonText}>Tiếp tục</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    height: height,
  },
  backgroundImage: {
    height: height * 0.4,
    justifyContent: "space-between",
  },
  descriptionWrapper: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 25,
  },

  descriptionTextWrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  titleText: {
    width: width * 0.7,
    fontSize: 24,
    fontFamily: "SourceSans-SemiBold",
    color: "black",
  },
  address: {
    marginTop: 10,
    fontSize: 16,
    color: colors.darkgray,
    textAlign: "center",
  },
  timeAvailableWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  titleTimeAvailable: {
    fontSize: 16,
    color: "#87BB73",
    fontFamily: "SourceSans-SemiBold",
  },
  itemTimeAvailable: {
    fontSize: 16,
    color: colors.black,
  },
  typePriceWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  typeWrapper: {
    flexDirection: "column",
  },
  typeTitle: {
    color: colors.darkgray,
    textAlign: "center",
  },
  typeText: {
    color: "#87BB73",
    fontFamily: "SourceSans-SemiBold",
    textAlign: "center",
  },
  priceTitle: {
    color: colors.darkgray,
    textAlign: "center",
  },
  priceText: {
    color: "#87BB73",
    fontFamily: "SourceSans-SemiBold",
    textAlign: "center",
  },
  descriptionTitle: {
    fontSize: 26,
    color: colors.black,
    marginLeft: 20,
  },
  descriptionText: {
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 16,
    color: colors.darkgray,
  },
  imageMenu: {
    marginTop: 10,
    width: width * 0.9,
    marginLeft: width * 0.05,
    justifyContent: "space-between",
  },
  buttonWrapper: {
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 50,
    backgroundColor: colors.orange,
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
  },
  signIn: {
    width: width * 0.36,
    height: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  resTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  resAddress: {
    width: width * 0.7,
    marginLeft: 10,
    fontSize: 15,
    fontFamily: "SourceSans-Regular",
    color: "#767676",
  },
  infoWrapper: {
    marginVertical: 10,
    backgroundColor: "#F7F8FB",
    padding: 5,
    flexDirection: "row",
  },
  infoRes: {
    flexDirection: "column",
    marginHorizontal: width * 0.07,
  },
  addressText: {
    fontSize: 16,
    fontFamily: "SourceSans-Regular",
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    padding: 10,
  },
  resPrice: {
    flexDirection: "row",
    alignItems: "center",
  },
  perdayText: {
    fontSize: 16,
    fontFamily: "SourceSans-Regular",
    color: "#767676",
  },
  resText: {
    fontSize: 20,
    fontFamily: "SourceSans-SemiBold",
    color: "#2EC974",
  },
});

export default FoodDetails;
