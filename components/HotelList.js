import React from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  Dimensions,
  SafeAreaView,
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
      <View style={[styles.card, styles.shadowProp]}>
        <ImageBackground
          source={item.image}
          style={styles.restaurantItem}
          imageStyle={styles.restaurantItemImage}
        ></ImageBackground>
        <View style={styles.descriptionFood}>
          <View>
            <Text style={styles.itemTitleText} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.itemAddress} numberOfLines={1}>
              Địa chỉ: {item.location}
            </Text>
            <Text style={styles.itemFastReview} numberOfLines={1}>
              Đánh giá: {item.rating}/5
            </Text>
            <Text style={styles.rangePrice} numberOfLines={1}>
              Giá phòng từ: {item.price} đ/Ngày/Người
            </Text>
            {/* <Text style={styles.itemAlivableTime} numberOfLines={1}>
              Đặt chỗ: 19h-22h các ngày trong tuần
            </Text> */}
          </View>

          <TouchableOpacity
            style={styles.bookButton}
            onPress={() =>
              navigation.navigate("HotelDetails", {
                item: item,
                name: item.location,
              })
            }
          >
            <Text style={styles.buttonText}>Xem chi tiết</Text>
          </TouchableOpacity>
        </View>
      </View>

      // </TouchableOpacity>
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
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
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
  descriptionFood: {
    height: height * 0.35,
    display: "flex",
    flexDirection: "column",
  },
  itemAddress: {
    width: width * 0.6,
    marginTop: height * 0.02,
  },
  itemAlivableTime: {
    color: colors.black,
    width: width * 0.6,
    marginTop: height * 0.02,
  },
  itemFastReview: {
    width: width * 0.6,
    marginTop: height * 0.02,
  },
  rangePrice: {
    color: colors.orange,
    width: width * 0.6,
    marginTop: height * 0.02,
  },
  bookButton: {
    // height:height*0.2,
    marginTop: "auto",
    marginHorizontal: 20,
    bottom: -20,
    // marginBottom:100,
    backgroundColor: colors.orange,
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
    // alignSelf:"flex-end",
    // alignContent:"flex-end"
  },

  buttonText: {
    fontSize: 18,
    color: colors.white,
  },
});

export default HotelList;
