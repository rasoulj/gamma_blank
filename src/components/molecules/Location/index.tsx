import Geolocation from '@react-native-community/geolocation';
import {Container} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import MapView from 'react-native-maps';
import {
  GpsIconSet,
  LocationIconSet,
  SearchNormalIconSet,
} from '~/assets/iconset';
import {BackIcon, Button, SearchIcon, getColor} from '~/components/elemental';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

type FormValues = {
  title: any;
  details: any;
};

let latitudeDelta = 0.025;
let longitudeDelta = 0.025;

const Location = ({setLocation}: {setLocation: (region: any) => void}) => {
  const [region, setRegion] = useState({
    latitude: 37,
    longitude: -122,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  });
  const map = useRef<MapView>(null);

  useEffect(() => {
    goToCorrentLocation();
  }, []);

  const goToCorrentLocation = () => {
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      setRegion({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: latitudeDelta,
      });
      map.current?.animateToRegion({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: latitudeDelta,
      });
    });
  };
  const ChangeRegion = (region: any) => {
    setRegion(region);
  };
  const onPressItem = (name: any, location: any) => {
    console.log(location);
    setRegion({
      latitude: location?.lat,
      longitude: location?.lng,
      latitudeDelta: latitudeDelta,
      longitudeDelta: latitudeDelta,
    });
    map.current?.animateToRegion({
      latitude: location?.lat,
      longitude: location?.lng,
      latitudeDelta: latitudeDelta,
      longitudeDelta: latitudeDelta,
    });
  };

  return (
    <>
      <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
        <View
          style={{
            width: '95%',
            height: 100,
            zIndex: 2,
            marginTop: 30,
          }}>
          <GooglePlacesAutocomplete
            placeholder="Search "
            styles={{
              container: {
                width: '100%',
                alignItems: 'center',
              },
              powered: {
                display: 'none',
              },
              listView: {
                borderRadius: 10,
                marginTop: 1,
              },
              textInputContainer: {
                backgroundColor: '#fff',

                borderWidth: 1,
                borderColor: '#fff',
                borderRadius: 10,
                paddingHorizontal: 5,
                paddingTop: 5,
                alignItems: 'center',
                zIndex: 2,
              },

              textInput: {
                justifyContent: 'center',
              },
            }}
            renderLeftButton={() => {
              return (
                <BackIcon
                  size={'24'}
                  style={{marginHorizontal: 6, marginTop: -4}}
                />
              );
            }}
            fetchDetails={true}
            GooglePlacesDetailsQuery={{
              fields: 'geometry',
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              // onPressItem(data)
              console.log(data);

              onPressItem(data?.description, details?.geometry?.location);
            }}
            query={{
              key: 'AIzaSyAMvjNZS6Ph4xm5GgVjTldo7vyY_Y-E8qE',
              language: 'en',
            }}
          />
        </View>
        <MapView
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={ChangeRegion}
          showsMyLocationButton={true}
          showsUserLocation={true}
          ref={map}
        />
        <View
          style={{
            position: 'absolute',
            top: '45%',
            left: '45%',
          }}>
          <LocationIconSet width={30} height={30} />
        </View>

        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 80,
            right: 10,
            backgroundColor: getColor({color: 'primary.500'}),
            padding: 10,
            borderRadius: 100,
          }}
          onPress={() => goToCorrentLocation()}>
          <GpsIconSet color={getColor({color: 'background.500'})} />
        </TouchableOpacity>
        <Button
          style={{width: '100%', position: 'absolute', bottom: 16, height: 49}}
          onPress={() => setLocation(region)}>
          Set selected location
        </Button>
      </View>
    </>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
