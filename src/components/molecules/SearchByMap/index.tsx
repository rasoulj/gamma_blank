import {
  ArrowBackIcon,
  isIOS,
  LoadIndicator,
  LocationIconSet,
  useDebounce,
  useNavigate,
  print,
} from '../../elemental';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  UserLocationChangeEvent,
} from 'react-native-maps';

import Input from '../../atoms/Input';

import {useGetEvents} from './useGetEvents';
import {useGetNearByEvents} from './useGetNearByEvents';
import mapStyle from './mapStyle';
import ListSheet from './ListSheet';

interface IProps {
  showUserLocation?: boolean;
  isStatic?: boolean;
  showPlaces?: boolean;
  zipCode?: string;
}

let locationTmp = undefined;

export default function SearchByMap({
  showPlaces,
  showUserLocation,
  isStatic,
  zipCode,
}: IProps) {
  const {navigateWithName, navigation} = useNavigate();

  const [query, setQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<any>();
  const debouncedQuery = useDebounce(query, 500);
  const {events, isLoading} = useGetEvents({
    where: {event: {title: {startsWith: debouncedQuery}}},
  });

  const [userCoordinate, setUserCoordinate] = useState<
    {lat: number; long: number} | undefined
  >();

  const {nearByEvents} = useGetNearByEvents(
    userCoordinate && Object.keys(userCoordinate)?.length !== 0
      ? {
          latitude: userCoordinate.lat,
          longitude: userCoordinate.long,
          maxDistance: 5,
        }
      : {},
  );

  const mapRef = useRef<MapView>();
  const eventWithLocation: any = events.filter(
    (item: any) =>
      item?.event?.latitude !== null && item?.event?.longitude !== null,
  );

  const [defaultLocation, setDefaultLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  useEffect(() => {
    if (eventWithLocation.length > 0) {
      mapRef.current.animateToRegion(
        {
          latitude: defaultLocation?.latitude,
          longitude: defaultLocation?.longitude,
          longitudeDelta: 0.0922,
          latitudeDelta: 0.0421,
        },
        1000,
      );
    }
  }, [eventWithLocation]);

  useEffect(() => {
    setDefaultLocation({
      latitude: eventWithLocation[0]?.event?.latitude,
      longitude: eventWithLocation[0]?.event?.longitude,
    });
  }, [eventWithLocation.length]);

  const flyToUserLocation = useCallback(() => {
    mapRef.current.animateCamera({
      center: {
        latitude: userCoordinate.lat,
        longitude: userCoordinate.long,
      },
    });
  }, []);

  const onPressCard = useCallback(item => {
    setOpenBottomSheet(false);
    setTimeout(() => {
      navigateWithName('event detail', {item, hasMap: true});
    }, 500);
  }, []);

  const showDetail = useCallback(
    item => {
      const isSame = item?.event?.id === selectedLocation?.event?.id;
      print({isSame});
      if (isSame) {
        setSelectedLocation(undefined);
      } else {
        setSelectedLocation(item);
      }
    },
    [selectedLocation],
  );

  return (
    <React.Fragment>
      {isLoading && <LoadIndicator />}

      <React.Fragment>
        <Input
          position="absolute"
          top={isIOS ? 12 : 4}
          left={4}
          right={4}
          borderWidth={0}
          height={12}
          onChange={() => {}}
          placeholder="Search by location"
          fontSize={15}
          onChangeText={e => setQuery(e)}
          fontWeight={'semibold'}
          bgColor={'#fff'}
          InputLeftElement={
            <ArrowBackIcon
              color={'#BDBDBD'}
              width={14}
              height={14}
              style={{marginLeft: 16}}
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                }
              }}
            />
          }
        />
        <MapView
          style={{
            flex: 1,
            zIndex: -1,
          }}
          ref={mapRef}
          showsCompass
          customMapStyle={mapStyle}
          showsUserLocation
          onUserLocationChange={(e: UserLocationChangeEvent) => {
            setUserCoordinate({
              lat: e?.nativeEvent.coordinate.latitude,
              long: e.nativeEvent.coordinate.longitude,
            });
          }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 40.6976307,
            longitude: -74.1448315,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {eventWithLocation.map(item => (
            <Marker
              onPress={() => showDetail(item)}
              key={item?.event?.id}
              coordinate={{
                latitude: item?.event?.latitude,
                longitude: item?.event?.longitude,
              }}>
              <LocationIconSet
                color={
                  selectedLocation?.event?.id === item?.event?.id && 'red.500'
                }
              />
            </Marker>
          ))}
        </MapView>
      </React.Fragment>

      {eventWithLocation?.length !== 0 && (
        <ListSheet
          {...{
            eventWithLocation,
            userCoordinate,
            setOpenBottomSheet,
            openBottomSheet,
            onPressCard,
            showDetail,
            flyToUserLocation,
            selectedLocation,
            nearByEvents,
            debouncedQuery,
          }}
        />
      )}
    </React.Fragment>
  );
}
