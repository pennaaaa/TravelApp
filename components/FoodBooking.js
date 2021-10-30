import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Platform,
  Dimensions,
  TextInput,
} from "react-native";
import colors from "../assets/color/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPPickerSelect from "react-native-picker-select";

const Listpeople = Array.from({ length: 10 }, (_, i) => i + 1);
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const FoodBooking = ({ route, navigation }) => {
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
    <View style={styles.container}>
      <Text style={styles.titleText}>Thông tin đặt chỗ</Text>

      <View style={styles.dateWrapper}>
        <Text style={styles.dateTitle}>Ngày đến</Text>
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
        <Text style={styles.hourTitle}>Giờ đến</Text>
        <View
          style={{ height: "100%", width: 1, backgroundColor: "#909090" }}
        ></View>
        <View style={styles.hourText}>
          <TouchableOpacity onPress={showTimepicker}>
            <Text>{hour}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.line}></View>

      <View style={styles.peopleWrapper}>
        <Text style={styles.peopleTitle}>Số người</Text>
        <View
          style={{ height: "100%", width: 1, backgroundColor: "#909090" }}
        ></View>
        <View style={styles.peopleText}>
          {/* {Listpeople.map((element) => (
                <Picker.Item label={element} value={element} />
              ))} */}
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
              // placeholder: {
              //   colors: colors.yelow,
              // },
              inputAndroid: {
                color: colors.yelow,
                paddingHorizontal: 10,
                backgroundColor: colors.yelow,
                borderRadius: 5,
                width: width,
              },
            }}
            value={selectedValue}
            label={selectedValue.toString()}
            onValueChange={(value) => setSelectedValue(value)}
            style={{
              inputAndroid: {
                backgroundColor: "transparent",
                width: 100,
                color: colors.black,
              },
              iconContainer: {
                top: 5,
                right: 15,
              },
            }}
            items={Listpeople.map((element) => ({
              label: element.toString(),
              value: element,
              fontSize: 12,
            }))}
          />
        </View>
      </View>

      <View style={styles.note}>
        <TextInput
          style={{ margin: 5 }}
          multiline={true}
          numberOfLines={3}
          placeholder={"Điền ghi chú tại đây"}
          onChangeText={(text) => setNote({ text })}
          // value={this.state.text}
        ></TextInput>
      </View>

      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => console.log(note)}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FF",
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
  peopleWrapper: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  peopleTitle: {
    width: width * 0.3,
    fontSize: 20,
    color: colors.orange,
    // textAlign: "center",
    marginLeft: 20,
  },
  peopleText: {
    fontSize: 20,
    alignItems: "flex-end",
    marginLeft: 30,
  },
  dateTimeStyle: {
    fontSize: 30,
  },
  note: {
    margin: 20,
    // marginTop:20,
    borderWidth: 1,
    borderColor: colors.shade,
  },
  buttonWrapper: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    width: width * 0.4,
    marginLeft: width * 0.3,
    // marginTop: height*0.1,
    backgroundColor: colors.orange,
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 10,
  },
  buttonText: {
    // fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: colors.white,
  },
  line: {
    width: width,
    marginTop: 10,
    borderBottomColor: colors.shade,
    borderWidth: 0.5,
  },
});

export default FoodBooking;
