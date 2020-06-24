import React, { useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { MenuNavigatorButton, toggleRotate } from './MenuNavigatorButton';
import {
  MenuNavigatorModal,
  MenuNavigatorModalProps,
  opacityAnimation,
  toggleFade,
  toggleTranslateY,
} from './MenuNavigatorModal';

const styles = StyleSheet.create({
  bottom0: {
    bottom: 0,
  },
  bottom50: {
    bottom: 50,
  },
  modalMenuBackground: {
    backgroundColor: 'rgba(0,0,0,.5)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

type MenuNavigatorProps = {
  categorizedData: MenuNavigatorModalProps['categorizedData'];
  isRaised: boolean;
  onPressOption(categoryIndex: number): void;
};

export const MenuNavigator = ({
  categorizedData,
  isRaised,
  onPressOption: toggleSelectedCategory,
}: MenuNavigatorProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleModalMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    toggleFade(!isMenuOpen);
    toggleTranslateY(!isMenuOpen);
    toggleRotate(!isMenuOpen);
  };

  return (
    <>
      <Animated.View
        onTouchStart={toggleModalMenu}
        pointerEvents={isMenuOpen ? 'box-only' : 'none'}
        style={{
          opacity: opacityAnimation,
          ...styles.modalMenuBackground,
        }}
      />
      <View style={isRaised ? styles.bottom50 : styles.bottom0}>
        <MenuNavigatorModal
          isVisible={isMenuOpen}
          categorizedData={categorizedData}
          onPressOption={toggleSelectedCategory}
        />
        <MenuNavigatorButton
          onPress={toggleModalMenu}
          iconName={isMenuOpen ? 'close' : 'menu'}
        />
      </View>
    </>
  );
};
