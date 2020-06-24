import { Platform, TextStyle } from 'react-native';
import { Colors } from '../constants';

export const HelveticaRegular =
  Platform.OS === 'android'
    ? {
        fontFamily: 'HelveticaRegular',
      }
    : {
        fontFamily: 'Helvetica',
      };

export const HelveticaBold: TextStyle =
  Platform.OS === 'android'
    ? {
        fontFamily: 'HelveticaBold',
        fontWeight: '400',
      }
    : {
        fontFamily: 'Helvetica',
        fontWeight: '600',
      };

export const flex1 = { flex: 1 };

export const LinkText: TextStyle = {
  fontSize: 16,
  color: Colors.inkBlue,
};
