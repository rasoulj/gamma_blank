import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {LocationIconSet} from '~/assets/iconset';

let latitudeDelta = 0.02;
let longitudeDelta = 0.02;

const ShowLocation = ({
  Region,
  style,
  selectedRegion,
}: {
  Region: (region: any) => void;
  style?: ViewStyle;
  selectedRegion: any;
}) => {
  const [region, setRegion] = useState({
    latitude: 37,
    longitude: -122,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  });
  const map = useRef<MapView>(null);
  useEffect(() => {
    console.log(selectedRegion);

    if (selectedRegion) {
      setRegion({
        latitude: selectedRegion[0],
        longitude: selectedRegion[1],
        latitudeDelta: region?.latitudeDelta,
        longitudeDelta: region?.longitudeDelta,
      });
      map.current?.animateToRegion({
        latitude: selectedRegion[0],
        longitude: selectedRegion[1],
        latitudeDelta: region?.latitudeDelta,
        longitudeDelta: region?.longitudeDelta,
      });
    } else {
      GetCorrentLocation();
    }
  }, []);

  // useEffect(() => {
  //   console.log('123qa');

  //   setRegion({
  //     latitude: selectedRegion[1],
  //     longitude: selectedRegion[0],
  //     latitudeDelta: region?.latitudeDelta,
  //     longitudeDelta: region?.longitudeDelta,
  //   });
  //     map.current?.animateToRegion({
  //       latitude: selectedRegion[1],
  //       longitude: selectedRegion[0],
  //       latitudeDelta: region?.latitudeDelta,
  //       longitudeDelta: region?.longitudeDelta,
  //     });
  // }, [selectedRegion]);

  const GetCorrentLocation = () => {
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

  return (
    <>
      <View style={styles.container}>
        <MapView
          style={[styles.map, {...style}]}
          initialRegion={region}
          onRegionChangeComplete={reg => [
            Region(reg),
            setRegion(reg),
            console.log(reg),
          ]}
          showsMyLocationButton={true}
          showsUserLocation={true}
          ref={map}>
          <Marker
            coordinate={{
              latitude: region?.latitude,
              longitude: region?.longitude,
            }}>
            <LocationIconSet
              width={30}
              height={30}
              style={{marginBottom: 15}}
            />
          </Marker>
        </MapView>
      </View>
    </>
  );
};

export default ShowLocation;

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
