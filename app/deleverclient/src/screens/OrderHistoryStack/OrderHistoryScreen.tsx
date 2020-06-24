import Axios from 'axios';
import {
  Button,
  EmptyScreen,
  Loading,
  Touchable,
} from 'delever/lib/components';
import { OrderStatus } from 'delever/lib/constants';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import { Order } from '../../APIDataTypes';
import { OrderComponent } from '../../components/Order';
import { HelveticaBold } from '../../components/SharedStyles';
import {
  Colors,
  feedbackURL,
  no_connection,
  no_new_orders,
} from '../../constants';
import { noOperation, sortOrdersByDate } from '../../helpers';
import L from '../../localization';
import { useOrdersHistory } from '../../reduxStore/actions/actions';
import { AppState } from '../../reduxStore/reducers/rootReducer';
import { orderHistoryScreenStyles } from './OrderHistoryScreenStyles';

let refreshTimer: number;

export function OrderHistoryScreen() {
  const token = useSelector(({ auth }: AppState) => auth.token);
  const {
    orders,
    isLoading: isSyncingOrderHistory,
    error,
    refetch,
  } = useOrdersHistory({ skip: true });
  const [refreshing, setRefreshing] = useState(false); // for tracking pull-to-refresh
  const [updating, setUpdating] = useState(false); // for tracking status change
  const [isSendingFeedback, setIsSendingFeedback] = useState(false); // for tracking status change
  const [isRateModalVisible, setIsRateModalVisible] = useState(false);
  const [rateScore, setRateScore] = useState<number>();
  const [feedback, setFeedback] = useState('');
  const [newDeliveredOrderId, setNewDeliveredOrderId] = useState<number>();

  const sortedOrders = useMemo(
    () => orders.sort(sortOrdersByDate('created_at')),
    [orders]
  );
  console.log(orders.map(order => new Date(order.created_at).getDate()));
  console.log(sortedOrders.map(order => new Date(order.created_at).getDay()));

  const closeRateModal = () => {
    setNewDeliveredOrderId(undefined);
    setIsRateModalVisible(false);
    setIsSendingFeedback(false);
    setFeedback('');
    setRateScore(undefined);
  };

  // const selectOrder = (id: number, number: number, status: string) => {
  // if (viewedOrder) {
  //   if (viewedOrder.id !== id) setMyOrderDetailsAsync(id);
  // } else setMyOrderDetailsAsync(id);
  // };

  const checkForNewDeliveredOrders = (
    oldOrders: Order[],
    newOrders: Order[]
  ) => {
    newOrders.some((newOrder: Order) => {
      const oldOrderData = oldOrders.find(order => order.id === newOrder.id);
      if (
        oldOrderData &&
        oldOrderData.status !== OrderStatus.DELIVERED &&
        newOrder.status === OrderStatus.DELIVERED
      ) {
        setNewDeliveredOrderId(newOrder.id);
        return true;
      }
      return false;
    });
  };

  const startTimer = useCallback(() => {
    console.log('Start timer');
    clearInterval(refreshTimer); // it avoids collision if there is already running timer
    refreshTimer = setInterval(() => {
      setUpdating(true);
      const oldOrders = orders;

      if (!refreshing) {
        refetch().then(({ data }: { data: { results: Order[] } }) => {
          checkForNewDeliveredOrders(oldOrders, data.results);
          setUpdating(false);
        });
      }
    }, 5000);
  }, [orders, refetch, refreshing]);

  const sendFeedback = () => {
    if (newDeliveredOrderId && rateScore) {
      setIsSendingFeedback(true);
      return Axios.post(
        feedbackURL(newDeliveredOrderId),
        { feedback, rate: rateScore },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      ).finally(() => {
        closeRateModal();
      });
    }
  };

  const refresh = () => {
    setRefreshing(true);
    const oldOrders = orders;

    refetch().then(({ data }: { data: { results: Order[] } }) => {
      checkForNewDeliveredOrders(oldOrders, data.results);
      setRefreshing(false);
    });
  };

  const renderItem = ({ item: order }: { item: Order }) => (
    <OrderComponent {...order} onPress={noOperation} /> // TODO: should open a modal for cancellation
  );

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(refreshTimer);
      console.log('clear int');
    };
  }, [startTimer]);

  useEffect(() => {
    if (newDeliveredOrderId) {
      setIsRateModalVisible(true);
    }
  }, [isRateModalVisible, newDeliveredOrderId]);

  useEffect(() => {
    setRefreshing(true);
    const oldOrders = orders;

    refetch().then(({ data }: { data: { results: Order[] } }) => {
      checkForNewDeliveredOrders(oldOrders, data.results);
      setRefreshing(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSyncingOrderHistory && !refreshing && !updating) {
    return <Loading size={60} color={Colors.green} />;
  }

  if (error) {
    return (
      <FlatList
        data={[]}
        renderItem={renderItem}
        ListEmptyComponent={
          <EmptyScreen
            illustration={no_connection}
            text={L.errors.network_error}
          />
        }
        refreshing={refreshing}
        onRefresh={refresh}
      />
    );
  }

  return (
    <View style={orderHistoryScreenStyles.wrapper}>
      <Modal
        isVisible={isRateModalVisible}
        onBackdropPress={closeRateModal}
        onBackButtonPress={closeRateModal}
        onSwipeComplete={closeRateModal}
        swipeDirection="down"
        useNativeDriver={true}
        style={orderHistoryScreenStyles.modal}
      >
        <View style={orderHistoryScreenStyles.modalContent}>
          <View style={orderHistoryScreenStyles.modalHeader}>
            <Icon
              name="check-circle"
              ellipsizeMode="middle"
              size={160}
              color={Colors.green}
            />
            <Text
              style={StyleSheet.flatten([
                HelveticaBold,
                { fontSize: 20, marginTop: 10, textAlign: 'center' },
              ])}
            >
              Your order has been successfully completed
            </Text>
          </View>
          <View>
            <Text style={orderHistoryScreenStyles.modalRateText}>Rate us</Text>
            <View style={orderHistoryScreenStyles.modalRateStars}>
              {[1, 2, 3, 4, 5].map(mark => (
                <Touchable
                  key={mark}
                  opacity={true}
                  onPressIn={() => setRateScore(mark)}
                >
                  <Icon
                    name="star"
                    size={60}
                    color={
                      rateScore && mark <= rateScore
                        ? Colors.yellow
                        : Colors.grey
                    }
                  />
                </Touchable>
              ))}
            </View>
          </View>
          <View style={orderHistoryScreenStyles.modalCommentWrapper}>
            <TextInput
              value={feedback}
              onChangeText={setFeedback}
              textAlignVertical="top"
              numberOfLines={3}
              multiline={true}
              style={orderHistoryScreenStyles.modalRateComment}
            />
          </View>
          <Button
            roundedBorder={true}
            label="Send feedback"
            onPress={sendFeedback}
            loading={isSendingFeedback}
            disabled={!rateScore}
            style={orderHistoryScreenStyles.modalCommentWrapper}
            labelSize={18}
          />
        </View>
      </Modal>
      <FlatList
        data={sortedOrders || []}
        keyExtractor={(item: Order) => `${item.id}`}
        renderItem={renderItem}
        ListEmptyComponent={
          <EmptyScreen illustration={no_new_orders} text={L.common.no_orders} />
        }
        refreshing={refreshing}
        onRefresh={refresh}
      />
    </View>
  );
}
