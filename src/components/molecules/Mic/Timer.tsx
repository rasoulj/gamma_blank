import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import Typography from '../../atoms/Typography';
import {HStack} from 'native-base';
import {deviceWidth} from '../../elemental';

const Timer = ({reset}: {reset: boolean}) => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the milliseconds
      setMilliseconds(prevMilliseconds => {
        if (prevMilliseconds === 99) {
          // Increase seconds when milliseconds reach 999
          setSeconds(prevSeconds => {
            if (prevSeconds === 59) {
              // Increase minutes when seconds reach 59
              setMinutes(prevMinutes => prevMinutes + 1);
              return 0;
            }
            return prevSeconds + 1;
          });
          return 0;
        }
        return prevMilliseconds + 1;
      });
    }, 1);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setSeconds(0);
    setMilliseconds(0);
    setMinutes(0);
  }, [reset]);

  // Format the time values to have leading zeros
  const formattedTime = `${minutes.toString().padStart(2, '0')} : ${seconds
    .toString()
    .padStart(2, '0')} : ${milliseconds.toString().padStart(2, '0')}`;

  return (
    <>
      {!reset ? (
        <Typography
          lineHeight={0}
          fontWeight={'bold'}
          style={{
            fontSize: 36,
            marginTop: 26,
            height: 42,
            width: '100%',
            alignSelf: 'center',
            paddingLeft: deviceWidth / 3.6,
          }}>
          {formattedTime}
        </Typography>
      ) : (
        <View
          style={{
            height: 42,
            width: '100%',
          }}
        />
      )}
    </>
  );
};

export default Timer;
