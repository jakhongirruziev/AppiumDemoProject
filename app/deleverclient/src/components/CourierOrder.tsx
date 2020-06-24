import { ImageIcon, Touchable } from "delever/lib/components";
import { Border } from "delever/lib/components/commonStyles";
import { ITouchableProps } from "delever/lib/components/Touchable";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { Order } from "../APIDataTypes";
import { CANCELED, CashIcon, Colors, DELIVERED, PaymeIcon } from "../constants";
import { getDayMonth, minutesLeft } from "../helpers";
import L from "../localization";
import { Direction } from "./Direction";

interface CourierOrderProps extends Order {
  onPress?: ITouchableProps["onPress"];
  hasBorder?: boolean;
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: Colors.grey,
    height: 1,
    width: "100%"
  },
  icons: {
    flex: 1,
    flexDirection: "row-reverse"
  },
  id: {
    color: Colors.darkGrey,
    fontWeight: "600",
    marginLeft: 7
  },
  statusBar: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  time: {
    alignItems: "center",
    flexDirection: "row",
    width: 100
  },
  wrapper: {
    padding: 14
  }
});

export function CourierOrder(props: CourierOrderProps) {
  const { hasBorder = true } = props;
  return (
    <Touchable onPress={props.onPress}>
      <View style={[styles.wrapper, hasBorder ? Border.bottom : undefined]}>
        <Direction
          from={(props.vendor.location && props.vendor.location.address) || "-"}
          to={(props.location && props.location.address) || "-"}
        />
        <View style={styles.statusBar}>
          <View style={styles.time}>
            <Icon name="access-time" size={22} />
            <Text style={styles.id}>
              {props.status === DELIVERED || props.status === CANCELED
                ? getDayMonth(props.delivered_at || props.canceled_at)
                : (minutesLeft(props.pick_up_at) || "-") + L.common.mins}
            </Text>
          </View>
          <View style={styles.time}>
            <Icon name="location-on" size={22} />
            <Text style={styles.id}>{`${props.distance || "-"} km`}</Text>
          </View>
          <View style={styles.icons}>
            <ImageIcon
              source={props.payment === "card" ? PaymeIcon : CashIcon}
              size={22}
            />
          </View>
        </View>
      </View>
    </Touchable>
  );
}
