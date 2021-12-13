import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import cartItemData from "../assets/data/cartItemData";
import colors from "../assets/color/colors";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
FontAwesome.loadFont();
Entypo.loadFont();
Ionicons.loadFont();

const cart = (props) => {
  const item = props.item;
  const navigation = props.navigation;
  const renderCartItem = ({ item }) => {
    return (
      <TouchableOpacity
      // onPress={() =>
      //   //   navigation.navigate("FoodDetails", {
      //   //     item: item,
      //   //     name: item.location,
      //   //   })
      // //   alert("Tra tien de!!")
      // }
      >
        <View style={styles.itemContainer}>
          <View style={styles.infoBill}>
            <Text style={styles.idService}>Mã đặt dịch vụ: {item.idBill} </Text>
            <Text style={styles.priceText}>{item.total}đ</Text>
          </View>

          <View style={styles.infoBill}>
            <Image source={item.image} style={styles.imageStyle}></Image>
            <View style={styles.infoRoom}>
              <Text style={styles.serviceText}>Dịch vụ: {item.service}</Text>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemName}>{item.address}</Text>
            </View>
          </View>

          <View style={styles.infoBill}>
            <Text style={styles.idService}>Ngày đên: {item.checkIn}</Text>
            <Text style={styles.status}>Chưa thanh toán</Text>
          </View>

          <View style={styles.datePrice}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                alert("Thanh toán");
              }}
            >
              <LinearGradient
                colors={["#3FA344", "#8DCA70"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={styles.signIn}
              >
                <Text style={[styles.buttonText, { color: "#fff" }]}>
                  Thanh toán
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                alert("Hủy");
              }}
            >
              <LinearGradient
                colors={["#3FA344", "#8DCA70"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={styles.signIn}
              >
                <Text style={[styles.buttonText, { color: "#fff" }]}>
                  Hủy đặt trước
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.highItemWrapper}>
          <FlatList
            data={cartItemData}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.idBill}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <TouchableOpacity
          style={styles.payment}
          onPress={() => {
            alert("Thanh toán");
          }}
        >
          <LinearGradient
            colors={["#3FA344", "#8DCA70"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={styles.payment}
          >
            <Text style={[styles.buttonText, { color: "#fff" }]}>
              Thanh toán tất cả
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: colors.white,
    marginBottom: 20,
  },
  itemContainer: {
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 10,
    width: "98%",
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoBill: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  infoRoom: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 8,
  },

  serviceText: {
    fontSize: 20,
    fontFamily: "SourceSans-Regular",
    color: "black",
  },
  priceText: {
    fontSize: 18,
    fontFamily: "SourceSans-SemiBold",
    color: "#87BB73",
  },
  itemName: {
    width: width * 0.8,
    fontSize: 15,
    fontFamily: "SourceSans-Regular",
    color: "#767676",
  },
  highItemWrapper: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  itemTitle: {
    fontSize: 24,
    fontFamily: "SourceSans-SemiBold",
    color: "black",
  },
  idService: {
    fontSize: 18,
    fontFamily: "SourceSans-Regular",
    color: "black",
  },
  status: {
    fontSize: 18,
    fontFamily: "SourceSans-Regular",
    color: "#FFA660",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "SourceSans-SemiBold",
    padding: 6,
  },
  datePrice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
  },
  signIn: {
    width: width * 0.32,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 8,
  },
  payment: {
    width: width * 0.5,
    paddingTop: 8,
    paddingBottom:8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 8,
  },
});

export default cart;
