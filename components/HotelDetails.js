import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import colors from "../assets/color/colors";
import Entypo from "react-native-vector-icons/Entypo";
import ReadMore from "react-native-read-more-text";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Rating, AirbnbRating } from "react-native-ratings";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SliderBox } from "react-native-image-slider-box";
import AuthContext from "../store/context";

FontAwesome.loadFont();
Entypo.loadFont();
Ionicons.loadFont();

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const HotelDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const [vote, setVote] = useState(null);
  const [comment, setComment] = useState(null);
  const [rating, setRating] = useState(4);
  const authContext = React.useContext(AuthContext);
  useEffect(() => {
    fetch(
      "https://pbl6-travelapp.herokuapp.com/feedback/hotel/" + item.idHotel.id
    )
      .then((response) => response.json())
      .then((responseJson) => setVote(responseJson))
      .catch((error) => console.error(error));
  }, []);
  const ratingCompleted = (rating) => {
    setRating(rating);
  };
  const onCommentButton = async () => {
    try {
      const data = {
        service: "hotel",
        comment: comment,
        vote: rating,
        idUser: authContext.userId,
        idHotel: item.idHotel.id,
      };
      Promise.all(
        await fetch(
          "https://pbl6-travelapp.herokuapp.com/feedback/hotel/" +
            item.idHotel.id,
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
          })
          .catch((error) => {
            console.error(error);
          })
      );
    } catch (e) {
      console.log(e);
    }
    setComment("");
    setRating(4);
    fetch(
      "https://pbl6-travelapp.herokuapp.com/feedback/hotel/" + item.idHotel.id
    )
      .then((response) => response.json())
      .then((responseJson) => setVote(responseJson))
      .catch((error) => console.error(error));
  };
  const renderVoteDataItem = ({ item }) => {
    console.log(item);
    return (
      <View style={styles.feedbackWrapper}>
        <View style={styles.userContainer}>
          <Image
            source={require("../assets/image/avata.png")}
            style={styles.avata}
          />
          <View style={styles.userInfo}>
            <View style={styles.userRating}>
              <Text style={styles.userName}>{item.idUser.name}</Text>
              <Rating
                type="star"
                imageSize={20}
                fractions="{0}"
                readonly
                startingValue={item.vote}
                style={{ marginLeft: 12 }}
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.textDescription}>{item.comment}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <SliderBox
            images={item.images}
            sliderBoxHeight={height * 0.4}
            dotColor="#87BB73"
            inactiveDotColor="white"
          ></SliderBox>

          <View style={styles.descriptionWrapper}>
            <View>
              <View style={styles.hotelTitle}>
                <Text style={styles.itemTitle}>{item.idHotel.name}</Text>
                <Rating
                  imageSize={20}
                  fractions="{1}"
                  readonly
                  startingValue={item.idHotel.vote}
                />
              </View>
              <Text style={styles.itemName}>
                <Entypo name="location-pin" size={20} color={"#87BB73"} />{" "}
                {item.idHotel.address}, {item.idHotel.city}
              </Text>
            </View>

            <View style={styles.infoWrapper}>
              <View style={styles.infoRoom}>
                <Text style={styles.addressText}>
                  <Entypo name="home" size={16} color={"#87BB73"} /> {"  "}{" "}
                  {item.type}
                </Text>

                <Text style={styles.addressText}>
                  <Ionicons name="person" size={16} color={"#87BB73"} />{" "}
                  {"   1 ng?????i"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              ></View>

              <View style={styles.infoRoom}>
                <Text style={styles.addressText}>
                  <FontAwesome name="bath" size={16} color={"#87BB73"} /> {"  "}{" "}
                  1 Ph??ng t???m
                </Text>
                <Text style={styles.addressText}>
                  <Ionicons name="bed" size={16} color={"#87BB73"} /> {"   "} 1
                  Gi?????ng
                </Text>
              </View>
            </View>

            <View style={styles.subInfoWarpper}>
              <Text style={styles.subTitle}>Gi???i thi???u</Text>
              <ReadMore
                numberOfLines={3}
                renderTruncatedFooter={(handlePress) => {
                  return (
                    <Text
                      style={{ color: colors.shade, marginTop: 5 }}
                      onPress={handlePress}
                    >
                      ?????c ti???p
                    </Text>
                  );
                }}
                renderRevealedFooter={(handlePress) => {
                  return (
                    <Text
                      style={{ color: colors.shade, marginTop: 5 }}
                      onPress={handlePress}
                    >
                      Thu g???n
                    </Text>
                  );
                }}
                onReady={() => {}}
              >
                <Text style={styles.textDescription}>
                  N???u b???n ??ang t??m ki???m kha??ch sa??n d??nh cho gia ????nh ??? Th??nh ph???
                  H??? Ch?? Minh, h??y th??? nghi???m Kha??ch sa??n Paragon Sa??i Go??n. Trong
                  khi ??? Kha??ch sa??n Paragon Sa??i Go??n, du k89h??ch c?? th??? kh??m ph??
                  Nha?? ha??t Tha??nh Ph???? H???? Chi?? Minh (0,3 km) v?? Ph??? ??i b??? Nguy???n Hu???
                  (0,5 km), m???t trong nh???ng ??i???m ?????n h??ng ?????u c???a Th??nh ph??? H???
                  Ch?? Minh. L?? ???ng??i nh?? xa x???,??? c??c ph??ng kha??ch sa??n cung c???p tv
                  m??n h??nh ph???ng, qu???y bar mini v?? ??i???u h??a nhi???t ?????, v?? k???t n???i
                  m???ng th???t d??? d??ng, v???i wifi mi???n ph?? s???n c??.
                </Text>
              </ReadMore>
            </View>
            <View style={styles.subInfoWarpper}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.subTitle}>????nh gi??</Text>
                <TouchableOpacity
                  style={[styles.signIn, { height: 40, width: 100 }]}
                  onPress={() => onCommentButton()}
                >
                  <LinearGradient
                    colors={["#3FA344", "#8DCA70"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.signIn, { height: 40, width: 100 }]}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        { fontSize: 16, color: "#fff" },
                      ]}
                    >
                      B??nh lu???n
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={styles.action}>
                <FontAwesome name="commenting-o" color={"green"} size={20} />
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  value={comment}
                  placeholder="Nh???p ????nh gi?? c???a b???n"
                  onChangeText={(val) => setComment(val)}
                  style={styles.textInput}
                />
                <Rating
                  imageSize={20}
                  fractions={0}
                  startingValue={rating}
                  onFinishRating={ratingCompleted}
                />
              </View>
            </View>
            <View style={styles.subInfoWarpper}>
              <Text style={styles.subTitle}>Xem ????nh gi??</Text>
              <FlatList
                data={vote}
                renderItem={renderVoteDataItem}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.roomPrice}>
          <Text style={styles.priceText}>{item.price}$</Text>
          <Text style={styles.perdayText}>/ng??y</Text>
        </View>
        <TouchableOpacity
          style={styles.signIn}
          onPress={() =>
            navigation.navigate("HotelBooking", {
              item: item,
              name: item.location,
            })
          }
        >
          <LinearGradient
            colors={["#3FA344", "#8DCA70"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={styles.signIn}
          >
            <Text style={[styles.buttonText, { color: "#fff" }]}>Ti???p t???c</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 0,
  },
  backgroundImage: {
    height: height * 0.4,
    justifyContent: "space-between",
  },
  descriptionWrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },

  buttonText: {
    fontSize: 18,
    color: colors.white,
  },

  itemTitle: {
    width: width * 0.7,
    fontSize: 24,
    fontFamily: "SourceSans-SemiBold",
    color: "black",
  },
  itemName: {
    width: width * 0.7,
    marginLeft: 10,
    fontSize: 15,
    fontFamily: "SourceSans-Regular",
    color: "#767676",
  },
  addressText: {
    fontSize: 16,
    fontFamily: "SourceSans-Regular",
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 15,
  },
  infoRoom: {
    flexDirection: "column",
    marginHorizontal: width * 0.07,
  },
  infoWrapper: {
    marginVertical: 10,
    backgroundColor: "#F7F8FB",
    padding: 5,
    flexDirection: "row",
  },
  signIn: {
    width: width * 0.36,
    height: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    padding: 10,
  },
  roomPrice: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceText: {
    fontSize: 20,
    fontFamily: "SourceSans-SemiBold",
    color: "#2EC974",
  },
  perdayText: {
    fontSize: 16,
    fontFamily: "SourceSans-Regular",
    color: "#767676",
  },
  hotelTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  subTitle: {
    fontSize: 20,
    fontFamily: "SourceSans-SemiBold",
    color: "black",
  },
  subInfoWarpper: {
    padding: 10,
  },
  textDescription: {
    paddingTop: 10,
    fontSize: 15,
    fontFamily: "SourceSans-Regular",
    color: "black",
  },
  avata: {
    // resizeMode: "contain",
    height: 40,
    width: 40,
    borderRadius: 60,
  },
  userName: {
    color: colors.black,
    fontSize: 18,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  userInfo: {
    flexDirection: "column",
    padding: 5,
  },
  userRating: {
    flexDirection: "row",
  },
  dateFeedback: {
    fontSize: 15,
    fontFamily: "SourceSans-Regular",
    color: "#767676",
  },
  feedbackWrapper: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 16,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 0.2,
    borderBottomColor: "gray",
    justifyContent: "center",
  },
});

export default HotelDetails;
