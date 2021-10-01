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
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../assets/color/colors";


const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const FoodDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const data = item.imageFood;
  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={item.imageBig}
          style={styles.backgroundImage}
        ></ImageBackground>
        <View style={styles.descriptionWrapper}>
          <View style={styles.descriptionTextWrapper}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.address}>{item.address}</Text>
            <View
              style={{
                marginLeft: width * 0.2,
                width: width * 0.6,
                marginTop: 10,
                borderBottomColor: "#909090",
                borderBottomWidth: 1,
              }}
            />
            <View style={styles.timeAvailableWrapper}>
              <Text style={styles.titleTimeAvailable}>Giờ đón khách: </Text>
              <Text style={styles.itemTimeAvailable}>07h-14h00; 16h-23h00</Text>
            </View>
            <View
              style={{
                marginLeft: width * 0.2,
                width: width * 0.6,
                marginTop: 10,
                borderBottomColor: "#909090",
                borderBottomWidth: 1,
              }}
            />
            <View style={styles.typePriceWrapper}>
              <View style={styles.typeWrapper}>
                <Text style={styles.typeTitle}>Loại hình</Text>
                <Text style={styles.typeText}>Chuyên món Việt</Text>
              </View>

              <View
                style={{ height: "100%", width: 1, backgroundColor: "#909090" }}
              ></View>

              <View style={styles.priceWrapper}>
                <Text style={styles.priceTitle}>Khoảng giá</Text>
                <Text style={styles.priceText}>
                  {item.pricefrom}-{item.priceto}đ/món
                </Text>
              </View>
            </View>
            <View
              style={{
                marginLeft: -20,
                width: width,
                marginTop: 10,
                borderBottomColor: "#909090",
                borderBottomWidth: 3,
              }}
            />
          </View>
          <View>
            <Text style={styles.descriptionTitle}>Giới thiệu</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>

          <View
            style={{
              marginLeft: 0,
              width: width,
              marginTop: 10,
              borderBottomColor: "#909090",
              borderBottomWidth: 3,
            }}
          />
          <View>
            <Text style={styles.descriptionTitle}>Menu</Text>
            <Image
              style={styles.imageMenu}
              source={require("../assets/image/menuFood.jpg")}
            ></Image>
          </View>
          <View
            style={{
              marginLeft: 0,
              width: width,
              marginTop: 10,
              borderBottomColor: "#909090",
              borderBottomWidth: 3,
            }}
          />
          <View>
            <Text style={styles.descriptionTitle}>Món ăn</Text>
            <View style={{ marginTop: 10 }}>
              <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        width,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{ uri: item }}
                        style={{
                          width: width * 0.9,
                          height: 200,
                          resizeMode: "cover",
                          borderRadius: 15,
                        }}
                      ></Image>
                    </View>
                  );
                }}
              ></FlatList>
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() =>
                  navigation.navigate("FoodBooking", {
                    item: item,
                    name: item.location,
                  })
                }
              >
                <Text style={styles.buttonText}>Đặt chỗ ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backgroundImage: {
    height: height * 0.6,
    justifyContent: "space-between",
  },
  descriptionWrapper: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: -20,
    // marginBottom:20,
    borderRadius: 25,
    // height: height,
  },

  descriptionTextWrapper: {
    marginTop: 10,
    marginHorizontal: 20,
    // height: height * 0.2,
  },
  titleText: {
    // fontFamily: 'Lato-Bold',
    // width:width,
    fontSize: 26,
    color: colors.black,
    // justifyContent: "center",
    // alignItems: "center",
    textAlign: "center",
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
    color: colors.orange,
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
    color: colors.orange,
    textAlign: "center",
  },
  priceTitle: {
    color: colors.darkgray,
    textAlign: "center",
  },
  priceText: {
    color: colors.orange,
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
});

export default FoodDetails;
