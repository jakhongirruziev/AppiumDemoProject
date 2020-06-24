import { StyleSheet } from 'react-native';

import { Colors } from '../../constants';

export const orderHistoryScreenStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  modal: { margin: 0 },
  modalContent: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-evenly',
    paddingBottom: '10%',
  },
  modalHeader: {
    alignItems: 'center',
  },
  modalRateText: { fontSize: 16, textAlign: 'center' },
  modalRateStars: {
    flexDirection: 'row',
    margin: 10,
    width: 300,
  },
  modalCommentWrapper: {
    width: 300,
  },
  modalRateComment: {
    borderColor: Colors.border,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 16,
    paddingVertical: 5,
    width: '100%',
  },
});
