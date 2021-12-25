import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../assets/color/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { SliderBox } from "react-native-image-slider-box";
import Entypo from "react-native-vector-icons/Entypo";
import AuthContext from "../store/context";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
Entypo.loadFont();

AntDesign.loadFont();

const VehicleDetails = ({ route, navigation }) => {
  const { item } = route.params;

  const [dateIn, setDateIn] = useState(new Date());
  const [dateOut, setDateOut] = useState(new Date());
  const [price, setPrice] = useState(0);
  const authContext = React.useContext(AuthContext);
  const [selectedValue, setSelectedValue] = useState(1);
  const [mode, setMode] = useState("date");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

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
      setPrice(item.price * (dateOut.getDate() - date.getDate()));
      setCheckIn(date.toLocaleDateString());
    } else {
      setDateOut(date);
      setPrice(item.price * (date.getDate() - dateIn.getDate()));
      setCheckOut(date.toLocaleDateString());
    }
  };

  const createBill = async () => {
    console.log(dateIn + "----" + dateOut);
    let returnn = null;
    try {
      const data = {
        selfVehicle: item.idSelfVehicle._id,
        name: item.idSelfVehicle.name,
        service: "selfVehicle",
        total: price,
        checkIn: dateIn,
        checkOut: dateOut,
        detailVehicle: item._id,
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
    console.log("bill: " + billid);
    if (billid) {
      navigation.navigate("VehicleBill", {
        item: item,
        dateIn,
        dateOut,
        price,
        billid,
      });
    } else alert("Đăng nhập lại để đặt xe");
  };

  return (
    <ScrollView style={styles.container}>
      <SliderBox
        images={item.images}
        sliderBoxHeight={height * 0.4}
        dotColor="#87BB73"
        inactiveDotColor="white"
      ></SliderBox>
      <View style={styles.descriptionTextWrapper}>
        <View style={styles.vehicleTitle}>
          <Text style={styles.titleText}>{item.idSelfVehicle.name}</Text>
        </View>
        <Text style={styles.rentAddress}>
          <Entypo name="location-pin" size={20} color={"#87BB73"} />{" "}
          {item.idSelfVehicle.address}
        </Text>
      </View>
      <View style={styles.detailWrapper}>
        <Text style={styles.bookingTitle}>Thông tin đặt xe</Text>

        <View style={styles.infoVehicle}>
          <Text style={styles.typeTitle}>Loại xe:</Text>
          <Text style={styles.typeVehicle}>{item.type}</Text>
        </View>
        <Text style={styles.dateTitle}>Nhận xe:</Text>
        <View style={styles.dateText}>
          <Text>{dateIn.toLocaleDateString()}</Text>
          <TouchableOpacity
            onPress={() => {
              setChosenMode(true);
              showDatePicker();
            }}
          >
            <AntDesign name="calendar" size={20} color={"#87BB73"}></AntDesign>
          </TouchableOpacity>
        </View>
        <Text style={styles.dateTitle}>Trả xe:</Text>
        <View style={styles.dateText}>
          <Text>{dateOut.toLocaleDateString()}</Text>
          <TouchableOpacity
            onPress={() => {
              setChosenMode(false);
              showDatePicker();
            }}
          >
            <AntDesign name="calendar" size={24} color={"#87BB73"}></AntDesign>
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <View style={styles.confirmWrapper}>
        <Text style={styles.bookingTitle}>Chi tiết thanh toán</Text>
        <View style={styles.datePrice}>
          <Text style={styles.dateTitle}>Tổng tiền(VND)</Text>
          <Text style={styles.resultDatePrice}>{price >= 0 ? price : 0} $</Text>
        </View>

        <TouchableOpacity
          style={styles.signIn}
          onPress={() => {
            if (price == 0) alert("Hãy chọn ngày nhận và trả xe phù hợp");
            else onPressBookButton();
          }}
        >
          <LinearGradient
            colors={["#3FA344", "#8DCA70"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={styles.signIn}
          >
            <Text style={[styles.buttonText, { color: "#fff" }]}>Đặt xe</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDDDDD",
  },
  backgroundImage: {
    height: height * 0.4,
    width: width * 0.9,
    justifyContent: "space-between",
    alignSelf: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
  },
  dateTitle: {
    width: width * 0.4,
    fontSize: 20,
    color: colors.black,
    fontFamily: "SourceSans-SemiBold",
    color: "black",
  },
  dateText: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: width * 0.08,
    paddingLeft: width * 0.08,
  },
  detailWrapper: {
    marginTop: 10,
    flexDirection: "column",
    padding: width * 0.05,
    backgroundColor: "white",
  },
  confirmWrapper: {
    marginTop: 10,
    flexDirection: "column",
    padding: width * 0.05,
    backgroundColor: "white",
  },
  vehicleTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05,
    paddingVertical: 10,
  },
  vehicleAddress: {
    fontSize: 15,
    fontFamily: "SourceSans-Regular",
    color: "#767676",
  },
  bookingTitle: {
    fontSize: 24,
    fontFamily: "SourceSans-SemiBold",
    color: "black",
  },
  datePrice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: width * 0.08,
  },
  resultDatePrice: {
    fontSize: 20,
    fontFamily: "SourceSans-SemiBold",
    color: "#2E833E",
  },
  signIn: {
    marginTop: 30,
    marginBottom: 30,
    width: width * 0.6,
    height: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  descriptionTextWrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  rentAddress: {
    width: width * 0.7,
    marginLeft: 8,
    fontSize: 15,
    fontFamily: "SourceSans-Regular",
    color: "#767676",
    paddingBottom: width * 0.05,
  },
  titleText: {
    width: width * 0.7,
    fontSize: 24,
    fontFamily: "SourceSans-SemiBold",
    color: "black",
  },
  infoVehicle: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  typeTitle: {
    fontSize: 20,
    color: colors.black,
    fontFamily: "SourceSans-SemiBold",
    color: "black",
  },
  typeVehicle: {
    marginLeft: 20,
    fontSize: 20,
    fontFamily: "SourceSans-Regular",
    color: "#2E833E",
  },
});

export default VehicleDetails;
