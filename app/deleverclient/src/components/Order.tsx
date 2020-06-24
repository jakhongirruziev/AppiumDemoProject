import { ImageIcon, Touchable } from "delever/lib/components";
import { ITouchableProps } from "delever/lib/components/Touchable";
import { OrderStatus } from "delever/lib/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { Order } from "../APIDataTypes";
import { CashIcon, Colors, PaymeIcon } from "../constants";
import { orderStatusTime } from "../helpers";
import L from "../localization";
import { HelveticaBold } from "./SharedStyles";

interface OrderProps extends Order {
  onPress: ITouchableProps["onPress"];
}

const styles = StyleSheet.create({
  active: {
    borderLeftColor: Colors.inkBlue,
    borderLeftWidth: 6
  },
  check: {
    fontSize: 20
  },
  divider: {
    backgroundColor: Colors.border,
    height: 1,
    width: "100%"
  },
  icons: {
    justifyContent: "center",
    width: 40
  },
  id: {
    color: Colors.darkGrey
  },
  ident: {
    flex: 2,
    flexShrink: 2
  },
  processTime: {
    textAlign: "center",
    fontSize: 16,
    width: 90,
    ...HelveticaBold
  },
  resultTime: {
    textAlign: "right",
    fontSize: 16,
    width: 60,
    ...HelveticaBold
  },
  status: {
    alignItems: "center",
    justifyContent: "center",
    width: 130
  },
  statusIcon: { flex: 1, textAlign: "right" },
  statusText: {
    textAlign: "right",
    fontSize: 16,
    ...HelveticaBold
  },
  statusWrapper: {
    alignItems: "center",
    flexDirection: "row"
  },
  wrapper: {
    alignItems: "stretch",
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    flexDirection: "row",
    padding: 14
  }
});

export function OrderComponent({
  onPress,
  meal_price,
  number,
  payment,
  status,
  created_at
}: OrderProps) {
  return (
    <Touchable onPress={onPress}>
      <View
        style={StyleSheet.flatten([
          styles.wrapper,
          status !== OrderStatus.DELIVERED && status !== OrderStatus.CANCELED
            ? styles.active
            : undefined
        ])}
      >
        <View style={styles.ident}>
          <Text
            style={styles.check}
          >{`${meal_price} ${L.common.currency}`}</Text>
          <Text style={styles.id}>{`ID: ${number}`}</Text>
        </View>
        <View style={styles.icons}>
          <ImageIcon
            source={payment === "card" ? PaymeIcon : CashIcon}
            size={25}
          />
        </View>
        <View style={styles.status}>
          {status === OrderStatus.PICKED_UP ? (
            <Text style={[styles.statusText, { color: Colors.theme }]}>
              Courier is going
            </Text>
          ) : (
            <View style={styles.statusWrapper}>
              <Icon
                name={
                  status === OrderStatus.DELIVERED
                    ? "check"
                    : status === OrderStatus.CANCELED
                    ? "close"
                    : "access-time"
                }
                size={24}
                style={styles.statusIcon}
                color={
                  status === OrderStatus.DELIVERED
                    ? Colors.green
                    : status === OrderStatus.CANCELED
                    ? Colors.red
                    : Colors.grey
                }
              />
              <Text
                style={
                  status === OrderStatus.DELIVERED ||
                  status === OrderStatus.CANCELED
                    ? styles.resultTime
                    : styles.processTime
                }
              >
                {status === OrderStatus.DELIVERED ||
                status === OrderStatus.CANCELED
                  ? // ? orderStatusTime(delivered_at || canceled_at) // TODO: Should have been decided whether to show created date or delivery/cancel date
                    orderStatusTime(created_at)
                  : status === OrderStatus.PENDING_FOOD ||
                    status === OrderStatus.PENDING_COURIER
                  ? "Waiting for courier"
                  : "Reviewing"}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Touchable>
  );
}
