import React from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Button,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../assets/color/colors";
import vehicleRentalData from "../assets/data/vehicleRentalData";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const VehicleRentalList = ({ navigation }) => {
  const renderVehicleRentalDataItem = ({ item }) => {
    return (
      <View style={[styles.card, styles.shadowProp]}>
        <ImageBackground
          source={item.image}
          style={styles.restaurantItem}
          imageStyle={styles.restaurantItemImage}
        >
        </ImageBackground>
        <View style={styles.descriptionFood}>
          <View>
            <Text style={styles.itemTitleText} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.itemFastReview} numberOfLines={1}>
              Loại xe: {item.type}
            </Text>
            <Text style={styles.itemFastReview} numberOfLines={1}>
              Chỗ ngồi: {item.seat}
            </Text>
            <Text style={styles.itemAddress} numberOfLines={1}>
              Địa chỉ: {item.address}
            </Text>
            <Text style={styles.rangePrice} numberOfLines={1}>
              Giá thuê: {item.price} đ/ ngày
            </Text>
          </View>

          <TouchableOpacity
            style={styles.bookButton}
            onPress={() =>
              navigation.navigate("VehicleDetails", {
                item: item,
                name: item.location,
              })
            }
          >
            <Text style={styles.buttonText}>Thuê xe</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <View style={styles.restaurantHighContainer}>
        {/* <Text style={styles.highTitle}>Ẩm thực nổi bật</Text> */}
        <View style={styles.highItemWrapper}>
          <FlatList
            data={vehicleRentalData}
            renderItem={renderVehicleRentalDataItem}
            keyExtractor={(item) => item.id}

            // horizontal
            // showsHorizontalScrollIndicator={false}
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
    width: width * 0.35,
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

export default VehicleRentalList;
