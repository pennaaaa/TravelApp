import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import colors from "../assets/color/colors";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import AuthContext from "../store/context";
import { useRoute } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

AntDesign.loadFont();
const HotelBooking = ({ route, navigation }) => {
  const { item } = route.params;
  const router = useRoute();

  const authContext = React.useContext(AuthContext);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [dateIn, setDateIn] = useState(new Date());
  const [dateOut, setDateOut] = useState(new Date());
  const pricePerDay = item.price;
  const [price, setPrice] = useState(0);
  const [dayPrice, setDayPrice] = useState(0);
  const [vat, setVat] = useState(0);
  const [totalDay, setTotalDay] = useState(0);
  const [mode, setMode] = useState("date");

  const [chosenMode, setChosenMode] = useState(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showMode = (currentMode) => {
    setDatePickerVisibility(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode("date");
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    if (chosenMode) {
      setDateIn(date);
      setTotalDay((dateOut.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

      setDayPrice(
        pricePerDay *
          ((dateOut.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
      );

      setVat(
        pricePerDay *
          ((dateOut.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)) *
          0.1
      );

      setPrice(
        (
          pricePerDay *
          ((dateOut.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)) *
          1.1
        ).toFixed()
      );

      setCheckIn(date.toLocaleDateString());
    } else {
      setDateOut(date);
      setTotalDay(
        ((date.getTime() - dateIn.getTime()) / (1000 * 60 * 60 * 24)).toFixed(0)
      );

      setDayPrice(
        (
          pricePerDay *
          ((date.getTime() - dateIn.getTime()) / (1000 * 60 * 60 * 24))
        ).toFixed(0)
      );

      setVat(
        (
          pricePerDay *
          ((date.getTime() - dateIn.getTime()) / (1000 * 60 * 60 * 24)) *
          0.1
        ).toFixed(0)
      );

      setPrice(
        (
          pricePerDay *
          ((date.getTime() - dateIn.getTime()) / (1000 * 60 * 60 * 24)) *
          1.1
        ).toFixed(0)
      );
      setCheckOut(date.toLocaleDateString());
    }
  };

  const createBill = async () => {
    let returnn = null;
    try {
      const data = {
        hotel: item.idHotel.id,
        service: "hotel",
        name: item.idHotel.name,
        additionalFee: vat,
        total: price,
        checkIn: dateIn,
        checkOut: dateOut,
        room: item._id,
        guest: authContext.userId,
        status: false,
      };
      Promise.all(
        await fetch(
          "https://pbl6-travelapp.herokuapp.com/bill/" + authContext.userId,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${authContext.userToken}`,
            },
            body: JSON.stringify(data),
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            if (responseJson.code) {
              returnn = false;
            } else returnn = responseJson.id;
          })
          .catch((error) => {
            console.error(error);
          })
      );
    } catch (e) {
      console.log(e);
    }
    return returnn;
  };

  const onPressBookButton = async () => {
    billid = await createBill();
    console.log(billid);
    if (billid) {
      navigation.navigate("BookingBill", {
        item: item,
        checkIn,
        checkOut,
        price,
      });
    } else alert("Đăng nhập lại để đặt phòng");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.roomContainer}>
          <Image
            source={{ uri: item.idHotel.images[0] }}
            style={styles.imageHotel}
          ></Image>
          <View style={styles.roomOverViewWrapper}>
            <Text style={styles.roomTitle}>{item.idHotel.name}</Text>
            <Text style={styles.roomDetails}>
              {item.idHotel.address}, {item.idHotel.city}
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
            <TouchableOpacity
              onPress={() => {
                setChosenMode(true);
                showDatePicker();
              }}
            >
              <AntDesign
                name="calendar"
                size={24}
                color={"#87BB73"}
              ></AntDesign>
            </TouchableOpacity>
          </View>
          <Text style={styles.dateTitle}>Ngày đi</Text>
          <View style={styles.dateText}>
            <Text>{dateOut.toLocaleDateString()}</Text>
            <TouchableOpacity
              onPress={() => {
                setChosenMode(false);
                showDatePicker();
              }}
            >
              <AntDesign
                name="calendar"
                size={24}
                color={"#87BB73"}
              ></AntDesign>
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            minimumDate={new Date()}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        <View style={styles.priceDetailContainer}>
          <Text style={styles.bookingTitle}>Chi tiết thanh toán</Text>
          <View style={styles.datePrice}>
            <Text style={styles.priceSubTitle1}>
              {item.price}đ x {totalDay} ngày
            </Text>
            <Text style={styles.resultDatePrice}>{dayPrice} $</Text>
          </View>
          <View style={styles.datePrice}>
            <Text style={styles.priceSubTitle}>VAT(10%)</Text>
            <Text style={styles.resultDatePrice}>{vat} $</Text>
          </View>
          <View style={styles.datePrice}>
            <Text style={styles.dateTitle}>Tổng tiền(VND)</Text>
            <Text style={styles.resultDatePrice}>{price} $</Text>
          </View>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              onPressBookButton(item);
            }}
          >
            <LinearGradient
              colors={["#3FA344", "#8DCA70"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              style={styles.signIn}
            >
              <Text style={[styles.buttonText, { color: "#fff" }]}>
                Đặt phòng
              </Text>
            </LinearGradient>
          </TouchableOpacity>
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
  webViewCon: {
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wbHead: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    zIndex: 25,
    elevation: 2,
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
    width: width * 0.6,
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
