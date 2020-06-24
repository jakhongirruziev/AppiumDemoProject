import MapboxGL from '@react-native-mapbox-gl/maps';
import { Button, Input } from 'delever/lib/components';
import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
} from 'react-navigation';


import {
  Feature,
  getCurrentLocation,
  LongLat,
  reverseGeocoding,
  PlaceName,
} from '../../../components/MapBoxGL';

import { Location } from '../../../APIDataTypes';
import icon from '../../../assets/customIcons/pin.png';
import { flex1 } from '../../../components/SharedStyles';
import { addOrderScreenStyles } from './AddOrderScreenStyles';
import { transform } from '@babel/core';

interface ShowAddressOnMapScreenProps {
  navigation: NavigationScreenProp<NavigationState>;
}

export function ShowAddressOnMapScreen({
  navigation,
}: ShowAddressOnMapScreenProps) {
  const [map, setMap] = useState<MapboxGL.MapView | null>(null);
  const [currentCoordinates, setCurrentCoordinate] = useState<LongLat>();
  const [currentAddress, setCurrentAddress] = useState<Feature>();
  const [searchedAddress, setSearchedAddress] = useState<Feature>();
  const [placeName, setPlaceName] = useState<PlaceName>();
  useEffect(() => {
    getCurrentLocation().then(({ coords }) => {
      setCurrentCoordinate([coords.longitude, coords.latitude]);
    });
  }, []);

  useEffect(() => {
    if (currentCoordinates) {
      reverseGeocoding(currentCoordinates).then(({ data }) => {
        setCurrentAddress(data.features[0]);
        setPlaceName(data.features[0]);
      });
    }
  }, [currentCoordinates]);

  useEffect(() => {
    if (searchedAddress) {
      reverseGeocoding([
        searchedAddress.geometry.coordinates[0],
        searchedAddress.geometry.coordinates[1],
      ]).then(({ data }) => {
        setPlaceName(data.features[0]); 
      });
    }
  }, [searchedAddress]);
  return (
    <View style={flex1} >
      <MapboxGL.MapView
        ref={ref => {
          if (!map && ref) {
            setMap(ref);
            console.log("set");
          }
        }}
        onRegionDidChange={setSearchedAddress}
        style={flex1}
        logoEnabled={false}
        attributionEnabled={false}
      >
        {currentAddress && (
          <Text>{`${currentAddress.text}, ${currentAddress.address}`}</Text>
        )}
        <MapboxGL.Camera
          centerCoordinate={currentCoordinates}
          animationDuration={1000}
          zoomLevel={12}
          minZoomLevel={3}
        />
        <MapboxGL.UserLocation />
      </MapboxGL.MapView>
      <Text style={addOrderScreenStyles.textTop}>{placeName?.place_name}</Text>
      <Image
        style={[
          addOrderScreenStyles.pin,
          { transform: [{ translateX: -16 }, { translateY: -105 }] },
        ]}
        source={icon}
      />
      <SafeAreaView>
        <Button
          label="Set location"
          color={Colors.theme}
          style={addOrderScreenStyles.mt10}
          labelStyle={addOrderScreenStyles.bold}
          onPress={() => {
            navigation.navigate('AddOrder', { address: placeName?.place_name });
          }}
        />
      </SafeAreaView>
    </View>
  );
}
