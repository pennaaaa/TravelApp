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
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../assets/color/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPPickerSelect from "react-native-picker-select";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const VehicleDetails = ({ route, navigation }) => {
  const { item } = route.params;

  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date().toLocaleTimeString().slice(0, 5));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [selectedValue, setSelectedValue] = useState(1);
  const [note, setNote] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setHour(currentDate.toLocaleTimeString().slice(0, 5));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={item.imageBig}
          style={styles.backgroundImage}
        ></ImageBackground>
      </View>
      <Text style={styles.titleText}>Thông tin đặt chỗ</Text>

      <View style={styles.dateWrapper}>
        <Text style={styles.dateTitle}>Ngày thuê</Text>
        <View
          style={{ height: "100%", width: 1, backgroundColor: "#909090" }}
        ></View>
        <View style={styles.dateText}>
          <TouchableOpacity onPress={showDatepicker}>
            <Text>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.line}></View>

      <View style={styles.hourWrapper}>
        <Text style={styles.hourTitle}>Giờ thuê</Text>
        <View
          style={{ height: "100%", width: 1, backgroundColor: "#909090" }}
        ></View>
        <View style={styles.hourText}>
          <TouchableOpacity onPress={showTimepicker}>
            <Text>{hour}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => console.log(hour,date.toLocaleDateString())}
      >
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          locale
          style={styles.dateTimeStyle}
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
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

  descriptionTextWrapper: {
    marginTop: 10,
    marginHorizontal: 20,
    // height: height * 0.2,
  },
  titleText: {
    // fontFamily: 'Lato-Bold',
    // width:width,
    fontSize: 26,
    color: colors.black,
    // justifyContent: "center",
    // alignItems: "center",
    textAlign: "center",
  },
  address: {
    marginTop: 10,
    fontSize: 16,
    color: colors.darkgray,
    textAlign: "center",
  },
  timeAvailableWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  titleTimeAvailable: {
    fontSize: 16,
    color: colors.orange,
  },
  itemTimeAvailable: {
    fontSize: 16,
    color: colors.black,
  },
  typePriceWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  typeWrapper: {
    flexDirection: "column",
  },
  typeTitle: {
    color: colors.darkgray,
    textAlign: "center",
  },
  typeText: {
    color: colors.orange,
    textAlign: "center",
  },
  priceTitle: {
    color: colors.darkgray,
    textAlign: "center",
  },
  priceText: {
    color: colors.orange,
    textAlign: "center",
  },
  descriptionTitle: {
    fontSize: 26,
    color: colors.black,
    marginLeft: 20,
  },
  descriptionText: {
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 16,
    color: colors.darkgray,
  },
  imageMenu: {
    marginTop: 10,
    width: width * 0.9,
    marginLeft: width * 0.05,
    justifyContent: "space-between",
  },
  buttonWrapper: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 50,
    width:width*0.5,
    marginLeft:width*0.25,
    backgroundColor: colors.orange,
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
  },
  titleText: {
    fontSize: 26,
    color: colors.black,
    marginLeft: 10,
    marginTop: 10,
  },
  dateWrapper: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  datePickerStyle: {
    marginLeft: 50,
  },
  dateTitle: {
    width: width * 0.3,
    fontSize: 20,
    color: colors.orange,
    // textAlign: "center",
    marginLeft: 20,
  },
  dateText: {
    width: width * 0.3,
    fontSize: 20,
    marginLeft: 30,
  },
  hourWrapper: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  hourTitle: {
    width: width * 0.3,
    fontSize: 20,
    color: colors.orange,
    // textAlign: "center",
    marginLeft: 20,
  },
  hourText: {
    fontSize: 20,
    alignItems: "flex-end",
    marginLeft: 30,
  },
});

export default VehicleDetails;
