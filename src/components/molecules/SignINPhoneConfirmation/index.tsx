import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
  Flag,
} from 'react-native-country-picker-modal';
import Svg, {Defs, LinearGradient, Path, Stop} from 'react-native-svg';
import {ArrowButtonIcon} from '~/components/elemental';
import {scale} from '../../elemental';
import Screen from '../../atoms/Screen';
import Scrollable from '../../atoms/Scrollable';
import ModalConfirmation from './ModalConfirmation';
import PhoneInput from './PhoneInput';
import styles from './styles';

export interface ConfirmationProps {
  onConfirm: (userCredentialImpl: any) => void;
  googleProvider?: () => void;
  facebookProvider?: () => void;
  onClickCreateAccount?: () => void;
  title?: string;
  description?: string;
}

const SignINPhoneConfirmation = ({
  onConfirm,
  googleProvider,
  facebookProvider,
  onClickCreateAccount,
  title = 'Welcome to Apsy',
  description = 'We have to see again. To use your account, you should log in first',
}: ConfirmationProps) => {
  const [countryCode, setCountryCode] = useState<CountryCode>('TR');
  const [country, setCountry] = useState<Country>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);

  const [withCountryNameButton, setWithCountryNameButton] =
    useState<boolean>(false);

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
        if (confirmationResult?.verificationId) {
          setConfirmationModalVisible(true);
        }
        setConfirm(confirmationResult);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  }

  async function confirmCode(verificationCode) {
    setConfirmationModalVisible(false);
    setLoading(true);

    try {
      const res = await confirm?.confirm?.(verificationCode);
      if (res?.additionalUserInfo?.isNewUser) {
        onClickCreateAccount?.();
      } else {
        onConfirm?.(res);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };
  const renderFlagButton = props => {
    console.log(props, country);
    return (
      <TouchableOpacity
        style={[styles.ButtonCountry, {marginTop: 70}]}
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
    <Screen isLoading={loading}>
      <Scrollable
        style={{
          position: 'relative',
          paddingHorizontal: 20,
          overflow: 'visible',
          flex: 1,
        }}>
        <Text style={{alignSelf: 'center', marginTop: 10, color: 'black'}}>
          Sign In
        </Text>
        <Text
          style={{
            marginTop: 40,
            color: '#1DE9B6',
            fontSize: 25,
            fontWeight: '700',
          }}>
          {title}
        </Text>
        <Text style={{marginTop: 10, fontSize: 16, color: 'black'}}>
          {description}
        </Text>

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
          style={[styles.Submit, {marginTop: 50}]}>
          <Text style={{color: 'white'}}>Verify</Text>
        </TouchableOpacity>
        {/* <View
          style={{
            marginTop: 50,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <LeftShadow />
          <Text style={{alignSelf: 'center'}}>Or continue with</Text>
          <RightShadow />
        </View>
        {googleProvider ? (
          <TouchableOpacity
            onPress={googleProvider}
            style={[
              styles.ButtonCountry,
              {
                marginTop: 20,
                justifyContent: 'center',
                borderColor: '#1DE9B6',
                borderWidth: 2,
              },
            ]}>
            <GoogleIcon />
            <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
              Continue with Google
            </Text>
          </TouchableOpacity>
        ) : null}

        {facebookProvider ? (
          <TouchableOpacity
            onPress={facebookProvider}
            style={[
              styles.ButtonCountry,
              {
                marginTop: 20,
                justifyContent: 'center',
                borderColor: '#1DE9B6',
                borderWidth: 2,
              },
            ]}>
            <ColorfulFacebook width={20} height={20} />
            <Text
              style={{
                marginLeft: 10,
                fontWeight: 'bold',
              }}>
              Continue with Facebook
            </Text>
          </TouchableOpacity>
        ) : null} */}
      </Scrollable>
      <ModalConfirmation
        isVisible={confirmationModalVisible}
        onCloseModal={() => setConfirmationModalVisible(false)}
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
    </Screen>
  );
};

export default SignINPhoneConfirmation;

function LeftShadow(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={83}
      height={3}
      viewBox="0 0 83 3"
      {...props}>
      <Defs>
        <LinearGradient
          id="a"
          y1={1}
          x2={1.048}
          gradientUnits="objectBoundingBox">
          <Stop offset={0} stopColor="#e8e8e8" />
          <Stop offset={1} stopColor="gray" />
        </LinearGradient>
      </Defs>
      <Path data-name="Rectangle 20" fill="url(#a)" d="M0 0H83V3H0z" />
    </Svg>
  );
}
function RightShadow(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={83}
      height={3}
      viewBox="0 0 83 3"
      {...props}>
      <Defs>
        <LinearGradient
          id="a"
          x1={1}
          y1={1}
          x2={-0.048}
          gradientUnits="objectBoundingBox">
          <Stop offset={0} stopColor="#e8e8e8" />
          <Stop offset={1} stopColor="gray" />
        </LinearGradient>
      </Defs>
      <Path data-name="Rectangle 21" fill="url(#a)" d="M0 0H83V3H0z" />
    </Svg>
  );
}
