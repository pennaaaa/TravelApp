import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";

const EntertainmetCityList = () => {
  const [isHotelLoading, setHotelLoading] = useState(true);
  const [hotelData, sethotelData] = useState([]);
  console.log(hotelData);

  useEffect(() => {
    fetch("https://pbl6-travelapp.herokuapp.com/hotel")
      .then((response) => response.json())
      .then((json) => sethotelData(json))
      .catch((error) => console.error(error))
      .finally(() => setHotelLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isHotelLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, color: "green", textAlign: "center" }}>
            {hotelData.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "green",
              textAlign: "center",
              paddingBottom: 10,
            }}
          >
            Articles:
          </Text>
          <FlatList
            data={hotelData}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => <Text>{item.id + ". " + item.name}</Text>}
          />
        </View>
      )}
    </View>
  );
};
export default EntertainmetCityList;
