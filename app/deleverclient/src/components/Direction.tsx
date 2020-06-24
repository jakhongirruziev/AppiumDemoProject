import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Dash from "react-native-dash";

import { Colors } from "../constants";

const styles = StyleSheet.create({
  address: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    paddingLeft: 7
  },
  addresses: {
    flex: 1,
    justifyContent: "space-between"
  },
  dashes: {
    width: 1
  },
  direction: {
    alignItems: "stretch",
    flexDirection: "row"
  },
  line: {
    alignItems: "center",
    paddingTop: 6,
    width: 20
  },
  linker: {
    bottom: -10,
    flexDirection: "column",
    position: "absolute",
    top: 18,
    width: 1
  },
  point: {
    backgroundColor: Colors.green,
    borderRadius: 6,
    height: 12,
    width: 12
  }
});

export function Direction({ from, to }: { from: string; to: string }) {
  return (
    <View>
      <View style={styles.direction}>
        <View style={styles.line}>
          <View style={styles.point} />
          <Dash
            dashGap={1}
            dashLength={1}
            style={styles.linker}
            dashColor={Colors.darkGrey}
            dashThickness={2}
            dashStyle={styles.dashes}
          />
        </View>
        <Text style={styles.address}>{from}</Text>
      </View>
      <View style={styles.direction}>
        <View style={styles.line}>
          <View
            style={[
              styles.point,
              {
                backgroundColor: Colors.red
              }
            ]}
          />
        </View>
        <Text style={styles.address}>{to}</Text>
      </View>
    </View>
  );
}
