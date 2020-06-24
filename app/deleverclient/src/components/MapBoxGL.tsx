import MapboxGL from '@react-native-mapbox-gl/maps';
import Axios from 'axios';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import { MAPBOX_ACCESS_TOKEN } from '../config';

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);
MapboxGL.setTelemetryEnabled(false);

type PlaceType = 'address' | 'postcode' | 'place' | 'region' | 'country';

export type LongLat = [number, number];

export type BBox = [number, number, number, number];

interface FeatureContext {
  id: string;
  text: string; 
  short_code?: string;
  wikidata?: string;
}

export interface PlaceName{
  id: string;
  type: string;
  place_name: string;
  context: FeatureContext[];
}
export interface Feature {
  id: string;
  type: string;
  place_type: [PlaceType];
  relevance: number;
  properties: {
    accuracy?: string;
    wikidata?: string;
    short_code?: string;
  };
  text: string;
  place_name: string;
  center: LongLat;
  bbox?: BBox;
  geometry: {
    type: string;
    coordinates: LongLat;
  };
  address: string;
  context: FeatureContext[];
}

interface ReverseGeocodingData {
  attribution: string;
  type: string;
  query: LongLat;
  features: Feature[];
}

async function getLocationPermission() {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization();
  } else {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
  }
}

export async function getCurrentLocation() {
  await getLocationPermission();
  return new Promise(Geolocation.getCurrentPosition);
}

export function reverseGeocoding([long, lat]: LongLat) {
  return Axios.get<ReverseGeocodingData>(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json`,
    { params: { access_token: MAPBOX_ACCESS_TOKEN } }
  );
}
