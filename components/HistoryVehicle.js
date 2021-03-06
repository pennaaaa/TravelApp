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

const HistoryVehicle = (props) => {
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
    const data = (await response.json()).filter(
      (item) => item.status && item.service == "selfVehicle"
    );

    const data2 = [];
    data.forEach(async (element) => {
      const responseRoom = await fetch(
        "https://pbl6-travelapp.herokuapp.com/detailVehicle/" +
          element.detailVehicle
      );
      const dataVehicle = await responseRoom.json();

      data2.push(dataVehicle);
      const billVehicle = data.map((element, index) => {
        return {
          ...element,
          vehicleBillData: data2[index],
        };
      });
      setBillData(billVehicle);
    });
    setBillLoading(false);
  };

  useEffect(() => {
    getAPI();
  }, []);
  const renderCartItem = ({ item }) => {
    return (
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
                Lo???i h??nh: {item?.vehicleBillData?.type}
              </Text>
            )}
            <Text style={styles.idService}>
              Ng??y ?????n: {item.checkIn.substring(0, 10)}
            </Text>
            <View style={styles.rowView}>
              <Text style={styles.idService}>T???ng ti???n: </Text>
              <Text style={styles.priceText}>{item.total}$</Text>
            </View>
            <Text style={styles.status}>???? thanh to??n</Text>
          </View>
        </View>
      </View>
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
              data={billData}
              renderItem={renderCartItem}
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
    fontSize: 18,
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
    fontSize: 20,
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
    color: "#3b5998",
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

export default HistoryVehicle;
