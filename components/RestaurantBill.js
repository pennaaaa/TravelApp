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
  Image,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import colors from "../assets/color/colors";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { ScrollView } from "react-native-gesture-handler";
import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";
import AuthContext from "../store/context";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

AntDesign.loadFont();
Feather.loadFont();

const RestaurantBill = ({ route, navigation }) => {
  const authContext = React.useContext(AuthContext);
  const { item, date, fee, selectedValue } = route.params;
  const [dateIn, setDayIn] = useState(new Date(date));
  const router = useRoute();
  const [showGateway, setShowGateway] = useState(false);
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState("#000");
  async function onMessage(e) {
    let data = e.nativeEvent.data;
    setShowGateway(false);
    console.log(data);
    let payment = JSON.parse(data);
    if (payment.status === "COMPLETED") {
      try {
        const data = {
          status: true,
        };
        Promise.all(
          await fetch(
            "https://pbl6-travelapp.herokuapp.com/bill/" +
              authContext.userId +
              "/" +
              billid,
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
              console.log(responseJson);
              Alert.alert("Th??ng b??o", "Thanh to??n th??nh c??ng", [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("TabNavigation"),
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
    } else {
      alert("PAYMENT FAILED. PLEASE TRY AGAIN.");
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.bookingContainer}>
          <Text style={styles.bookingTitle}>Th??ng tin ?????t b??n</Text>
          <View style={styles.roomContainer}>
            <Image
              source={{ uri: item.imageCover }}
              style={styles.imageHotel}
            ></Image>
            <View style={styles.roomOverViewWrapper}>
              <Text style={styles.roomTitle}>{item.name}</Text>
              <Text style={styles.roomDetails}>{item.address}</Text>
              <Text style={styles.roomDetails}>Chuy??n m??n: {item.type}</Text>
              <Text style={styles.roomDetails}>
                Ng??y ?????n: {dateIn.toLocaleDateString()}
              </Text>
              <Text style={styles.roomDetails}>S??? ng?????i: {selectedValue}</Text>
            </View>
          </View>
        </View>
        <View style={styles.priceDetailContainer}>
          <Text style={styles.bookingTitle}>H??a ????n thanh to??n</Text>

          <View style={styles.datePrice}>
            <Text style={styles.priceSubTitle}>Ph?? ?????t b??n</Text>
            <Text style={styles.subPrice}>{fee} ??</Text>
          </View>
          <View style={styles.datePrice}>
            <Text style={styles.dateTitle}>T???ng ti???n(VND)</Text>
            <Text style={styles.resultDatePrice}>{fee} ??</Text>
          </View>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => setShowGateway(true)}
          >
            <LinearGradient
              colors={["#3FA344", "#8DCA70"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              style={styles.signIn}
            >
              <Text style={[styles.buttonText, { color: "#fff" }]}>
                Thanh to??n
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      {showGateway ? (
        <Modal
          visible={showGateway}
          onDismiss={() => setShowGateway(false)}
          onRequestClose={() => setShowGateway(false)}
          animationType={"fade"}
          transparent
        >
          <View style={styles.webViewCon}>
            <View style={styles.wbHead}>
              <TouchableOpacity
                style={{ padding: 13 }}
                onPress={() => setShowGateway(false)}
              >
                <Feather name={"x"} size={24} />
              </TouchableOpacity>
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#00457C",
                }}
              >
                PayPal GateWay
              </Text>
              <View style={{ padding: 13, opacity: prog ? 1 : 0 }}>
                <ActivityIndicator size={24} color={progClr} />
              </View>
            </View>
            <WebView
              source={{
                uri:
                  "https://paypal-tu.herokuapp.com/payment/" + fee.toString(),
              }}
              style={{ flex: 1 }}
              onLoadStart={() => {
                setProg(true);
                setProgClr("#000");
              }}
              onLoadProgress={() => {
                setProg(true);
                setProgClr("#00457C");
              }}
              onLoadEnd={() => {
                setProg(false);
              }}
              onLoad={() => {
                setProg(false);
              }}
              onMessage={onMessage}
            />
          </View>
        </Modal>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDDDDD",
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
    marginTop: 12,
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
    flexDirection: "column",
    paddingHorizontal: width * 0.072,
    paddingVertical: width * 0.036,
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
  },
  changeDate: {
    textDecorationLine: "underline",
  },

  priceDetailContainer: {
    marginTop: 10,
    flexDirection: "column",
    paddingHorizontal: width * 0.072,
    paddingVertical: width * 0.036,
    backgroundColor: "white",
  },
  datePrice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subPrice: {
    color: "#767676",
    fontSize: 18,
    fontFamily: "SourceSans-Regular",
  },
  resultDatePrice: {
    color: colors.black,
    fontSize: 20,
    fontFamily: "SourceSans-SemiBold",
  },
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
    marginTop: 16,
    fontSize: 20,
    fontFamily: "SourceSans-Regular",
    color: colors.black,
  },
  priceSubTitle1: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: "SourceSans-Regular",
    color: "#767676",
  },
});

export default RestaurantBill;
