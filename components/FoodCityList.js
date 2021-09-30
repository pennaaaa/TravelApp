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
import foodData from "../assets/data/foodData";
import colors from "../assets/color/colors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const FoodCityList = ({ navigation }) => {
  const renderFoodDataItem = ({ item }) => {
    return (
      // <TouchableOpacity
      //   onPress={() =>
      //     navigation.navigate("Details", {
      //       item: item,
      //       name: item.location,
      //     })
      //   }
      // >
      <View style={[styles.card, styles.shadowProp]}>
        <ImageBackground
          source={item.image}
          style={styles.restaurantItem}
          imageStyle={styles.restaurantItemImage}
        >
          {/* // <View style={styles.discorverItemLocationWrapper}>
        //     <Entypo name="location-pin" size={18} color={colors.white} />
        //     <Text style={styles.discorverItemLocationText}>
        //       {item.location}
        //     </Text>
        //   </View> */}
        </ImageBackground>
        <View style={styles.descriptionFood}>
          <Text style={styles.itemTitleText}>{item.title}</Text>
          <Text style={styles.itemAddress}>Địa chỉ: {item.address}</Text>
          <Text style={styles.itemAlivableTime}>
            Đặt chỗ: 19h-22h các ngày trong tuần
          </Text>
          <Text style={styles.itemFastReview}>Chuyên món Việt (Cơm niêu)</Text>
          <Text style={styles.rangePrice}>
            Giá từ: {item.pricefrom}-{item.priceto} đ/ Món
          </Text>
          <View style={{ marginBottom: 5 }}>
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => alert("Bạn đã đặt chỗ thành công!")}
            >
              <Text style={styles.buttonText}>Đặt chỗ</Text>
            </TouchableOpacity>
          </View>
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
            data={foodData}
            renderItem={renderFoodDataItem}
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
    flexDirection: "column",
    // marginVertical:5
    justifyContent: "space-between",
  },
  itemAddress: {
    width: width * 0.6,
  },
  itemAlivableTime: {
    color: colors.orange,
    width: width * 0.6,
  },
  itemFastReview: {
    width: width * 0.6,
  },
  rangePrice: {
    width: width * 0.6,
  },
  bookButton: {
    // color:colors.orange,
    // backgroundColor: colors.orange,
    // position:'relative',
    // borderRadius:10,
    marginHorizontal: 20,
    // height:50,
    // paddingBottom:0,
    // bottom: ,

    marginTop: 10,
    // marginBottom:10,
    // marginTop: height*0.1,
    backgroundColor: colors.orange,
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
  },
  // itemCustom: {
  //   height: height * 0.35,
  //   flexDirection: "row",
  //   // marginHorizontal: 20,
  //   marginTop: 20,
  //   // borderBottomColor: colors.shade,
  //   // borderBottomWidth: 0.5,
  //   shadowColor: '#000',
  //   shadowOffset: {width: -2, height: 4},
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,

  //   elevation: 5,

  //   // marginBottom
  // },
  buttonText: {
    fontSize: 18,
    color: colors.white,
  },
});

export default FoodCityList;
