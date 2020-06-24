import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants';


export const addOrderScreenStyles = StyleSheet.create({
  textTop:{
    borderRadius: 20,
    position: 'absolute',
    top: 26,
    left: 48,
    right: 48,
    paddingVertical: 16,
    minHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  pin:{
    top:"50%",
    left:"50%",
    
    position: 'absolute',
    justifyContent: 'center', 
    alignItems: 'center',
    height: '100%',
    flexDirection: 'row',
    width: '100%',
    maxHeight:85,
    maxWidth:32,
  },
  bold: {
    fontWeight: '600',
  },
  cardOption: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  cashOption: {
    alignItems: 'center',
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 10,
  },
  commentInput: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  mb10: {
    marginBottom: 10,
  },
  mt10: {
    marginBottom: 10,
  },
  panel: {
    backgroundColor: '#fff',
  },
  paymentOptionText: {
    flex: 1,
    fontSize: 18,
  },
  statusLabel: {
    backgroundColor: Colors.theme,
    padding: 10,
  },
  statusLabelText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  submitButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
