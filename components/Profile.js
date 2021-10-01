import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
} from "react-native";
import colors from "../assets/color/colors";
import Feather from "react-native-vector-icons/Feather";
import { ScrollView } from "react-native-gesture-handler";

Feather.loadFont();

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Profile = () => {
  return (
    <ScrollView style={styles.headerContainer}>
      <ImageBackground
        source={require("../assets/image/backgroundUser.jpg")}
        style={{
          resizeMode: "contain",
          height: 270,
          width: "100%",
        }}
      >
        <View style={styles.userContainer}>
          <Image
            source={require("../assets/image/avata.png")}
            style={styles.avata}
          />
          <View style={{ alignSelf: "center", width: "60%" }}>
            <Text style={styles.userName}>Văn Ngọc Đạt</Text>
          </View>
        </View>
        <TouchableOpacity>
          <View style={styles.moreInfo}>
            <Text style={styles.moreInfoText}>Xem hồ sơ đầy đủ</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
      <View>
        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Đặt chỗ của tôi</Text>
          <Feather
            name="arrow-up-right"
            size={30}
            style={{ alignSelf: "center" }}
          />
        </View>
        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Tin nhắn của tôi</Text>
          <Feather
            name="arrow-up-right"
            size={30}
            style={{ alignSelf: "center" }}
          />
        </View>
        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Tùy chọn thanh toán</Text>
          <Feather
            name="arrow-up-right"
            size={30}
            style={{ alignSelf: "center" }}
          />
        </View>
        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Điều khoản sử dụng</Text>
          <Feather
            name="arrow-up-right"
            size={30}
            style={{ alignSelf: "center" }}
          />
        </View>
      </View>
      <View >
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => {
            alert("Bạn đã Đăng xuất thành công!");
          }}
        >
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default Profile;
const styles = StyleSheet.create({
  headerContainer: {
    height: 270,
  },
  userContainer: {
    flexDirection: "row",
  },
  avata: {
    resizeMode: "contain",
    height: 60,
    width: 60,
    borderRadius: 60,
    marginLeft: 15,
    marginTop: 60,
  },
  userName: {
    color: colors.black,
    fontSize: 28,
    marginTop: 60,
    alignSelf: "center",
    justifyContent: "center",
  },
  moreInfo: {
    backgroundColor: colors.white,
    height: 65,
    width: 285,
    borderRadius: 60,
    opacity: 0.5,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 40,
  },
  moreInfoText: {
    fontSize: 24,
    alignSelf: "center",
  },
  optionContainer: {
    flexDirection: "row",
    height: 100,
    width: 330,
    alignSelf: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  optionText: {
    alignSelf: "center",
    fontSize: 24,
  },
  logoutContainer: {
    justifyContent: "center",
    height: 70,
    width: 220,
    alignSelf: "center",
    backgroundColor: colors.yelow,
    borderRadius: 50,
    marginTop: 15,
  },
  logoutButton: {
    justifyContent: "center",
    alignSelf: "center",
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
    borderRadius: 15,
  },
  buttonText: {
    // fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: colors.white,
  },
});
