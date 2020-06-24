import { StyleSheet } from 'react-native';

import { HelveticaBold, HelveticaRegular } from '../../components/SharedStyles';
import { Colors } from '../../constants';

export const styles = StyleSheet.create({
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 24,
  },
  button: {
    alignItems: 'center',
    bottom: 0,
    padding: 10,
    position: 'absolute',
    width: '100%',
  },
  call: {
    fontSize: 16,
    color: Colors.darkGrey,
    ...HelveticaBold,
  },
  contentContainer: {
    height: '100%',
    // flex: 1
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  foot: {
    alignItems: 'center',
    flex: 1,
    height: 100,
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginTop: 30,
  },
  form: {
    flexDirection: 'row',
    height: 200,
  },
  head: {
    height: 220,
    justifyContent: 'center',
    paddingHorizontal: '10%',
  },
  input: {
    alignSelf: 'center',
    width: '100%',
  },
  number: {
    fontSize: 19,
    color: Colors.darkGrey,
    ...HelveticaRegular,
  },
  slide: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  subtitle: {
    color: Colors.theme,
    fontSize: 30,
    ...HelveticaRegular,
  },
  title: {
    color: Colors.theme,
    fontSize: 60,
    textAlign: 'left',
    ...HelveticaBold,
  },
  touchableText: {
    color: Colors.inkBlue,
    fontSize: 18,
    marginLeft: 5,
    textAlign: 'center',
  },
  wrapper: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
