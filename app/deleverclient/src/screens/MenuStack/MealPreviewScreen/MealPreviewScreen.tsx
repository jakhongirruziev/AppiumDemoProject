import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  Button,
  EmptyScreen,
  PanelDivider,
  Touchable,
} from 'delever/lib/components';
import React, { useCallback, useMemo, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { MealAddition, MealSize, OrderMeal } from '../../../APIDataTypes';
import { Panel } from '../../../components/Panel';
import { flex1 } from '../../../components/SharedStyles';
import { Colors, host, no_connection } from '../../../constants';
import { formatNumber } from '../../../helpers';
import L from '../../../localization';
import { MenuStackParamList } from '../../../navigation/MainTabNavigator';
import {
  SET_NEW_ORDER_MEAL,
  UPDATE_NEW_ORDER_MEAL,
} from '../../../reduxStore/actions/types';
import { AppState } from '../../../reduxStore/reducers/rootReducer';
import { previewScreenStyles } from './MealPreviewStyles';

export function MealPreviewScreen() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<MenuStackParamList, 'MealPreview'>>();
  const newOrder = useSelector((state: AppState) => state.newOrder);
  const dispatch = useDispatch();

  const defaultSize = useMemo(() => {
    if (params) {
      if (params.orderMeal) {
        return params.orderMeal.size;
      } else if (params.meal.sizes && params.meal.sizes.length) {
        return params.meal.sizes[0];
      }
      return null;
    }
    return null;
  }, [params]);

  const [selectedSize, setSelectedSize] = useState<MealSize | null>(
    defaultSize
  );
  const [selectedAdditions, setSelectedAdditions] = useState<MealAddition[]>(
    (params && params.orderMeal && params.orderMeal.additions) || []
  );

  const [count, setCount] = useState(
    (params && params.orderMeal && params.orderMeal.count) || 1
  );

  const signleItemCost = useMemo(() => {
    let total = (params && params.meal && params.meal.price) || 0;
    if (selectedSize) {
      total += selectedSize.extra_price;
    }
    if (selectedAdditions.length) {
      total += selectedAdditions.reduce(
        (prev, current) => prev + current.extra_price,
        0
      );
    }
    return total;
  }, [params, selectedSize, selectedAdditions]);

  const toggleAddition = (addition: MealAddition) => {
    const additionIndex = selectedAdditions.indexOf(addition);
    if (additionIndex < 0) {
      setSelectedAdditions([...selectedAdditions, addition]);
    } else {
      selectedAdditions.splice(additionIndex, 1);
      setSelectedAdditions([...selectedAdditions]);
    }
  };

  const issueOrder = useCallback(() => {
    if (params) {
      const newOrderMeal: OrderMeal = {
        additions: [],
        count,
        // id: params.meal.id,
        name: params.meal.name,
        price: params.meal.price,
        size: {},
        totalPrice: signleItemCost * count,
      };

      if (params.orderMeal) {
        dispatch({
          payload: {
            index: newOrder.meals.indexOf(params.orderMeal),
            newOrderMeal,
          },
          type: UPDATE_NEW_ORDER_MEAL,
        });
      } else {
        dispatch({ payload: newOrderMeal, type: SET_NEW_ORDER_MEAL });
      }

      navigation.goBack();
    }
  }, [params, count, signleItemCost, navigation, dispatch, newOrder.meals]);

  if (!(params && params.meal)) {
    return (
      <EmptyScreen illustration={no_connection} text={L.errors.went_wrong} />
    );
  }

  return (
    <View style={previewScreenStyles.container}>
      <ScrollView>
        <Image
          resizeMode="cover"
          source={{ uri: host + params.meal.image }}
          style={previewScreenStyles.previewImage}
        />
        <View style={previewScreenStyles.header}>
          <Text style={previewScreenStyles.title}>
            {`${params.meal.name} (${formatNumber(params.meal.price)} sum)`}
          </Text>
          <Text style={previewScreenStyles.description}>
            {/* {meal.description} */}
          </Text>
        </View>
        {params.meal.sizes.length ? (
          <>
            <PanelDivider label="Choose size" paddingHorizontal={15} />
            {params.meal.sizes.map(
              size =>
                size.is_available && (
                  <Panel
                    key={size.name}
                    title={size.name}
                    value={
                      size.extra_price
                        ? `+${formatNumber(size.extra_price)} sum`
                        : ''
                    }
                    iconName={
                      selectedSize === size
                        ? 'check-circle'
                        : 'radio-button-unchecked'
                    }
                    iconColor={
                      selectedSize === size ? Colors.theme : Colors.grey
                    }
                    onPress={() => setSelectedSize(size)}
                  />
                )
            )}
          </>
        ) : null}
        {params.meal.additions && params.meal.additions.length ? (
          <>
            <PanelDivider label="Additions" paddingHorizontal={15} />
            {params.meal.additions.map(
              addition =>
                addition.is_available && (
                  <Panel
                    key={addition.id}
                    title={addition.name}
                    value={
                      addition.extra_price
                        ? `+${formatNumber(addition.extra_price)} sum`
                        : ''
                    }
                    iconName={
                      selectedAdditions.indexOf(addition) > -1
                        ? 'check-box'
                        : 'check-box-outline-blank'
                    }
                    iconColor={
                      selectedAdditions.indexOf(addition) > -1
                        ? Colors.theme
                        : Colors.grey
                    }
                    onPress={() => toggleAddition(addition)}
                  />
                )
            )}
          </>
        ) : null}
        <View style={previewScreenStyles.amountSection}>
          <View style={previewScreenStyles.amountBox}>
            <Touchable onPress={() => setCount(count - 1 < 1 ? 1 : count - 1)}>
              <View style={previewScreenStyles.amountControl}>
                <Text style={previewScreenStyles.amountControlText}>-</Text>
              </View>
            </Touchable>
            <View style={previewScreenStyles.amountWrap}>
              <Text style={previewScreenStyles.amountText}>{count}</Text>
            </View>
            <Touchable onPress={() => setCount(count + 1)}>
              <View style={previewScreenStyles.amountControl}>
                <Text style={previewScreenStyles.amountControlText}>+</Text>
              </View>
            </Touchable>
          </View>
        </View>
      </ScrollView>
      <SafeAreaView>
        <Button label="submit" color={Colors.theme} onPress={issueOrder}>
          <View style={previewScreenStyles.submitButton}>
            <View style={flex1}>
              <Text style={previewScreenStyles.buttonText}>
                Issue the order ({count})
              </Text>
            </View>
            <View>
              <Text style={previewScreenStyles.buttonTextTotal}>
                {formatNumber(signleItemCost * count)} sum
              </Text>
            </View>
          </View>
        </Button>
      </SafeAreaView>
    </View>
  );
}
