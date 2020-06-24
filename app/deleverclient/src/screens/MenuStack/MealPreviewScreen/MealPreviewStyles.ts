import { StyleSheet } from 'react-native';

import { HelveticaBold } from '../../../components/SharedStyles';
import { Colors } from '../../../constants';

export const previewScreenStyles = StyleSheet.create({
  amountBox: {
    borderColor: Colors.grey,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: 180,
  },
  amountControl: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 54,
  },
  amountControlText: {
    textAlign: 'center',
    fontSize: 22,

    ...HelveticaBold,
  },
  amountSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  amountText: {
    fontSize: 26,
    paddingVertical: 8,
    textAlign: 'center',
  },
  amountWrap: {
    borderLeftColor: Colors.grey,
    borderLeftWidth: 1,
    borderRightColor: Colors.grey,
    borderRightWidth: 1,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonTextTotal: {
    fontSize: 18,
    color: '#fff',
    ...HelveticaBold,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  description: {
    color: Colors.darkGrey,
  },
  header: {
    padding: 15,
  },
  previewImage: {
    height: 240,
  },
  submitButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    ...HelveticaBold,
  },
});
