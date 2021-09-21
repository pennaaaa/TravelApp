import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../assets/color/colors";
import Entypo from "react-native-vector-icons/Entypo";
import ReadMore from "react-native-read-more-text";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const HotelDetails = ({ route, naviogation }) => {
  const { item } = route.params;
  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground source={item.imageBig} style={styles.backgroundImage}>
          <View style={styles.titlesWrapper}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <View style={styles.locationWrapper}>
              <Entypo
                name="location-pin"
                size={24}
                color={colors.white}
              ></Entypo>
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.descriptionWrapper}>
          <View style={styles.heartWrapper}>
            <Entypo name="heart" size={32} color={colors.orange} />
          </View>

          <View style={styles.descriptionTextWrapper}>
            <Text style={styles.descriptionTitle}>Giới thiệu</Text>
            {/* <ReadMore> */}

            <Text style={styles.descriptionText}>{item.description}</Text>
            {/* </ReadMore> */}
          </View>

          <View style={styles.infoWrapper}>
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>Giá phòng</Text>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoText}>{item.price}đ</Text>
                <Text style={styles.infoSubText}>/người</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>Đánh giá</Text>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoText}>{item.rating}</Text>
                <Text style={styles.infoSubText}>/5</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>Thời gian thuê</Text>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoText}>{item.duration}</Text>
                <Text style={styles.infoSubText}> ngày</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => alert("You booked a trip!")}
          >
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
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
    height: height * 0.6,
  },
  backIcon: {
    marginLeft: 20,
    marginTop: 60,
  },
  titlesWrapper: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
  itemTitle: {
    // fontFamily: 'Lato-Bold',
    fontSize: 32,
    color: colors.white,
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  locationText: {
    // fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: colors.white,
  },
  heartWrapper: {
    position: "absolute",
    right: 40,
    top: -30,
    width: 64,
    height: 64,
    backgroundColor: colors.white,
    borderRadius: 64,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  descriptionTextWrapper: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  descriptionTitle: {
    // fontFamily: 'Lato-Bold',
    fontSize: 24,
    color: colors.black,
  },
  descriptionText: {
    marginTop: 20,
    // fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: colors.darkgray,
    height: 85,
  },
  infoWrapper: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: "space-between",
  },
  infoItem: {},
  infoTitle: {
    // fontFamily: 'Lato-Bold',
    fontSize: 12,
    color: colors.gray,
  },
  infoTextWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 5,
  },
  infoText: {
    // fontFamily: 'Lato-Bold',
    fontSize: 24,
    color: colors.orange,
  },
  infoSubText: {
    // fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: colors.gray,
  },
  buttonWrapper: {
    marginHorizontal: 20,
    marginTop: 40,
    backgroundColor: colors.orange,
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    // fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: colors.white,
  },
});

export default HotelDetails;
