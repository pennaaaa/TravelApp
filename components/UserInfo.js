import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AuthContext from "../store/context";

MaterialIcons.loadFont();
Feather.loadFont();
FontAwesome.loadFont();
AntDesign.loadFont();

const UserInfo = ({ route, navigation }) => {
  const { item } = route.params;
  const authContext = React.useContext(AuthContext);
  const [gender, setGender] = useState(authContext.gender);
  const [phone, setPhone] = useState(authContext.phone);
  const [name, setName] = useState(authContext.userName);

  const [birth, setBirth] = useState(new Date(authContext.birth));

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatepicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setBirth(date);
    hideDatePicker();
  };
  const { update_user } = React.useContext(AuthContext);
  const updateInfo = async () => {
    const data = {
      name: name,
      birth: birth,
      gender: gender,
      phone: phone,
    };
    try {
      Promise.all(
        await fetch(
          "https://pbl6-travelapp.herokuapp.com/users/" + authContext.userId,
          {
            method: "PATCH",
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
            if (responseJson.name != null) {
              update_user(responseJson);
              Alert.alert("Thông báo", "Thay đổi thành công", [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("TabNavigation"),
                },
              ]);
            } else
              Alert.alert("Thông báo", responseJson.message, [
                {
                  text: "OK",
                },
              ]);
          })
          .catch((error) => {
            console.error(error);
          })
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/image/avata.png")}
        style={styles.avatar}
      />
      <View style={{ width: "80%", marginTop: 10 }}>
        <View style={styles.action}>
          <View style={{ width: 20 }}>
            <FontAwesome name="user-o" color={"green"} size={20} />
          </View>
          <TextInput
            placeholder="Nhập tên của bạn"
            onChangeText={(val) => setName(val)}
            style={styles.textInput}
          >
            {name}
          </TextInput>
        </View>

        <View style={styles.action}>
          <View style={{ width: 20 }}>
            <FontAwesome name="transgender" color={"green"} size={20} />
          </View>
          <Text placeholder="Chọn giới tính" style={styles.textInput}>
            {gender}
          </Text>

          <TouchableOpacity
            style={gender == 0 ? styles.buttonSelect : styles.buttonNonSelect}
            onPress={() => setGender("Male")}
          >
            <Ionicons
              name="male"
              color={"blue"}
              size={20}
              style={
                gender == 0
                  ? styles.buttonTextSelect
                  : styles.buttonTextNonSelect
              }
            ></Ionicons>
          </TouchableOpacity>

          <TouchableOpacity
            style={gender == 1 ? styles.buttonSelect : styles.buttonNonSelect}
            onPress={() => setGender("female")}
          >
            <Ionicons
              name="female"
              color={"#f44c6c"}
              size={20}
              style={
                gender == 1
                  ? styles.buttonTextSelect
                  : styles.buttonTextNonSelect
              }
            ></Ionicons>
          </TouchableOpacity>
        </View>
        <View style={styles.action}>
          <View style={{ width: 20 }}>
            <FontAwesome name="calendar-o" color={"green"} size={20} />
          </View>
          <View style={styles.textInput}>
            <TouchableOpacity onPress={showDatepicker}>
              <View>
                <Text>{birth.toLocaleDateString()}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <View style={styles.action}>
          <View style={{ width: 20 }}>
            <AntDesign name="phone" color={"green"} size={20} />
          </View>
          <TextInput
            placeholder="Nhập tên của bạn"
            onChangeText={(val) => setPhone(val)}
            style={styles.textInput}
          >
            {phone}
          </TextInput>
        </View>

        <View style={styles.action}>
          <View style={{ width: 20 }}>
            <Feather name="mail" color={"green"} size={20} />
          </View>
          <Text style={styles.textInput}>{item.userEmail}</Text>
        </View>

        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={() => updateInfo()}>
            <LinearGradient
              colors={["#3FA344", "#8DCA70"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, { color: "#fff" }]}>Cập nhật</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default UserInfo;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logo: {
    resizeMode: "contain",
    width: 250,
  },
  action: {
    flexDirection: "row",
    marginTop: 20,
    paddingBottom: 5,
    borderBottomWidth: 0.2,
    borderBottomColor: "gray",
  },
  textInput: {
    flex: 1,
    // marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  avatar: {
    resizeMode: "contain",
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});
