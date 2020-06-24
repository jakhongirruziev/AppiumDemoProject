import { ImageIcon, Touchable } from "delever/lib/components";
import { Border, Text as Txt } from "delever/lib/components/commonStyles";
import { ITouchableProps } from "delever/lib/components/Touchable";
import * as React from "react";
import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { Colors } from "../constants";

interface PanelProps extends ITouchableProps {
  style?: ViewStyle;
  title: string;
  value?: string | number;
  iconColor?: string;
  iconName?: string;
  iconSource?: ImageSourcePropType;
  iconValue?: string;
  renderValue?(): React.ReactChild;
  hasBorder?: boolean;
  boldTitle?: boolean;
  boldValue?: boolean;
  textSize?: number;
  isSelected?: boolean;
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 16
  },
  selected: { backgroundColor: Colors.blue },
  selectedText: {
    color: "#eee",
    flex: 1,
    fontSize: 16
  },
  selectedValue: {
    color: "#eee",
    fontSize: 16,
    textAlign: "right"
  },
  title: {
    color: "#000",
    flex: 1,
    fontSize: 16
  },
  value: {
    color: Colors.darkGrey,
    fontSize: 16,
    textAlign: "right"
  },
  wrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    width: "100%"
  }
});

export function Panel(props: PanelProps) {
  const {
    style,
    title,
    value,
    iconColor,
    iconName,
    iconSource,
    iconValue,
    renderValue,
    hasBorder = true,
    boldTitle = true,
    boldValue,
    textSize,
    isSelected: selected,
    ...rest
  } = props;
  return (
    <Touchable {...rest}>
      <View
        style={StyleSheet.flatten([
          styles.wrapper,
          StyleSheet.flatten(style),
          hasBorder ? Border.bottom : undefined,
          selected ? styles.selected : undefined
        ])}
        {...rest}
      >
        {iconName ? (
          <Icon
            name={iconName}
            size={26}
            style={StyleSheet.flatten([styles.icon, { color: iconColor }])}
          />
        ) : null}
        {iconSource ? (
          <ImageIcon source={iconSource} size={26} style={styles.icon} />
        ) : null}
        <Text
          style={StyleSheet.flatten([
            styles.title,
            textSize ? { fontSize: textSize } : undefined,
            boldTitle ? Txt.bold : undefined,
            selected ? styles.selectedText : undefined
          ])}
        >
          {title}
        </Text>
        {iconValue || value ? (
          iconValue ? (
            <Icon name={iconValue} size={26} style={styles.icon} />
          ) : (
            <Text
              style={StyleSheet.flatten([
                styles.value,
                textSize ? { fontSize: textSize } : undefined,
                boldValue ? Txt.bold : undefined,
                selected ? styles.selectedValue : undefined
              ])}
            >
              {value}
            </Text>
          )
        ) : (
          (renderValue && renderValue()) || null
        )}
      </View>
    </Touchable>
  );
}
