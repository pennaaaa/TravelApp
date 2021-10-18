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
import AuthContext from "../store/context";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

MaterialIcons.loadFont();

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Profile = () => {
  const authContext = React.useContext(AuthContext);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/image/backgroundUser.jpg")}
        style={styles.imageView}
      ></ImageBackground>
      <View style={styles.view}>
        <View style={styles.profile}>
          <View
            style={{ flex: 3.5 }}
            // onPress={() => authContext.signOut()}
          >
            <Image
              source={require("../assets/image/avata.png")}
              style={styles.avatar}
            />
          </View>
          <View style={styles.infoView}>
            <Text style={styles.name}>{authContext.userName}</Text>
            <Text style={styles.phone}>{authContext.phone}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => alert("xem xem cai l")}
            >
              <LinearGradient
                colors={["#3FA344", "#8DCA70"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
              >
                <Text style={[styles.buttonText, { color: "#fff" }]}>
                  Xem thông tin
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity style={styles.support}>
            <MaterialIcons name="rate-review" size={40} color="green" />
            <Text style={styles.supportText1}>Review GoGo</Text>
            <Text style={styles.supportText2}>Đánh giá 5 sao</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.support}>
            <MaterialIcons name="support-agent" size={40} color="green" />
            <Text style={styles.supportText1}>Hỗ trợ</Text>
            <Text style={styles.supportText2}>0792755198</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.support}>
            <MaterialIcons name="library-books" size={40} color="green" />
            <Text style={styles.supportText1}>Chính sách</Text>
            <Text style={styles.supportText2}>Chính sách bảo mật</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity style={styles.support}>
            <MaterialIcons name="history" size={40} color="green" />
            <Text style={styles.supportText1}>Lịch sử</Text>
            <Text style={styles.supportText2}>Hóa đơn của bạn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.support}>
            <MaterialIcons name="search" size={40} color="green" />
            <Text style={styles.supportText1}>Đánh giá</Text>
            <Text style={styles.supportText2}>Đánh giá của bạn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.support}>
            <MaterialIcons name="favorite" size={40} color="green" />
            <Text style={styles.supportText1}>Yêu thích</Text>
            <Text style={styles.supportText2}>Khách sạn đã thích</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            { width: "80%", alignSelf: "center", padding: 12 },
          ]}
          onPress={() => authContext.signOut()}
        >
          <LinearGradient
            colors={["#3FA344", "#8DCA70"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.button,
              { width: "100%", alignSelf: "center", padding: 10 },
            ]}
          >
            <Text style={[styles.buttonText, { color: "#fff" }]}>
              Đăng xuất
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Profile;
const styles = StyleSheet.create({
  imageView: {
    flex: 2,
    resizeMode: "contain",
  },
  profile: {
    flexDirection: "row",
    backgroundColor: "white",
    // height: height * 0.2,
    padding: 15,
    width: width * 0.85,
    alignSelf: "center",
    marginTop: -70,
    borderRadius: 10,
    borderWidth: 0.1,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    flexDirection: "row",
  },
  avatar: {
    resizeMode: "contain",
    height: 100,
    width: 100,
    borderRadius: 35,
  },
  infoView: {
    flex: 6,
    paddingLeft: 10,
  },
  name: {
    fontSize: 18,
    fontFamily: "SourceSans-SemiBold",
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    fontFamily: "SourceSans-Regular",
    marginBottom: 5,
  },
  button: {
    marginTop: 5,
    width: "100%",
    // height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "SourceSans-SemiBold",
  },
  support: {
    alignItems: "center",
    marginHorizontal: 10,
    width: width * 0.3,
  },
  supportText1: {
    fontSize: 16,
    fontFamily: "SourceSans-SemiBold",
  },
  supportText2: {
    fontSize: 14,
    fontFamily: "SourceSans-Regular",
    color: "grey",
  },
  view: { flex: 7, backgroundColor: "white" },
});
