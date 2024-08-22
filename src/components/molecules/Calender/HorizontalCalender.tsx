import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layer from '../../atoms/Layer';
import Typography from '../../atoms/Typography';
import {deviceHeight, getColor} from '../../elemental';
import {ArrowBackIcon} from '~/assets';
import ArrowRightIcon from '~/assets/icons/ArrowRight.icon';
import {deviceWidth} from '../Auth/Signin.styles';

const HorizontalCalender = () => {
  const INITIAL_DATE = new Date();
  const [initialDate, setInitialDate] = useState(
    new Date().setHours(0, 0, 0, 0),
  );

  const getDates = date => {
    let DateList = [];
    for (let i = -3; i < 4; i++) {
      let newDate = new Date(date).setDate(new Date(date).getDate() - i);
      DateList.push(newDate);
    }
    return DateList;
  };

  return (
    <Layer>
      <Typography style={{fontWeight: '600', margin: 15}}>
        Choose date
      </Typography>
      <Layer
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() =>
            setInitialDate(
              new Date(initialDate).setDate(
                new Date(initialDate).getDate() - 1,
              ),
            )
          }
          style={{marginHorizontal: 20}}>
          <ArrowBackIcon
            type="icon"
            parent="Header"
            name="ArrowRightIcon"
            color={getColor({color: 'primary.400'})}
            onPress={() =>
              setInitialDate(
                new Date(initialDate).setDate(
                  new Date(initialDate).getDate() - 1,
                ),
              )
            }
          />
        </TouchableOpacity>
        <Typography style={{alignSelf: 'center', margin: 5}}>
          {new Date(initialDate).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </Typography>

        <TouchableOpacity
          onPress={() =>
            setInitialDate(
              new Date(initialDate).setDate(
                new Date(initialDate).getDate() + 1,
              ),
            )
          }
          style={{marginHorizontal: 20, transform: [{rotate: '180deg'}]}}>
          <ArrowBackIcon
            type="icon"
            parent="Header"
            name="ArrowRightIcon"
            color={getColor({color: 'primary.400'})}
            onPress={() =>
              setInitialDate(
                new Date(initialDate).setDate(
                  new Date(initialDate).getDate() - 1,
                ),
              )
            }
          />
        </TouchableOpacity>
      </Layer>
      <Layer
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: 15, //check
        }}>
        {getDates(initialDate)
          .reverse()
          .map(item => {
            return (
              <TouchableOpacity onPress={() => setInitialDate(item)}>
                <Layer
                  style={{
                    width: deviceWidth / 8,
                    height: deviceHeight / 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      item === initialDate
                        ? getColor({color: 'primary.400'})
                        : '#fff',
                    margin: item === initialDate ? 10 : 5,
                    borderRadius: 8,
                  }}>
                  <Typography
                    style={{
                      color:
                        item === initialDate
                          ? '#fff'
                          : getColor({color: 'background.700'}),
                      fontWeight: '400',
                    }}>
                    {new Date(item).toLocaleDateString('en-US', {
                      weekday: 'short',
                    })}
                  </Typography>
                  <Typography
                    style={{
                      color: item === initialDate ? '#fff' : '#222',
                      marginTop: 5,
                    }}>
                    {new Date(item).toLocaleDateString('en-US', {
                      day: '2-digit',
                    })}
                  </Typography>
                </Layer>
              </TouchableOpacity>
            );
          })}
      </Layer>
    </Layer>
  );
};

export default HorizontalCalender;

const styles = StyleSheet.create({});
