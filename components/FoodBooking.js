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
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPPickerSelect from "react-native-picker-select";
import AntDesign from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import AuthContext from "../store/context";
import DateTimePickerModal from "react-native-modal-datetime-picker";

AntDesign.loadFont();
const Listpeople = Array.from({ length: 10 }, (_, i) => i + 1);
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const FoodBooking = ({ route, navigation }) => {
  const { item } = route.params;
  const [date, setDate] = useState(new Date());
  const authContext = React.useContext(AuthContext);

  const [selectedValue, setSelectedValue] = useState(1);

  //Phí đặt bàn
  const fee = item.fee;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatepicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const createBill = async () => {
    console.log(item._id);
    let returnn = null;
    try {
      const data = {
        service: "restaurant",
        restaurant: item._id,
        total: fee,
        name: item.name,
        chairs: selectedValue,
        checkIn: date,
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
      navigation.navigate("RestaurantBill", {
        item: item,
        name: item.location,
        date,
        fee,
        selectedValue,
      });
    } else alert("Đăng nhập lại để đặt bàn");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.tableContainer}>
          <Image
            source={{ uri: item.imageCover }}
            style={styles.imageRestaurant}
          ></Image>
          <View style={styles.restaurantOverViewWrapper}>
            <Text style={styles.restaurantTitle}>{item.name}</Text>
            <Text style={styles.restaurantDetails}>{item.address}</Text>
            <Text style={styles.restaurantDetails}>
              Chuyên món: {item.type}
            </Text>
          </View>
        </View>

        <View style={styles.bookingContainer}>
          <Text style={styles.bookingTitle}>Thông tin đặt bàn</Text>

          <Text style={styles.dateTitle}>Ngày đến</Text>
          <View style={styles.dateText}>
            <Text>{date.toLocaleDateString()}</Text>
            <TouchableOpacity onPress={showDatepicker}>
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
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <View style={styles.peopleSelect}>
            <Text style={styles.dateTitle}>Số người</Text>
          </View>
          <View style={styles.peopleSelect}>
            <View style={styles.picker}>
              <RNPPickerSelect
                style={{
                  inputIOS: {
                    fontSize: 16,
                    paddingTop: 13,
                    // paddingHorizontal: 10,
                    paddingBottom: 12,
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 4,
                    backgroundColor: "white",
                    color: "black",
                  },
                  inputAndroid: {
                    backgroundColor: colors.yelow,
                    borderRadius: 5,
                    width: width,
                  },
                }}
                value={selectedValue}
                onValueChange={(value) => setSelectedValue(value)}
                style={{
                  inputAndroid: {
                    marginLeft: 20,
                    marginTop: 10,
                    width: 100,
                    color: "#87BB73",
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
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => onPressBookButton()}
          >
            <LinearGradient
              colors={["#3FA344", "#8DCA70"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              style={styles.signIn}
            >
              <Text style={styles.buttonText}>Đặt bàn</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* {show && (
          <DateTimePicker
            locale
            style={styles.dateTimeStyle}
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            minimumDate={new Date()}
          />
        )} */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDDDDD",
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
    marginTop: 12,
    // width: width * 0.4,
    fontSize: 20,
    fontFamily: "SourceSans-SemiBold",
    color: "black",
  },
  dateText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  tableContainer: {
    width: "100%",
    flexDirection: "row",
    padding: width * 0.072,
    backgroundColor: "white",
  },
  imageRestaurant: {
    width: width * 0.36,
    height: 130,
    resizeMode: "stretch",
    borderRadius: 10,
  },
  restaurantOverViewWrapper: {
    width: width * 0.496,
    marginVertical: 16,
  },
  restaurantTitle: {
    marginLeft: 12,
    fontSize: 24,
    fontFamily: "SourceSans-SemiBold",
    color: "black",
  },
  restaurantDetails: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: "SourceSans-Regular",
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
  peopleSelect: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    marginLeft: 16,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
  },
  signIn: {
    marginTop: 20,
    marginBottom: 10,
    width: width * 0.6,
    height: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
});

export default FoodBooking;
