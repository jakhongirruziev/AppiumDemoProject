import Button, { IButtonProps } from 'delever/lib/components/Button';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { flex1 } from '../../../../components/SharedStyles';
import { Colors } from '../../../../constants';
import { formatNumber } from '../../../../helpers';
import { previewScreenStyles } from '../../MealPreviewScreen/MealPreviewStyles';

type IssueOrderButtonProps = {
  onPress: IButtonProps['onPress'];
  orderMealsCount: number;
  totalOrderPrice: number;
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5
  }
});

export const IssueOrderButton = ({
  onPress,
  orderMealsCount,
  totalOrderPrice,
}: IssueOrderButtonProps) => (
  <Button label="submit" color={Colors.theme} onPress={onPress}>
    <View style={styles.wrapper}>
      <View style={flex1}>
        <Text style={previewScreenStyles.buttonText}>
          Issue the order ({orderMealsCount})
        </Text>
      </View>
      <View>
        <Text style={previewScreenStyles.buttonTextTotal}>
          {formatNumber(totalOrderPrice)} sum
        </Text>
      </View>
    </View>
  </Button>
);
