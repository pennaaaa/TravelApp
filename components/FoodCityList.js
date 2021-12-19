import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import foodData from "../assets/data/foodData";
import colors from "../assets/color/colors";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { Rating } from "react-native-elements";
import { useFonts } from "@use-expo/font";
import Ionicons from "react-native-vector-icons/Ionicons";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
FontAwesome.loadFont();
Entypo.loadFont();
Ionicons.loadFont();

const FoodCityList = (props) => {
  const [foodData, setRestaurantData] = useState([]);
  const [isRestaurantLoading, setRestaurantLoading] = useState(true);
  const item = props.item;
  useEffect(() => {
    setTimeout(() => {
      fetch(
        "https://pbl6-travelapp.herokuapp.com/restaurant?city=" + item.title
      )
        .then((response) => response.json())
        .then((json) => setRestaurantData(json))
        .catch((error) => console.error(error))
        .finally(() => setRestaurantLoading(false));
    }, 0);
  }, []);
  const navigation = props.navigation;
  const renderFoodDataItem = ({ item }) => {
    console.log(item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("FoodDetails", {
            item: item,
            name: item.location,
          })
        }
      >
        <View style={styles.itemContainer}>
          <View
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <Image
              source={{ uri: item.images[0] }}
              style={styles.discorverItem}
            />
          </View>
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>
              <FontAwesome name="flash" size={20} color={"#87BB73"} />{" "}
              {item.name}
            </Text>
            <Text style={styles.itemName}> {item.address}</Text>
          </View>

          <View style={styles.infoWrapper}>
            <View style={styles.infoRoom}>
              <Text style={styles.addressText}>
                <Entypo name="home" size={16} color={"#87BB73"} />{" "}
                {"   Món Việt"}
              </Text>

              <Text style={styles.addressText}>
                <Ionicons name="time" size={16} color={"#87BB73"} />{" "}
                {"   19h-22h"}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <View style={styles.roomPrice}>
              <Text style={styles.priceText}>
                {item.priceFrom}-{item.priceTo}đ
              </Text>
              <Text style={styles.perdayText}>/món</Text>
            </View>
            <Rating
              imageSize={20}
              fractions="{1}"
              readonly
              startingValue={item.rating}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.highItemWrapper}>
        <FlatList
          data={foodData}
          renderItem={renderFoodDataItem}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: colors.white,
    marginBottom: 0,
  },
  itemContainer: {
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
  discorverItem: {
    width: "100%",
    // height:height*0.3,
    height: 200,
    resizeMode: "cover",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  itemText: {
    marginTop: 10,
    marginHorizontal: 15,
  },
  addressText: {
    width: "50%",
    fontSize: 16,
    fontFamily: "SourceSans-Regular",
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 15,
  },
  infoRoom: {
    flexDirection: "row",
  },
  infoWrapper: {
    width: width * 0.8,
    marginVertical: 10,
    backgroundColor: "#F7F8FB",
    padding: 5,
    alignSelf: "center",
    flexDirection: "row",
  },
  roomPrice: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceText: {
    fontSize: 20,
    fontFamily: "SourceSans-SemiBold",
    color: "#87BB73",
  },
  perdayText: {
    fontSize: 16,
    fontFamily: "SourceSans-Regular",
    color: "#767676",
  },
  itemName: {
    width: width * 0.8,
    // marginLeft: 10,
    fontSize: 15,
    fontFamily: "SourceSans-Regular",
    color: "#767676",
  },
  highItemWrapper: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  itemTitle: {
    // alignSelf:'center',
    // width: width * 0.7,
    fontSize: 24,
    fontFamily: "SourceSans-SemiBold",
    color: "black",
  },
});

export default FoodCityList;
