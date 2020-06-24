import React from 'react';
import { Animated, StyleSheet, Platform } from 'react-native';

import { MenuMeal } from '../../../../APIDataTypes';
import { Panel } from '../../../../components/Panel';

const styles = StyleSheet.create({
  modalMenuWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    bottom: 100,
    elevation: 2,
    zIndex: 1,
    minWidth: 240,
    overflow: 'hidden',
    position: 'absolute',
    right: 20,
  },
});

export const opacityAnimation = new Animated.Value(0);
export const translateYAnimation = new Animated.Value(50);

export const toggleFade = (state: boolean) => {
  Animated.timing(opacityAnimation, {
    duration: 200,
    toValue: state ? 1 : 0,
    useNativeDriver: true,
  }).start();
};

export const toggleTranslateY = (state: boolean) => {
  Animated.timing(translateYAnimation, {
    duration: 100,
    toValue: state ? 0 : 50,
    useNativeDriver: true,
  }).start();
};

export type MenuNavigatorModalProps = {
  isVisible: boolean;
  onPressOption(categoryIndex: number): void;
  categorizedData: [string, MenuMeal[]][];
};

export const MenuNavigatorModal = ({
  isVisible,
  onPressOption,
  categorizedData,
}: MenuNavigatorModalProps) => (
  <Animated.View
    pointerEvents={isVisible ? 'auto' : 'none'}
    style={{
      opacity: opacityAnimation,
      transform: [{ translateY: translateYAnimation }],
      ...styles.modalMenuWrapper,
    }}
  >
    {categorizedData.map(([key, item], i) => (
      <Panel
        key={key}
        title={key}
        value={item.length}
        onPress={() => onPressOption(i)}
      />
    ))}
  </Animated.View>
);
