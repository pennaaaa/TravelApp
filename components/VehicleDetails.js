import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../assets/color/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import AntDesign from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

AntDesign.loadFont();

const VehicleDetails = ({ route, navigation }) => {
  const { item } = route.params;

  const [dateIn, setDateIn] = useState(new Date());
  const [dateOut, setDateOut] = useState(new Date());
  const [price, setPrice] = useState(0);
  const [mode, setMode] = useState("date");
  const [showIn, setShowIn] = useState(false);
  const [showOut, setShowOut] = useState(false);
  const [hourIn, setHourIn] = useState(
    new Date().toLocaleTimeString().slice(0, 5)
  );
  const [hourOut, setHourOut] = useState(
    new Date().toLocaleTimeString().slice(0, 5)
  );

  const [selectedValue, setSelectedValue] = useState(1);

  const onChangeIn = (event, selectedDate) => {
    const currentDate = selectedDate || dateIn;
    setShowIn(Platform.OS === "ios");
    setDateIn(currentDate);
    setHourIn(currentDate.toLocaleTimeString().slice(0, 5));
  };

  const onChangeOut = (event, selectedDate) => {
    const currentDate = selectedDate || dateOut;
    setShowOut(Platform.OS === "ios");
    setDateOut(currentDate);
    setHourOut(currentDate.toLocaleTimeString().slice(0, 5));
    calPrice();
  };

  const calPrice = () => {
    // console.log(dateIn.getDate())
    console.log(dateOut.getDate())
    setPrice(
      50000 *
        ((dateOut.getDate() - dateIn.getDate()) * 24)
    );
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
    showModeIn("date");
  };

  const showTimepickerIn = () => {
    showModeIn("time");
  };

  const showDatepickerOut = () => {
    showModeOut("date");
  };

  const showTimepickerOut = () => {
    showModeOut("time");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoWrapper}>
        <Image source={item.imageBig} style={styles.backgroundImage}></Image>
        <Text style={styles.vehicleTitle}>{item.title}</Text>
        <Text style={styles.vehicleAddress}>{item.address}</Text>
      </View>
      <View style={styles.detailWrapper}>
        <Text style={styles.bookingTitle}>Thông tin đặt xe</Text>
        <Text style={styles.dateTitle}>Nhận xe</Text>
        <View style={styles.dateText}>
          <Text>{dateIn.toLocaleDateString()}</Text>
          <TouchableOpacity onPress={showDatepickerIn}>
            <AntDesign name="calendar" size={20} color={"#87BB73"}></AntDesign>
          </TouchableOpacity>
        </View>
        <View style={styles.dateText}>
          <Text>{hourIn}</Text>
          <TouchableOpacity onPress={showTimepickerIn}>
            <AntDesign
              name="clockcircleo"
              size={20}
              color={"#87BB73"}
            ></AntDesign>
          </TouchableOpacity>
        </View>
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
        <Text style={styles.dateTitle}>Trả xe</Text>
        <View style={styles.dateText}>
          <Text>{dateOut.toLocaleDateString()}</Text>
          <TouchableOpacity onPress={showDatepickerOut}>
            <AntDesign name="calendar" size={24} color={"#87BB73"}></AntDesign>
          </TouchableOpacity>
        </View>
        <View style={styles.dateText}>
          <Text>{hourOut}</Text>
          <TouchableOpacity onPress={showTimepickerOut}>
            <AntDesign
              name="clockcircleo"
              size={20}
              color={"#87BB73"}
            ></AntDesign>
          </TouchableOpacity>
        </View>
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
      <View style={styles.confirmWrapper}>
        <Text style={styles.bookingTitle}>Chi tiết thanh toán</Text>
        <View style={styles.datePrice}>
          <Text style={styles.dateTitle}>Tổng tiền(VND)</Text>
          <Text style={styles.resultDatePrice}>
            {/* {item.price *
              ((dateOut.getDate() - dateIn.getDate()) * 24 +
                (dateOut.getHours() - dateIn.getHours()))} */}
            {price} đ
          </Text>
        </View>

        <TouchableOpacity
          style={styles.signIn}
          onPress={() => {
            alert("Đặt xe thành công!");
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
    marginTop: 12,
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
  infoWrapper: {
    width: "100%",
    backgroundColor: colors.white,
    padding: width * 0.05,
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
    marginTop: 12,
    fontSize: 28,
    fontFamily: "SourceSans-SemiBold",
    color: "black",
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
});

export default VehicleDetails;
