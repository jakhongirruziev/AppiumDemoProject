import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Axios from 'axios';
import {
  Button,
  DialogBox,
  FoodPanel,
  ImageIcon,
  Input,
  Panel,
  PanelDivider,
  Touchable,
} from 'delever/lib/components';
import React, { useMemo, useState } from 'react';
import { TouchableOpacity, Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Location, OrderMeal, PaymentType } from '../../../APIDataTypes';
import { Panel as CustomPanel } from '../../../components/Panel';
import { flex1, LinkText } from '../../../components/SharedStyles';
import {
  CashIcon,
  Colors,
  createOrderURL,
  PaymeIcon,
} from '../../../constants';
import {
  capitalize,
  DELIVERY_PRICE,
  displayMealName,
  formatNumber,
  noOperation,
} from '../../../helpers';
import L from '../../../localization';
import {
  ADD_ORDER_TO_HISTORY,
  RESET_NEW_ORDER_STATE,
} from '../../../reduxStore/actions/types';
import { AppState } from '../../../reduxStore/reducers/rootReducer';
import { previewScreenStyles } from '../MealPreviewScreen/MealPreviewStyles';
import { addOrderScreenStyles } from './AddOrderScreenStyles';

type CreateOrderStatus = {
  isModalVisible: boolean;
  isPosting: boolean;
  error?: string;
};
type Address = {
  Address: { address: string };
};

enum DeliveryTime {
  Quick = 'quick',
  WillPickUpMyself = 'will_pick_up_myself', // TODO: need to settle the names
}

