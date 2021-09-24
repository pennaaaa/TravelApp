import React from "react";
import { StyleSheet, View, Text } from "react-native";
import moment from "moment";
import DateRangePicker from "react-native-daterange-picker";

export default class HotelCityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      displayedDate: moment(),
    };
  }

  setDates = (dates) => {
    this.setState({
      ...dates,
    });
  };

  render() {
    const { startDate, endDate, displayedDate } = this.state;
    return (
      <View style={styles.container}>
        <DateRangePicker
          onChange={this.setDates}
          endDate={endDate}
          startDate={startDate}
          displayedDate={displayedDate}
          range
        >
          <Text>Click me!</Text>

          {/* <Text>start datet : {startDate}</Text>
          <Text>{endDate}</Text> */}

        </DateRangePicker>
        <Text>
          start date :{" "}
          {this.state.startDate && this.state.startDate.format("LL")}
        </Text>
        <Text>
          end Date: {this.state.endDate && this.state.endDate.format("LL")}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 20,
  },
});
