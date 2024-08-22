import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {Alert} from 'react-native';
import ViewShot, {ViewShotProperties} from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {
  ArrowBackIcon,
  Button,
  Center,
  Circle,
  Divider,
  HStack,
  isIOS,
  convertTimeSpanToTime,
  relativeTime,
  ScrollView,
  Stack,
  useToast,
  Typography,
  VStack,
  DownloadIcon,
} from '../../elemental';
import Card from '../../atoms/Card';
import Image from '../../atoms/Image';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import QRCode from 'react-native-qrcode-svg';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
interface IProps {
  title?: string;
  data: any;
  navigation?: NativeStackNavigationProp<any>;
  onOpenDrawer?: () => void;
}
export default function EventRegistrationTicket({
  title = 'Ticket',
  data,
  navigation,
  onOpenDrawer,
}: IProps) {
  const viewRef = useRef<ViewShot>();
  relativeTime(data?.event?.startTime, 'HH:MM');
  const {toast} = useToast();
  const addToCalendar = async date => {
    const config: AddCalendarEvent.CreateOptions = {
      title: data?.event?.title,
      startDate: date,
    };
    AddCalendarEvent.presentEventCreatingDialog(config)
      .then(eventInfo => {
        console.warn(JSON.stringify(eventInfo));
      })
      .catch((error: string) => {
        // handle error such as when user rejected permissions
        console.warn(error);
      });
  };
  const saveScreenshot = async () => {
    try {
      if (!viewRef) return;
      const result = await viewRef.current.capture();
      await CameraRoll.save(result, {type: 'photo'});
      Alert.alert('Screenshot saved to album');
    } catch (error) {
      Alert.alert('Failed to save screenshot');
    }
  };
  return (
    <React.Fragment>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Button
          mx={8}
          mt={4}
          style={{
            height: 52,
          }}
          _text={{
            fontWeight: 'bold',
            fontSize: 17,
          }}
          onPress={saveScreenshot}>
          Add to Wallet
        </Button>
        <ViewShot
          ref={viewRef}
          options={{format: 'png', quality: 0.9}}
          style={{}}>
          <VStack bgColor={'#B3DDD2'} mx={8} mt={4} pb={6} borderRadius={10}>
            <VStack p={4} style={{alignItems: 'center'}}>
              <QRCode
                value={data?.barcode}
                size={150}
                backgroundColor="transparent"
              />
              <Circle
                position={'absolute'}
                width={4}
                height={4}
                backgroundColor="white"
                bottom={-9}
                left={-8}
              />
              <Circle
                position={'absolute'}
                width={4}
                height={4}
                backgroundColor="white"
                bottom={-9}
                right={-8}
              />
            </VStack>
            <Divider
              backgroundColor={'transparent'}
              borderWidth={1}
              borderStyle="dashed"
              borderColor={'white'}
            />
            <VStack mt={4} px={4}>
              <Typography color={'gray.500'}>Name</Typography>
              <Typography
                style={{
                  fontSize: 20,
                  fontWeight: '500',
                  marginTop: 8,
                }}>
                {data?.event?.title}
              </Typography>
              <Typography
                style={{
                  marginTop: 16,
                }}
                color={'gray.500'}>
                Event
              </Typography>
              <Typography
                style={{
                  marginTop: 8,
                  fontWeight: '500',
                }}>
                Mike Tymoti World Tour
              </Typography>
              <HStack justifyContent={'space-between'}>
                <VStack>
                  <Typography
                    style={{
                      marginTop: 16,
                    }}
                    color={'gray.500'}>
                    Date
                  </Typography>
                  <Typography
                    style={{
                      marginTop: 8,
                      fontWeight: '500',
                    }}>
                    {relativeTime(data?.event?.createdDate, 'MM MMMM, YYYY')}
                  </Typography>
                  <Typography
                    onPress={() => addToCalendar(data?.event?.createdDate)}
                    style={{
                      marginTop: 8,
                      fontWeight: '500',
                      color: 'blue.500',
                    }}>
                    Add to calendar
                  </Typography>
                </VStack>
                <VStack>
                  <Typography
                    style={{
                      marginTop: 16,
                    }}
                    color={'gray.500'}>
                    Time
                  </Typography>
                  <Typography
                    style={{
                      marginTop: 8,
                      fontWeight: '500',
                    }}>
                    {convertTimeSpanToTime(data?.event?.startTime) +
                      ' - ' +
                      convertTimeSpanToTime(data?.event?.endTime)}
                  </Typography>
                </VStack>
              </HStack>
              <Typography
                style={{
                  marginTop: 16,
                }}
                color={'gray.500'}>
                Place
              </Typography>
              <Typography
                style={{
                  marginTop: 8,
                  fontWeight: '500',
                }}>
                {data?.event?.city}
              </Typography>
              <Typography
                style={{
                  marginTop: 8,
                  fontWeight: '500',
                  color: 'blue.500',
                }}>
                View on map
              </Typography>
            </VStack>
          </VStack>
        </ViewShot>
        <Button
          mx={8}
          mt={6}
          variant={'outline'}
          borderWidth={2}
          style={{
            height: 49,
            marginBottom: 50,
          }}
          startIcon={<DownloadIcon />}
          _text={{
            fontWeight: 'bold',
            fontSize: 17,
          }}
          onPress={saveScreenshot}>
          Download Ticket
        </Button>
      </ScrollView>
    </React.Fragment>
  );
}
