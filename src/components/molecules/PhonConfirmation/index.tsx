import auth from '@react-native-firebase/auth';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import CountryPicker, {
  Country,
  CountryCode,
  Flag,
} from 'react-native-country-picker-modal';
import {
  ArrowButtonIcon,
  scale,
  Text,
  View,
  VStack,
} from '~/components/elemental';
import ModalConfirmation from './ModalConfirmation';
import PhoneInput from './PhoneInput';
import styles from './styles';

const PhonConfirmation = ({isShow = false}: {isShow: boolean}) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [withCountryNameButton, setWithCountryNameButton] =
    useState<boolean>(false);

  const [countryCode, setCountryCode] = useState<CountryCode>('TR');
  const [country, setCountry] = useState<Country>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);

  async function confirmCode(verificationCode) {
    setConfirmationModalVisible(false);
    setLoading(true);

    try {
      const res = await confirm?.confirm?.(verificationCode);
      if (res?.additionalUserInfo?.isNewUser) {
        // onClickCreateAccount?.();
      } else {
        // onConfirm?.(res);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  async function sendOtp(phoneNumber) {
    setLoading(true);

    auth()
      .signInWithPhoneNumber(
        (country?.callingCode?.[0] ? '+' + country?.callingCode?.[0] : '+33') +
          ' ' +
          phoneNumber,
        // '+1 224-408-0427',
      )
      .then(confirmationResult => {
        console.log(confirmationResult, confirmationResult?.verificationId);
        if (confirmationResult?.verificationId) {
          actionSheetRef.current?.hide();
          setTimeout(() => {
            setConfirmationModalVisible(true);
            setLoading(false);
          }, 700);
        } else {
          setLoading(false);
          setConfirm(confirmationResult);
        }
      })
      .catch(error => {
        console.log(error);

        setLoading(false);
      });
  }
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  useEffect(() => {
    if (!isShow) {
      actionSheetRef.current?.show();
    } else {
      actionSheetRef.current?.hide();
    }
  }, [isShow]);

  const renderFlagButton = props => {
    console.log(props, country);
    return (
      <TouchableOpacity
        style={[styles.ButtonCountry]}
        onPress={() => {
          setIsModalVisible(true);
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Flag
            countryCode={country?.cca2}
            withEmoji
            withFlagButton
            flagSize={scale(30)}
          />
          <Image style={styles.Image} />
          <Text style={styles.CountryTitleButton}>
            {country?.name || 'Select Country'}
          </Text>
        </View>

        <ArrowButtonIcon />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ActionSheet ref={actionSheetRef}>
        <VStack px="4" pt="5" space="8">
          <View
            h="1.5"
            borderRadius="full"
            bg="gray.400"
            w="35%"
            alignSelf="center"
          />
          <CountryPicker
            {...{
              countryCode,
              withCountryNameButton,
              onSelect,
            }}
            withFilter
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            renderFlagButton={renderFlagButton}
          />
          <PhoneInput {...{country, phoneNumber, setPhoneNumber}} />

          <TouchableOpacity
            onPress={() => sendOtp?.(phoneNumber)}
            style={[styles.Submit]}>
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={{color: 'white'}}>Next</Text>
            )}
          </TouchableOpacity>
        </VStack>
      </ActionSheet>
      <ModalConfirmation
        isVisible={confirmationModalVisible}
        onCloseModal={() => {
          setConfirmationModalVisible(false);
          setTimeout(() => {
            actionSheetRef.current?.show();
          }, 500);
        }}
        sendAgain={() => sendOtp(phoneNumber)}
        phoneNumber={
          (country?.callingCode?.[0]
            ? '+' + country?.callingCode?.[0]
            : '+33') +
          ' ' +
          phoneNumber
        }
        confirmCode={confirmCode}
      />
    </>
  );
};

export default PhonConfirmation;
