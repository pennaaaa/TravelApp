import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import colors from "../assets/color/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import AuthContext from "../store/context";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

AntDesign.loadFont();
const HotelBooking = ({ route, navigation }) => {
  const authContext = React.useContext(AuthContext);
  const { item } = route.params;
  const [dateIn, setDateIn] = useState(new Date());
  const [dateOut, setDateOut] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showIn, setShowIn] = useState(false);
  const [showOut, setShowOut] = useState(false);

  const [selectedValue, setSelectedValue] = useState(1);

  const onChangeIn = (event, selectedDate) => {
    const currentDate = selectedDate || dateIn;
    setShowIn(Platform.OS === "ios");
    setDateIn(currentDate);
  };

  const onChangeOut = (event, selectedDate) => {
    const currentDate = selectedDate || dateOut;
    setShowOut(Platform.OS === "ios");
    setDateOut(currentDate);
  };

  const showModeIn = (currentMode) => {
    setShowIn(true);
    setMode(currentMode);
  };

  const showModeOut = (currentMode) => {
    setShowOut(true);
    setMode(currentMode);
  };

  const showDatepickerIn = () => {
    showModeIn("dateIn");
  };

  const showDatepickerOut = () => {
    showModeOut("dateOut");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.roomContainer}>
          <Image
            source={{ uri: item.imageCover }}
            style={styles.imageHotel}
          ></Image>
          <View style={styles.roomOverViewWrapper}>
            <Text style={styles.roomTitle}>{item.name}</Text>
            <Text style={styles.roomDetails}>
              {item.address}, {item.city}
            </Text>
            <Text style={styles.roomDetails}>1 Phòng ngủ, 1 Phòng tắm</Text>
            <View style={styles.ratingWrapper}>
              <AntDesign name="star" size={16} color={"#87BB73"}></AntDesign>
              <Text style={styles.roomRating}> {item.vote}</Text>
              <Text style={styles.totalFeedback}> (20)</Text>
            </View>
          </View>
        </View>

        <View style={styles.bookingContainer}>
          <Text style={styles.bookingTitle}>Thông tin đặt phòng</Text>

          <Text style={styles.dateTitle}>Ngày đến</Text>
          <View style={styles.dateText}>
            <Text>{dateIn.toLocaleDateString()}</Text>
            <TouchableOpacity onPress={showDatepickerIn}>
              <AntDesign
                name="calendar"
                size={24}
                color={"#87BB73"}
              ></AntDesign>
            </TouchableOpacity>

            {showIn && (
              <DateTimePicker
                locale
                style={styles.dateTimeStyle}
                testID="dateTimePickerIn"
                value={dateIn}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChangeIn}
                minimumDate={new Date()}
              />
            )}
          </View>
          <Text style={styles.dateTitle}>Ngày đi</Text>
          <View style={styles.dateText}>
            <Text>{dateOut.toLocaleDateString()}</Text>
            <TouchableOpacity onPress={showDatepickerOut}>
              <AntDesign
                name="calendar"
                size={24}
                color={"#87BB73"}
              ></AntDesign>
            </TouchableOpacity>

            {showOut && (
              <DateTimePicker
                locale
                style={styles.dateTimeStyle}
                testID="dateTimePickerOut"
                value={dateOut}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChangeOut}
                minimumDate={dateIn}
              />
            )}
          </View>
        </View>

        <View style={styles.priceDetailContainer}>
          <Text style={styles.bookingTitle}>Chi tiết thanh toán</Text>
          <View style={styles.datePrice}>
            <Text style={styles.priceSubTitle1}>
              500.000đ x{" "}
              {(dateOut.getTime() - dateIn.getTime()) / (1000 * 60 * 60 * 24)}{" "}
              ngày
            </Text>
            <Text style={styles.resultDatePrice}>
              {500000 *
                ((dateOut.getTime() - dateIn.getTime()) /
                  (1000 * 60 * 60 * 24))}
              đ
            </Text>
          </View>
          <View style={styles.datePrice}>
            <Text style={styles.priceSubTitle}>VAT(10%)</Text>
            <Text style={styles.resultDatePrice}>
              {500000 *
                ((dateOut.getTime() - dateIn.getTime()) /
                  (1000 * 60 * 60 * 24)) *
                0.1}
              đ
            </Text>
          </View>
          <View style={styles.datePrice}>
            <Text style={styles.dateTitle}>Tổng tiền(VND)</Text>
            <Text style={styles.resultDatePrice}>
              {(
                500000 *
                ((dateOut.getTime() - dateIn.getTime()) /
                  (1000 * 60 * 60 * 24)) *
                1.1
              ).toFixed()}
              đ
            </Text>
          </View>
          <View style={styles.datePrice}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                Alert.alert("Thành công", "Đã thêm phòng vào hàng chờ!");
                const data = {
                  service: "room",
                  additionalFee:
                    500000 *
                    ((dateOut.getTime() - dateIn.getTime()) /
                      (1000 * 60 * 60 * 24)) *
                    0.1,
                  total:
                    500000 *
                    ((dateOut.getTime() - dateIn.getTime()) /
                      (1000 * 60 * 60 * 24)) *
                    1.1,
                  checkIn: dateIn.toLocaleDateString(),
                  checkOut: dateOut.toLocaleDateString(),
                  status: false,
                  room: item.id,
                  guest: authContext.userId,
                };
                console.log(data);
              }}
            >
              <LinearGradient
                colors={["#3FA344", "#8DCA70"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={styles.signIn}
              >
                <Text style={[styles.buttonText, { color: "#fff" }]}>
                  Chọn phòng
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                alert("Dat thanh cong!");
              }}
            >
              <LinearGradient
                colors={["#3FA344", "#8DCA70"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={styles.signIn}
              >
                <Text style={[styles.buttonText, { color: "#fff" }]}>
                  Đặt phòng nhanh
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDDDDD",
  },
  dateTimeStyle: {
    fontSize: 30,
  },
  roomContainer: {
    width: "100%",
    flexDirection: "row",
    padding: width * 0.072,
    backgroundColor: "white",
  },
  imageHotel: {
    width: width * 0.36,
    height: 130,
    resizeMode: "stretch",
    borderRadius: 10,
  },
  roomOverViewWrapper: {
    width: width * 0.496,
  },
  roomTitle: {
    marginLeft: 12,
    fontSize: 24,
    fontFamily: "SourceSans-SemiBold",
    color: "black",
  },
  ratingWrapper: {
    marginLeft: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  roomDetails: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: "SourceSans-Regular",
    color: "#767676",
  },
  roomRating: {
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "SourceSans-Bold",
    color: "#437014",
  },
  totalFeedback: {
    fontSize: 18,
    fontFamily: "SourceSans-SemiBold",
    color: "#767676",
  },
  bookingContainer: {
    marginTop: 10,
    flexDirection: "column",
    padding: width * 0.072,
    backgroundColor: "white",
  },
  bookingTitle: {
    fontSize: 24,
    fontFamily: "SourceSans-SemiBold",
    color: "black",
  },
  dateTitle: {
    marginTop: 12,
    width: width * 0.4,
    fontSize: 20,
    fontFamily: "SourceSans-SemiBold",
    color: "black",
  },
  dateText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceDetailContainer: {
    marginTop: 10,
    flexDirection: "column",
    padding: width * 0.072,
    backgroundColor: "white",
  },
  datePrice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resultDatePrice: {},
  signIn: {
    marginTop: 24,
    marginBottom: 12,
    width: width * 0.4,
    height: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
  },
  priceSubTitle: {
    fontSize: 16,
    fontFamily: "SourceSans-Regular",
    color: "#767676",
  },
  priceSubTitle1: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: "SourceSans-Regular",
    color: "#767676",
  },
});

export default HotelBooking;