export function AddOrderScreen() {
  const navigation = useNavigation();

  const { params } = useRoute<RouteProp<Address, 'Address'>>();
  
  const { menuData, newOrder, token } = useSelector((state: AppState) => ({
    menuData: state.menu.data,
    newOrder: state.newOrder,
    token: state.auth.token,
  }));
  const dispatch = useDispatch();

  const [createOrderStatus, setCreateOrderStatus] = useState<CreateOrderStatus>(
    {
      isModalVisible: false,
      isPosting: false,
    }
  );
  const [dialogStatus, setDialogStatus] = useState({
    isSettingPaymentType: false,
    isVisible: false,
  });
  const [deliveryTime, setDeliveryTime] = useState(DeliveryTime.Quick);
  const [paymentType, setPaymentType] = useState<PaymentType>();
  const [comment, setComment] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [referencePlace, setReferencePlace] = useState('');
  // setDeliveryAddress(params.address);
  const totalOrderPrice = useMemo(
    () => newOrder.meals.reduce((acc, meal) => acc + meal.totalPrice, 0),
    [newOrder]
  );

  const editMeal = (item: OrderMeal) => {
    const menuMeal = menuData.actual.find(meal => meal.id === item.id);
    navigation.navigate('MealPreview', { meal: menuMeal, orderMeal: item });
  };

  const sendNewOrder = () => {
    
    if (params.address && paymentType) {
      const orderDetails = {
        comments: comment,
        location: {
          address: params.address || deliveryAddress,
          coordinates: {
            x: 45,
            y: 45,
          },
          reference_place: referencePlace,
        } as Location,
        meals: newOrder.meals,
        payment: paymentType,
      };
      console.log(orderDetails);
      console.log(createOrderURL);
      setCreateOrderStatus({ isModalVisible: true, isPosting: true });
      Axios.post(createOrderURL, orderDetails, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then(({ data }) => {
          dispatch({ payload: data, type: ADD_ORDER_TO_HISTORY });
          setCreateOrderStatus({ isModalVisible: true, isPosting: false });
        })
        .catch(error => {
          console.log(error);
          setCreateOrderStatus({
            error: error.message,
            isModalVisible: true,
            isPosting: false,
          });
        });
    } else {
      Alert.alert(
        'Warning',
        'Please fill out both delivery location and payment method fields'
      );
    }
  };

  const handleAfterCreateOrder = () => {
    setCreateOrderStatus({
      error: '',
      isModalVisible: false,
      isPosting: false,
    });
    if (!createOrderStatus.error) {
      dispatch({ type: RESET_NEW_ORDER_STATE });
      navigation.navigate('Menu');
    }
  };

  return (
    <View style={addOrderScreenStyles.wrapper}>
      <DialogBox
        title="New order"
        waiting={createOrderStatus.isPosting}
        waitText="Sending data"
        message={createOrderStatus.error || 'Order created successfully'}
        submitText="Ok"
        onSubmit={handleAfterCreateOrder}
        isVisible={createOrderStatus.isModalVisible}
        onBackdropPress={noOperation}
      />
      <DialogBox
        title={
          dialogStatus.isSettingPaymentType
            ? L.details_screen.payment_type
            : L.details_screen.delivered_address
        }
        isVisible={dialogStatus.isVisible}
        onBackdropPress={() =>
          setDialogStatus({ ...dialogStatus, isVisible: false })
        }
      >
        {dialogStatus.isSettingPaymentType ? (
          <View>
            <Touchable
              onPress={() => {
                setPaymentType(PaymentType.Cash);
                setDialogStatus({
                  ...dialogStatus,
                  isVisible: false,
                });
              }}
            >
              <View style={addOrderScreenStyles.cashOption}>
                <Text style={addOrderScreenStyles.paymentOptionText}>
                  {L.common.Cash}
                </Text>
                <ImageIcon source={CashIcon} size={25} />
              </View>
            </Touchable>
            <Touchable
              onPress={() => {
                setPaymentType(PaymentType.Card);
                setDialogStatus({
                  ...dialogStatus,
                  isVisible: false,
                });
              }}
            >
              <View style={addOrderScreenStyles.cardOption}>
                <Text style={addOrderScreenStyles.paymentOptionText}>
                  {L.common.Card}
                </Text>
                <ImageIcon source={PaymeIcon} size={25} />
              </View>
            </Touchable>
          </View>
        ) : (
          <View>
            <Input
              value={deliveryAddress || params.address}
              placeholder="Address"
              onChangeText={setDeliveryAddress}
              style={addOrderScreenStyles.mb10}
            />
            <Input
              value={referencePlace}
              placeholder="Reference Place"
              onChangeText={setReferencePlace}
              style={addOrderScreenStyles.mb10}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ShowAddressOnMap');
                setDialogStatus({ ...dialogStatus, isVisible: false });
              }}
            >
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  textAlign: 'center',
                  margin: 10,
                  marginBottom: 15,
                  ...LinkText,
                }}
              >
                Show on map
              </Text>
            </TouchableOpacity>
            <Button
              label={L.common.add}
              labelSize={18}
              color={Colors.theme}
              roundedBorder={true}
              style={addOrderScreenStyles.mt10}
              labelStyle={addOrderScreenStyles.bold}
              onPress={() =>
                setDialogStatus({
                  ...dialogStatus,
                  isVisible: false,
                })
              }
            />
          </View>
        )}
      </DialogBox>
      <ScrollView>
        <PanelDivider label="Delivery time" />
        <Panel
          title="Quick"
          iconName={
            deliveryTime === DeliveryTime.Quick
              ? 'check-circle'
              : 'radio-button-unchecked'
          }
          iconColor={
            deliveryTime === DeliveryTime.Quick ? Colors.theme : Colors.grey
          }
          onPress={() => setDeliveryTime(DeliveryTime.Quick)}
        />
        <Panel
          title="I will pick myself"
          iconName={
            deliveryTime === DeliveryTime.WillPickUpMyself
              ? 'check-circle'
              : 'radio-button-unchecked'
          }
          iconColor={
            deliveryTime === DeliveryTime.WillPickUpMyself
              ? Colors.theme
              : Colors.grey
          }
          onPress={() => setDeliveryTime(DeliveryTime.WillPickUpMyself)}
        />
        <PanelDivider label={L.menu_screen.title} />
        {newOrder.meals.map((item, i) => (
          <FoodPanel
            key={i}
            style={addOrderScreenStyles.panel}
            title={displayMealName(
              item.name,
              item.count,
              item.size && item.size.name
            )}
            value={formatNumber(item.totalPrice)}
            additions={item.additions && item.additions.map(addt => addt.name)}
            onPress={() => editMeal(item)}
          />
        ))}
        <PanelDivider label={L.details_screen.delivery_address} />
        <CustomPanel
          style={addOrderScreenStyles.panel}
          hasBorder={false}
          boldTitle={false}
          iconName="location-on"
          iconColor={Colors.theme}
          title={deliveryAddress || params.address || L.details_screen.delivery_address }
          onPress={() => {
            setDialogStatus({ isSettingPaymentType:false , isVisible: true });
          }}
        />
        <PanelDivider label={L.details_screen.payment_type} />
        <CustomPanel
          style={addOrderScreenStyles.panel}
          hasBorder={false}
          boldTitle={false}
          title={capitalize(paymentType || '') || L.details_screen.payment_type}
          iconName={paymentType ? undefined : 'attach-money'}
          iconSource={
            paymentType &&
            (paymentType === PaymentType.Cash ? CashIcon : PaymeIcon)
          }
          iconColor={Colors.theme}
          onPress={() => {
            setDialogStatus({ isSettingPaymentType: true, isVisible: true });
          }}
        />
        {/* <PanelDivider label="Comments" />
        <TextInput
          value={comment}
          onChangeText={setComment}
          multiline
          placeholder="No comments"
          style={styles.commentInput}
        /> */}
        <PanelDivider label="Bill" />
        <Panel
          style={addOrderScreenStyles.panel}
          hasBorder={false}
          boldTitle={false}
          title={`${L.common.Order}:`}
          value={`${formatNumber(totalOrderPrice)} ${L.common.currency}`}
        />
        <Panel
          style={addOrderScreenStyles.panel}
          hasBorder={false}
          boldTitle={false}
          title={`${L.common.Delivery}:`}
          value={`${formatNumber(DELIVERY_PRICE)} ${L.common.currency}`}
        />
        <Panel
          style={addOrderScreenStyles.panel}
          hasBorder={false}
          boldValue={true}
          textSize={18}
          title={`${L.details_screen.Overall}:`}
          value={`${formatNumber(totalOrderPrice + DELIVERY_PRICE)} ${
            L.common.currency
          }`}
        />
      </ScrollView>
      <SafeAreaView>
        <Button label="submit" color={Colors.theme} onPress={sendNewOrder}>
          <View style={addOrderScreenStyles.submitButton}>
            <View style={flex1}>
              <Text style={previewScreenStyles.buttonText}>
                Issue the order ({newOrder.meals.length})
              </Text>
            </View>
            <View>
              <Text style={previewScreenStyles.buttonTextTotal}>
                {formatNumber(totalOrderPrice + DELIVERY_PRICE)} sum
              </Text>
            </View>
          </View>
        </Button>
      </SafeAreaView>
    </View>
  );
}
