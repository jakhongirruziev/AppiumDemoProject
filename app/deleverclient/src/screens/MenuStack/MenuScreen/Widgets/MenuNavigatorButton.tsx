import Touchable, { ITouchableProps } from 'delever/lib/components/Touchable';
import React from 'react';
import { Animated, StyleSheet, View, Platform, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Colors } from '../../../../constants';
import { TouchableHighlight } from 'react-native-gesture-handler';

export const rotateAnimation = new Animated.Value(0);

export const rotateInterpolatedAnimation = rotateAnimation.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '90deg'],
});

export const toggleRotate = (state: boolean) => {
  Animated.timing(rotateAnimation, {
    duration: 200,
    toValue: state ? 1 : 0,
    useNativeDriver: true,
  }).start();
};

type MenuNavigatorButtonProps = {
  onPress: ITouchableProps['onPress'];
  iconName: string;
};

const styles = StyleSheet.create({
  modalMenuButton: {
    backgroundColor: '#fff',
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 60,
    borderRadius: 30,
  },
  modalMenuButtonShadow: Platform.select({
    android: {
      height: 60,
      elevation: 4,
      overflow: 'hidden',
    },
    ios: {
      zIndex: 4,
      shadowOpacity: 0.2,
      shadowRadius: 5,
      shadowColor: '#000',
      shadowOffset: { height: 5, width: 0 }
    }
  }),
  modalMenuIconWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  modalMenuIconWrapperIOS: Platform.select({
    ios: {
      marginVertical: 15,
    }
  }),
  hideTouchableEdges: {
    overflow: 'hidden',
    flex: 1,
    borderRadius: 30,
  }
});

export const MenuNavigatorButton = ({
  onPress,
  iconName,
}: MenuNavigatorButtonProps) => (
  <View
    style={StyleSheet.flatten([
      styles.modalMenuButtonShadow,
      styles.modalMenuButton,
    ])}
  >
    <View style={styles.hideTouchableEdges}>
      <Touchable onPress={onPress}>
        <View
          style={StyleSheet.flatten([
            styles.modalMenuIconWrapper,
            styles.modalMenuIconWrapperIOS,
          ])}
        >
          <Animated.View
            style={{
              transform: [{ rotate: rotateInterpolatedAnimation }],
            }}
          >
            <Icon name={iconName} size={30} color={Colors.theme} />
          </Animated.View>
        </View>
      </Touchable>
    </View>
  </View>
);
