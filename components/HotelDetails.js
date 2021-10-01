import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  FlatList,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../assets/color/colors";
import Entypo from "react-native-vector-icons/Entypo";
import ReadMore from "react-native-read-more-text";
// import { Picker } from "@react-native-picker/picker";
import RNPPickerSelect from "react-native-picker-select";
import { values } from "lodash";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const HotelDetails = ({ route, naviogation }) => {
  const { item } = route.params;

  // const [selectedValue, setSelectedValue] = useState("1");
  const [selectedValue, setSelectedValue] = useState(1);
  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: item.images[1] }}
          style={styles.backgroundImage}
        >
          {/* <View style={styles.titlesWrapper}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <View style={styles.locationWrapper}>
              <Entypo
                name="location-pin"
                size={24}
                color={colors.white}
              ></Entypo>
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          </View> */}
        </ImageBackground>
        <View style={styles.descriptionWrapper}>
          <View style={styles.heartWrapper}>
            <Entypo name="heart" size={32} color={colors.orange} />
          </View>

          {/* <View style={styles.titlesWrapper}>
            <Text style={styles.itemTitle}>Khách sạn {item.title}</Text>
          </View> */}

          <View style={styles.descriptionTextWrapper}>
            <Text style={styles.descriptionTitle}>Giới thiệu</Text>
            {/* <ReadMore numberOfLines={3} style={styles.descriptionText}> */}

            <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={(handlePress) => {
                return (
                  <Text
                    style={{ color: colors.shade, marginTop: 5 }}
                    onPress={handlePress}
                  >
                    Đọc tiếp
                  </Text>
                );
              }}
              renderRevealedFooter={(handlePress) => {
                return (
                  <Text
                    // numberOfLines={3}
                    style={{ color: colors.shade, marginTop: 5 }}
                    onPress={handlePress}
                  >
                    Thu gọn
                  </Text>
                );
              }}
              onReady={() => {}}
            >
              <Text style={styles.descriptionText}>{item.description}</Text>
            </ReadMore>

            {/* </ReadMore> */}
          </View>

          <View style={styles.infoWrapper}>
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>Thời gian thuê</Text>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoText}>{item.duration}</Text>
                <Text style={styles.infoSubText}> ngày</Text>
              </View>
            </View>

            {/* <View style={styles.infoItem}>
                <Text style={styles.infoTitle}>Đánh giá</Text>
                <View style={styles.infoTextWrapper}>
                  <Text style={styles.infoText}>{item.rating}</Text>
                  <Text style={styles.infoSubText}>/5</Text>
                </View>
              </View> */}

            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>Số người</Text>
              <RNPPickerSelect
                onClose={() => console.log("close select")}
                style={{
                  inputIOS: {
                    fontSize: 16,
                    paddingTop: 13,
                    paddingHorizontal: 10,
                    paddingBottom: 12,
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 4,
                    backgroundColor: "white",
                    color: "black",
                  },
                  placeholder: {
                    colors: colors.yelow,
                  },
                  inputAndroid: {
                    color: colors.yelow,
                    paddingHorizontal: 10,
                    backgroundColor: colors.yelow,
                    borderRadius: 5,

                    width:width,
                  },}
                }


                onValueChange={(value) => setSelectedValue(value)}
                style={{
                  inputAndroid: {
                    // fontSize:32,
                    marginTop:10,
                    // backgroundColor: "transparent",
                    width:80,
                    color: colors.orange,
                  },
                  iconContainer: {
                    top: 5,
                    right: 15,
                  },
                }}
                items={[
                  {
                    label: "1",
                    value: 1,
                    color: colors.orange,
                    fontSize: 12,
                  },
                  {
                    label: "2",
                    value: 2,
                    color: colors.orange,
                    fontSize: 12,
                  },
                  {
                    label: "4",
                    value: 4,
                    color: colors.orange,
                    fontSize: 12,
                  },
                ]}
              />
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>Giá phòng</Text>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoText}>
                  {selectedValue * item.price * item.duration}đ
                </Text>
                <Text style={styles.infoSubText}>/người</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => alert("Bạn đã đặt phòng thành công!")}
          >
            <Text style={styles.buttonText}>Đặt Ngay</Text>
          </TouchableOpacity>

          <View style={styles.footer}></View>
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
    marginTop: 10,
    marginHorizontal: 20,
    // height: height * 0.2,
  },
  descriptionTitle: {
    // fontFamily: 'Lato-Bold',
    fontSize: 24,
    color: colors.black,
  },
  descriptionText: {
    marginTop: 10,
    // fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: colors.darkgray,
    // height: 85,
  },
  infoWrapper: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: "space-between",
  },
  infoWrapper1: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: "center",
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
    // alignItems:'center',
    fontSize: 20,
    color: colors.orange,
  },
  infoSubText: {
    // fontFamily: 'Lato-Bold',
    fontSize: 14,
    color: colors.gray,
  },
  buttonWrapper: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom:10,
    // marginTop: height*0.1,
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
  buttonSelectDateText: {
    fontSize: 14,
    color: colors.black,
  },
  buttonSelectRoomTypeText: {
    fontSize: 14,
    color: colors.black,
  },
  buttonSelectDate: {
    width: width * 0.6,
    // marginHorizontal: 20,
    marginLeft: 15,
    marginTop: 10,
    backgroundColor: colors.white,
    alignItems: "center",
    paddingVertical: 15,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: colors.black,
    // borderRadius: 10,
  },
  buttonSelectRoomType: {
    marginRight: 15,
    width: width * 0.2,
    marginHorizontal: 0,
    marginTop: 10,
    backgroundColor: colors.white,
    alignItems: "center",
    paddingVertical: 15,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 1,
    borderColor: colors.black,
    // borderRadius: 10,
  },
  footer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: height * 0.05,
    // backgroundColor:'green',
    flexDirection: "column",
    height: height * 0.15,
    alignItems: "stretch",
  },
});

export default HotelDetails;
