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

const CartVehicle = (props) => {
  const item = props.item;
  const navigation = props.navigation;
  const authContext = React.useContext(AuthContext);
  const [isBillLoading, setBillLoading] = useState(true);
  const [isVehicleLoading, setVehicleLoading] = useState(false);
  const [billData, setBillData] = useState([]);

  const getAPI = async () => {
    setBillLoading(true);
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

    const data2 = [];
    data.forEach(async (element) => {
      setVehicleLoading(true);
      const responseVehicle = await fetch(
        "https://pbl6-travelapp.herokuapp.com/detailVehicle/" +
          element.detailVehicle
      );
      const dataVehicle = await responseVehicle.json();
      // console.log("log")

      data2.push(dataVehicle);
      const billVehicle = data.map((element, index) => {
        return {
          ...element,
          vehicleBillData: data2[index],
        };
      });
      setBillData(billVehicle);
      setVehicleLoading(false);
    });
    setBillLoading(false);
  };

  const deleteAPI = async (item) => {
    console.log("-------------------------");
    console.log(
      "https://pbl6-travelapp.herokuapp.com/bill/" +
        authContext.userId +
        "/" +
        item.id
    );
    console.log("-------------------------");

    fetch(
      "https://pbl6-travelapp.herokuapp.com/bill/" +
        authContext.userId +
        "/" +
        item.id,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.userToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      });

    console.log("HUY 2");
    getAPI();
  };

  useEffect(() => {
    getAPI();
  }, []);

  const onPressBookButton = (item) => {
    navigation.navigate("VehicleBill", {
      item: item.vehicleBillData,
      dateIn: item.checkIn,
      dateOut: item.checkOut,
      price: item.total,
      billid: item.id,
    });
  };

  const renderVehicleItem = ({ item }) => {
    // console.log(2)
    return (
      <TouchableOpacity>
        <View style={styles.itemContainer}>
          <View style={styles.infoBill}>
            {item?.vehicleBillData?.idSelfVehicle?.name && (
              <Image
                source={{ uri: item?.vehicleBillData?.imageCover }}
                style={styles.imageStyle}
              ></Image>
            )}
            <View style={styles.infoRoom}>
              {item?.vehicleBillData?.idSelfVehicle?.name && (
                <Text style={styles.itemTitle}>
                  {item?.vehicleBillData?.idSelfVehicle?.name}
                </Text>
              )}

              {item?.vehicleBillData?.type && (
                <Text style={styles.idService}>
                  Loại hình: {item?.vehicleBillData?.type}
                </Text>
              )}
              <Text style={styles.idService}>
                Ngày đến: {item.checkIn.substring(0, 10)}
              </Text>
              <View style={styles.rowView}>
                <Text style={styles.idService}>Tổng tiền: </Text>
                <Text style={styles.priceText}>{item.total} $</Text>
              </View>
              <Text style={styles.status}>Chưa thanh toán</Text>
            </View>
          </View>

          <View style={styles.datePrice}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                onPressBookButton(item);
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
              onPress={() => deleteAPI(item)}
            >
              <LinearGradient
                colors={["#3FA344", "#8DCA70"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={styles.signIn}
              >
                <Text style={[styles.buttonText, { color: "#fff" }]}>Hủy</Text>
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
        {isBillLoading || isVehicleLoading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <FlatList
              data={billData.filter(
                (item) => !item.status && item.service == "selfVehicle"
              )}
              renderItem={renderVehicleItem}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            />
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
    paddingHorizontal: 8,
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

export default CartVehicle;
