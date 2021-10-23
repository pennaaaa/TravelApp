import React from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import hotelData from "../assets/data/hotelData";
import colors from "../assets/color/colors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

// const HotelList = ({ navigation }) => {
const HotelList = (props) => {
  const item = props.item;
  const navigation = props.navigation;
  const renderHotelDataItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("HotelDetails", {
            item: item,
            name: item.location,
          })
        }
      >
        <View style={[styles.itemContainer,styles.shadowProp]} >
          <Image source={item.image} style={styles.discorverItem}></Image>
          <View style={styles.itemViewText}>
            <Text
              style={{
                marginLeft: 10,
                marginTop: 5,
                fontFamily: "SourceSans-SemiBold",
                fontSize: 22,
                alignSelf: "center",
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                marginLeft: 10,
                marginVertical: 5,
                fontFamily: "SourceSans-Regular",
                fontSize: 20,
                color: "#7B7B7B",
                marginTop:15,
                alignSelf: "center",
              }}
            >
              {item.price}đ/ngày
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <View style={styles.restaurantHighContainer}>
        {/* <Text style={styles.highTitle}>Ẩm thực nổi bật</Text> */}
        <View style={styles.highItemWrapper}>
          <FlatList
            data={hotelData}
            renderItem={renderHotelDataItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
      {/* </ScrollView> */}
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
    // paddingHorizontal: 10,
    // paddingVertical: 15,
    marginRight: 20,
    // marginTop: 20,
  },
  restaurantItemImage: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  restaurantHighContainer: {
    // marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  highTitle: {
    fontSize: 24,
    justifyContent: "center",
  },
  highItemWrapper: {
    flexDirection: "row",
    marginTop: 10,
  },

  itemTitleText: {
    width: width * 0.6,
    // height: height * 0.1,
    fontSize: 20,
    marginTop: 10,
    // marginLeft:0,
  },
  card: {
    // height:height*0.3,
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 10,
    // paddingVertical: 45,
    // paddingHorizontal: 25,
    width: "100%",
    marginVertical: 5,
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
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  discorverItem: {
    width: 200,
    height: 120,
    resizeMode: "stretch",
    borderRadius: 10,
    // borderTopLeftRadius:5,
    // borderBottomLeftRadius:5,
  },
  itemViewText: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default HotelList;
