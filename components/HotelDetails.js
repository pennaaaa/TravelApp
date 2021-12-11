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
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../assets/color/colors";
import Entypo from "react-native-vector-icons/Entypo";
import ReadMore from "react-native-read-more-text";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Rating, AirbnbRating } from "react-native-ratings";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SliderBox } from "react-native-image-slider-box";

FontAwesome.loadFont();
Entypo.loadFont();
Ionicons.loadFont();

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const HotelDetails = ({ route, navigation }) => {
  const { item } = route.params;

  const [selectedValue, setSelectedValue] = useState(1);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <SliderBox
            images={item.images}
            sliderBoxHeight={height * 0.4}
            dotColor="#87BB73"
            inactiveDotColor="white"
          ></SliderBox>

          <View style={styles.descriptionWrapper}>
            <View>
              <View style={styles.hotelTitle}>
                <Text style={styles.itemTitle}>{item.name}</Text>

                <Rating
                  imageSize={20}
                  fractions="{1}"
                  readonly
                  startingValue={item.vote}
                />
              </View>
              <Text style={styles.itemName}>
                <Entypo name="location-pin" size={20} color={"#87BB73"} />{" "}
                {item.address}, {item.city}
              </Text>
            </View>

            <View style={styles.infoWrapper}>
              <View style={styles.infoRoom}>
                <Text style={styles.addressText}>
                  <Entypo name="home" size={16} color={"#87BB73"} />{" "}
                  {"   Phòng đôi"}
                </Text>

                <Text style={styles.addressText}>
                  <Ionicons name="person" size={16} color={"#87BB73"} />{" "}
                  {"   1 người"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              ></View>

              <View style={styles.infoRoom}>
                <Text style={styles.addressText}>
                  <FontAwesome name="bath" size={16} color={"#87BB73"} /> {"  "}{" "}
                  1 Phòng tắm
                </Text>
                <Text style={styles.addressText}>
                  <Ionicons name="bed" size={16} color={"#87BB73"} /> {"   "} 1
                  Giường
                </Text>
              </View>
            </View>

            <View style={styles.subInfoWarpper}>
              <Text style={styles.subTitle}>Giới thiệu</Text>
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
                      style={{ color: colors.shade, marginTop: 5 }}
                      onPress={handlePress}
                    >
                      Thu gọn
                    </Text>
                  );
                }}
                onReady={() => {}}
              >
                <Text style={styles.textDescription}>
                  Nếu bạn đang tìm kiếm khách sạn dành cho gia đình ở Thành phố
                  Hồ Chí Minh, hãy thử nghiệm Khách sạn Paragon Sài Gòn. Trong
                  khi ở Khách sạn Paragon Sài Gòn, du k89hách có thể khám phá
                  Nhà hát Thành Phố Hồ Chí Minh (0,3 km) và Phố đi bộ Nguyễn Huệ
                  (0,5 km), một trong những điểm đến hàng đầu của Thành phố Hồ
                  Chí Minh. Là “ngôi nhà xa xứ,” các phòng khách sạn cung cấp tv
                  màn hình phẳng, quầy bar mini và điều hòa nhiệt độ, và kết nối
                  mạng thật dễ dàng, với wifi miễn phí sẵn có.
                </Text>
              </ReadMore>
            </View>

            <View style={styles.subInfoWarpper}>
              <Text style={styles.subTitle}>Đánh giá</Text>

              <View style={styles.feedbackWrapper}>
                <View style={styles.userContainer}>
                  <Image
                    source={require("../assets/image/avata1.png")}
                    style={styles.avata}
                  />
                  <View style={styles.userInfo}>
                    <View style={styles.userRating}>
                      <Text style={styles.userName}>Văn Ngọc Đạt</Text>
                      <Rating
                        type="star"
                        imageSize={20}
                        fractions="{1}"
                        readonly
                        startingValue={item.vote}
                        style={{ marginLeft: 12 }}
                      />
                    </View>
                    <Text style={styles.dateFeedback}>17 Otc 2021</Text>
                  </View>
                </View>

                <View>
                  <Text style={styles.textDescription}>
                    Phòng rất đẹp, tiện nghi. View nhìn ra biển mang lại cảm
                    giác tươi mát. Một nơi tuyệt vời để nghỉ ngơi!
                  </Text>
                </View>
              </View>

              <View style={styles.feedbackWrapper}>
                <View style={styles.userContainer}>
                  <Image
                    source={require("../assets/image/avata2.png")}
                    style={styles.avata}
                  />
                  <View style={styles.userInfo}>
                    <View style={styles.userRating}>
                      <Text style={styles.userName}>Trần Duy Anh Tú</Text>
                      <Rating
                        type="star"
                        imageSize={20}
                        fractions="{1}"
                        readonly
                        startingValue={item.vote}
                        style={{ marginLeft: 12 }}
                      />
                    </View>
                    <Text style={styles.dateFeedback}>17 Otc 2021</Text>
                  </View>
                </View>

                <View>
                  <Text style={styles.textDescription}>
                    Phòng rất đẹp, tiện nghi. View nhìn ra biển mang lại cảm
                    giác tươi mát. Một nơi tuyệt vời để nghỉ ngơi!
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.roomPrice}>
          <Text style={styles.priceText}>500.000đ</Text>
          <Text style={styles.perdayText}>/ngày</Text>
        </View>
        <TouchableOpacity
          style={styles.signIn}
          onPress={() =>
            navigation.navigate("HotelBooking", {
              item: item,
              name: item.location,
            })
          }
        >
          <LinearGradient
            colors={["#3FA344", "#8DCA70"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={styles.signIn}
          >
            <Text style={[styles.buttonText, { color: "#fff" }]}>Tiếp tục</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    height: height,
  },
  backgroundImage: {
    height: height * 0.4,
    justifyContent: "space-between",
  },
  descriptionWrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },

  buttonText: {
    fontSize: 18,
    color: colors.white,
  },

  itemTitle: {
    width: width * 0.7,
    fontSize: 24,
    fontFamily: "SourceSans-SemiBold",
    color: "black",
  },
  itemName: {
    width: width * 0.7,
    marginLeft: 10,
    fontSize: 15,
    fontFamily: "SourceSans-Regular",
    color: "#767676",
  },
  addressText: {
    fontSize: 16,
    fontFamily: "SourceSans-Regular",
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 15,
  },
  infoRoom: {
    flexDirection: "column",
    marginHorizontal: width * 0.07,
  },
  infoWrapper: {
    marginVertical: 10,
    backgroundColor: "#F7F8FB",
    padding: 5,
    flexDirection: "row",
  },
  signIn: {
    width: width * 0.36,
    height: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    padding: 10,
  },
  roomPrice: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceText: {
    fontSize: 20,
    fontFamily: "SourceSans-SemiBold",
    color: "#2EC974",
  },
  perdayText: {
    fontSize: 16,
    fontFamily: "SourceSans-Regular",
    color: "#767676",
  },
  hotelTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  subTitle: {
    fontSize: 20,
    fontFamily: "SourceSans-SemiBold",
    color: "black",
  },
  subInfoWarpper: {
    padding: 10,
  },
  textDescription: {
    paddingTop: 10,
    fontSize: 15,
    fontFamily: "SourceSans-Regular",
    color: "black",
  },
  avata: {
    // resizeMode: "contain",
    height: 60,
    width: 60,
    borderRadius: 60,
  },
  userName: {
    color: colors.black,
    fontSize: 18,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  userInfo: {
    height: 60,
    flexDirection: "column",
    padding: 5,
  },
  userRating: {
    flexDirection: "row",
  },
  dateFeedback: {
    fontSize: 15,
    fontFamily: "SourceSans-Regular",
    color: "#767676",
  },
  feedbackWrapper: {
    paddingBottom: 10,
    paddingTop: 10,
  },
});

export default HotelDetails;
