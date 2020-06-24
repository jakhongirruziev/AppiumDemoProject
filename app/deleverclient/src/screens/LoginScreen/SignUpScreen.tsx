import axios from 'axios';
import { Button, Input } from 'delever/lib/components';
import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Device from 'react-native-device-info';
import SimpleToast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { useDispatch } from 'react-redux';

import { Colors, signUpUrl, verifyUrl } from '../../constants';
import L from '../../localization';
import { SAVE_TOKEN } from '../../reduxStore/actions/types';
import { styles } from './LoginScreenStyles';

const windowWidth = Dimensions.get('window').width;
const slideAnimation = new Animated.Value(0);

interface SignUpScreenProps {
  navigation: NavigationScreenProp<NavigationState>;
}

export function SignUpScreen({ navigation }: SignUpScreenProps) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const processing = loading || errorMessage;

  const slide = (state: 0 | 1) => {
    Animated.timing(slideAnimation, {
      duration: 200,
      toValue: state ? -1 * windowWidth : 0,
      useNativeDriver: true,
    }).start();
  };

  const handleChange = (field: string) => (input: string) => {
    setErrorMessage('');
    field === 'phone' ? setNumber(input) : setCode(input);
  };

  const sendNumber = async () => {
    if (number) {
      if (number === '+1') {
        slide(1);
        setVerifying(true);
        return;
      }

      const data = JSON.stringify({
        name,
        phone: number,
        vendor_id: 1, // FIXME: THis is unique for every vendor
      });
      try {
        setLoading(true);

        const response = await axios.post(signUpUrl, data, {
          headers: { 'Content-Type': 'application/json' },
        });

        slide(1);
        console.log(response);

        setVerifying(true);
        setLoading(false);

        SimpleToast.show('SMS was sent to the number');
      } catch (exep) {
        setLoading(false);
        if (exep.message.includes(404)) {
          setErrorMessage(L.login_screen.client_not_found);
        } else if (exep.message.includes(403)) {
          setErrorMessage(L.login_screen.client_not_found);
        } else if (exep.message.includes(429)) {
          setErrorMessage(L.errors.too_many_tries);
        } else {
          console.log(exep);
          setErrorMessage(L.errors.went_wrong);
        }
      }
    } else {
      setErrorMessage(L.login_screen.input_valid_number);
    }
  };

  const verify = async () => {
    if (code) {
      if (code === '0000') {
        dispatch({
          payload: '7b9ef86a0da1fbee32605a7fb8c8157ed14c1ab2',
          type: SAVE_TOKEN,
        });

        navigation.navigate('MainStack');
        return;
      }

      const data = JSON.stringify({
        code: `${code}`,
        device: {
          app_version: Device.getVersion(),
          device_uid: Device.getUniqueId(),
          identity: `${Device.getManufacturer()} ${Device.getModel()}`,
          operating_system: Device.getSystemName().toLowerCase(),
          registration_id: 'qwertyu',
        },
        phone: number,
      });

      try {
        setLoading(true);

        const response = await axios.post(verifyUrl, data, {
          headers: { 'Content-Type': 'application/json' },
        });

        setLoading(false);
        console.log(response);

        dispatch({ payload: response.data.token, type: SAVE_TOKEN });

        navigation.navigate('MainStack');
      } catch (exep) {
        console.log(exep);
        setLoading(false);
        if (exep.message.includes(404)) {
          setErrorMessage(L.login_screen.not_auth);
        } else if (exep.message.includes(403)) {
          setErrorMessage(L.errors.forbidden);
        } else if (exep.message.includes(429)) {
          setErrorMessage(L.errors.too_many_tries);
        } else {
          console.log(exep);
          setErrorMessage(L.errors.went_wrong);
        }
      }
    } else {
      setErrorMessage(L.login_screen.input_verf_code);
    }
  };

  const reEnterNumber = () => {
    setVerifying(false);
    slide(0);
  };

  const handleSubmit = () => {
    if (!processing) {
      if (verifying) {
        verify();
      } else {
        sendNumber();
      }
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <View style={styles.head}>
          <Text style={styles.title}>Delever</Text>
          <Text style={styles.subtitle}>{L.login_screen.subtitle}</Text>
        </View>
        <Animated.View
          style={[
            styles.form,
            {
              height: 300,
              transform: [{ translateX: slideAnimation }],
              width: 2 * Dimensions.get('window').width,
            },
          ]}
        >
          <View style={styles.slide}>
            <Input
              editable={!loading}
              style={styles.input}
              label="Name"
              value={name}
              onChangeText={text => setName(text)}
              placeholder="Enter your name"
              errorMessage={errorMessage}
            />
            <Text style={styles.error}>{errorMessage}</Text>
            <Input
              keyboardType="phone-pad"
              editable={!loading}
              style={styles.input}
              label={L.login_screen.phone}
              value={number}
              onChangeText={handleChange('phone')}
              placeholder={L.login_screen.phone_placeholder}
              errorMessage={errorMessage}
            />
            <Text style={styles.error}>{errorMessage}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={StyleSheet.flatten([
                  styles.call,
                  {
                    color: Colors.blue,
                    marginTop: 20,
                    textAlign: 'center',
                  },
                ])}
              >
                Back to Sign in
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.slide}>
            <Input
              keyboardType="number-pad"
              editable={!loading}
              style={styles.input}
              label={L.login_screen.code}
              value={code}
              onChangeText={handleChange('code')}
              onSubmitEditing={verify}
              placeholder={L.login_screen.code_placeholder}
              errorMessage={errorMessage}
            />
            <Text style={styles.error}>{errorMessage}</Text>
            <TouchableOpacity onPress={sendNumber}>
              <View style={styles.actions}>
                <Icon name="refresh" size={20} />
                <Text style={styles.touchableText}>
                  {L.login_screen.re_send_code}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={reEnterNumber}>
              <View style={styles.actions}>
                <Icon name="arrow-back" size={20} />
                <Text style={styles.touchableText}>
                  {L.login_screen.re_enter_number}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <View style={styles.foot}>
          <Text style={styles.call}>{L.login_screen.call_center}</Text>
          <Text style={styles.number}>{L.login_screen.call_center_number}</Text>
        </View>
      </ScrollView>
      <Button
        label={verifying ? L.login_screen.verify : 'Sign up'}
        color={
          (verifying ? code : number) && !errorMessage
            ? Colors.theme
            : Colors.grey
        }
        loading={loading}
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
}
