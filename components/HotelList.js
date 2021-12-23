import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// import hotelData from "../assets/data/hotelData";
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

const HotelList = (props) => {
  const [isHotelLoading, setHotelLoading] = useState(true);
  const [hotelData, sethotelData] = useState([]);
  const [isLoaded] = useFonts({
    "SourceSans-Light": require("../assets/fonts/LexendDeca-ExtraBold/SourceSansPro-Light.ttf"),
    "SourceSans-Regular": require("../assets/fonts/LexendDeca-ExtraBold/SourceSansPro-Regular.ttf"),
    "SourceSans-SemiBold": require("../assets/fonts/LexendDeca-ExtraBold/SourceSansPro-SemiBold.ttf"),
    "SourceSans-Bold": require("../assets/fonts/LexendDeca-ExtraBold/SourceSansPro-Bold.ttf"),
  });
  const item = props.item;
  useEffect(() => {
    setTimeout(() => {
      fetch("https://pbl6-travelapp.herokuapp.com/room?city=" + item.title)
        .then((response) => response.json())
        .then((json) => sethotelData(json))
        .catch((error) => console.error(error))
        .finally(() => setHotelLoading(false));
    }, 0);
  }, []);

  const navigation = props.navigation;
  const renderHotelDataItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("HotelDetails", {
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
            <Text style={styles.itemName}>
              <FontAwesome name="flash" size={20} color={"#87BB73"} />
              {"  "}
              {item.idHotel.name}, {item.idHotel.address}
            </Text>
          </View>

          <View style={styles.infoWrapper}>
            <View style={styles.infoRoom}>
              <Text style={styles.addressText}>
                <Entypo name="home" size={16} color={"#87BB73"} />{" "}
                {"   " + item.type}
              </Text>

              <Text style={styles.addressText}>
                <Ionicons name="person" size={16} color={"#87BB73"} />{" "}
                {"   1 người"}
              </Text>
            </View>

            <View style={styles.infoRoom}>
              <Text style={styles.addressText}>
                <FontAwesome name="bath" size={16} color={"#87BB73"} /> {"  "} 1
                Phòng tắm
              </Text>
              <Text style={styles.addressText}>
                <Ionicons name="bed" size={16} color={"#87BB73"} /> {"   "} 1
                Giường
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
              <Text style={styles.priceText}>{item.price}$</Text>
              <Text style={styles.perdayText}>/ngày</Text>
            </View>
            <Rating
              imageSize={20}
              fractions="{1}"
              readonly
              startingValue={item.vote}
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
          data={hotelData}
          renderItem={renderHotelDataItem}
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
  restaurantItem: {
    width: width * 0.3,
    height: height * 0.35,
    justifyContent: "space-between",
    marginRight: 20,
  },
  restaurantItemImage: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  restaurantHighContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  highTitle: {
    fontSize: 24,
    justifyContent: "center",
  },
  highItemWrapper: {
    marginTop: 15,
    marginHorizontal: 15,
  },

  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
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

  itemText: {
    marginTop: 10,
    marginHorizontal: 15,
  },
  itemName: {
    fontSize: 20,
    fontFamily: "SourceSans-SemiBold",
  },
  itemPrice: {
    fontSize: 20,
    fontFamily: "SourceSans-SemiBold",
  },
  // addressText: {
  //   fontSize: 16,
  //   fontFamily: "SourceSans-Regular",
  //   marginLeft: 15,
  //   marginBottom: 5,
  // },
  addressText: {
    fontSize: 16,
    fontFamily: "SourceSans-Regular",
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 15,
  },
  infoRoom: {
    width: "50%",
    flexDirection: "column",
    // marginHorizontal: width * 0.07,
    textAlign: "center",
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
});

export default HotelList;
