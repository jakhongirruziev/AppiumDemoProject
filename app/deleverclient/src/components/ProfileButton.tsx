import { DialogBox, Panel, Touchable } from 'delever/lib/components';
import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedbackProps, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { useDispatch } from 'react-redux';

import { Colors } from '../constants';
import { RESET_STATE } from '../reduxStore/actions/types';

const styles = StyleSheet.create({
  iconWrapper: {
    padding: 5,
  },
  wrapper: {
    borderRadius: 50,
    marginRight: 5,
    overflow: 'hidden',
  },
});

type ProfileButtonProps = {
  onPress?: TouchableWithoutFeedbackProps['onPress'];
  navigation: NavigationScreenProp<NavigationState>;
};

export const ProfileButton = ({ onPress, navigation }: ProfileButtonProps) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnPress: TouchableWithoutFeedbackProps['onPress'] = e => {
    setIsModalOpen(true);
    onPress && onPress(e);
  };

  return (
    <View style={styles.wrapper}>
      <DialogBox
        title="Profile"
        isVisible={isModalOpen}
        onBackdropPress={() => setIsModalOpen(false)}
      >
        <Panel
          title="Log out"
          iconName="keyboard-backspace"
          onPress={() => {
            dispatch({ type: RESET_STATE });
            navigation.navigate('AuthLoading');
          }}
        />
      </DialogBox>
      <Touchable onPress={handleOnPress}>
        <View style={styles.iconWrapper}>
          <Icon name="account-circle" size={30} color={Colors.darkGrey} />
        </View>
      </Touchable>
    </View>
  );
};
