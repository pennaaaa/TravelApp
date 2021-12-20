import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../assets/color/colors";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import AuthContext from "../store/context";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
FontAwesome.loadFont();
Entypo.loadFont();
Ionicons.loadFont();

const CartRestaurant = (props) => {
  const item = props.item;
  const navigation = props.navigation;
  const authContext = React.useContext(AuthContext);
  const [isBillLoading, setBillLoading] = useState(true);
  const [billData, setBillData] = useState([]);
  const [roomData, setRoomData] = useState([]);

  const getAPI = async () => {
    const response = await fetch(
      "https://pbl6-travelapp.herokuapp.com/bill/" + authContext.userId,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.userToken}`,
        },
      }
    );
    const data = await response.json();
// console.log(data)
    const data2 = [];
    const data3 = [];
    // data.forEach(async (element) => {
    //   const responseRoom = await fetch(
    //     "https://pbl6-travelapp.herokuapp.com/room/" + element.room
    //   );
    //   const dataRoom = await responseRoom.json();

    //   data2.push(dataRoom);
    //   const billRoom = data.map((element, index) => {
    //     return {
    //       ...element,
    //       roomBillData: data2[index],
    //     };
    //   });
    //   setBillData(billRoom);
    // });

    data.forEach(async (element) => {
      const responseRestaurant = await fetch(
        "https://pbl6-travelapp.herokuapp.com/restaurant/" + element.restaurant
      );
      const dataRestaurant = await responseRestaurant.json();

      data3.push(dataRestaurant);
      const billRestaurant = data.map((element, index) => {
        return {
          ...element,
          resBillData: data3[index],
        };
      });
      setBillData(billRestaurant);
    });

    setBillLoading(false);
  };

  useEffect(() => {
    getAPI();
  }, []);

  const onPressBookButton = async () => {
    billid = await createBill();
    console.log(billid);
    if (billid) {
      navigation.navigate("BookingBill", {
        item: item,
        name: item.location,
        dateIn,
        dateOut,
        totalDay,
        dayPrice,
        vat,
        price,
        billid,
      });
    } else alert("Đăng nhập lại để đặt phòng");
  };

  const renderResItem = ({ item }) => {
    // console.log(item)
    return (
      <TouchableOpacity>
          <View style={styles.itemContainer}>
            <View style={styles.infoBill}>
              {item?.resBillData?.imageCover && (
                <Image
                  source={{ uri: item?.resBillData?.imageCover }}
                  style={styles.imageStyle}
                ></Image>
              )}
              <View style={styles.infoRoom}>
                {item?.resBillData?.name && (
                  <Text style={styles.itemTitle}>
                    {item?.resBillData?.name}
                  </Text>
                )}
                {item?.resBillData?.type && (
                  <Text style={styles.idService}>
                    Loại hình: {item?.resBillData?.type}
                  </Text>
                )}
                <Text style={styles.idService}>
                  Ngày đến: {item.checkIn.substring(0, 10)}
                </Text>

                <Text style={styles.idService}>
                  Số người: {item.chairs}
                </Text>

                <View style={styles.rowView}>
                  <Text style={styles.idService}>Phí đặt chỗ: </Text>
                  <Text style={styles.priceText}>{item.total} $</Text>
                </View>
                <Text style={styles.status}>Chưa thanh toán</Text>
              </View>
            </View>

            <View style={styles.datePrice}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => {
                  onPressBookButton();
                }}
              >
                <LinearGradient
                  colors={["#3FA344", "#8DCA70"]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.signIn}
                >
                  <Text style={[styles.buttonText, { color: "#fff" }]}>
                    Thanh toán
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signIn}
                onPress={() => {
                  alert("Hủy");
                }}
              >
                <LinearGradient
                  colors={["#3FA344", "#8DCA70"]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.signIn}
                >
                  <Text style={[styles.buttonText, { color: "#fff" }]}>
                    Hủy
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.highItemWrapper}>
        {isBillLoading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <FlatList
              data={billData.filter((item) => !item.status &&item.service=="restaurant")}
              renderItem={renderResItem}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            />
            {/* {console.log(billData)} */}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: colors.white,
    marginBottom: 20,
  },
  itemContainer: {
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 10,
    width: "98%",
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoBill: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  imageStyle: {
    width: "50%",
    height: "100%",
    borderRadius: 8,
  },
  infoRoom: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 8,
  },

  serviceText: {
    fontSize: 20,
    fontFamily: "SourceSans-Regular",
    color: "black",
  },
  priceText: {
    marginTop: 4,
    fontSize: 16,
    fontFamily: "SourceSans-SemiBold",
    color: "#87BB73",
  },
  itemName: {
    width: width * 0.8,
    fontSize: 15,
    fontFamily: "SourceSans-Regular",
    color: "#767676",
  },
  highItemWrapper: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  itemTitle: {
    fontSize: 18,
    fontFamily: "SourceSans-SemiBold",
    color: "black",
  },
  idService: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: "SourceSans-Regular",
    color: "black",
  },
  status: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: "SourceSans-Regular",
    color: "#FFA660",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "SourceSans-SemiBold",
    padding: 6,
  },
  datePrice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
  },
  signIn: {
    width: width * 0.32,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 8,
  },
  payment: {
    width: width * 0.5,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 8,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CartRestaurant;
