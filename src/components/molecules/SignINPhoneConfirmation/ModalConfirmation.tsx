import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Modal from 'react-native-modal';
import {PencilEditIcon, Screen} from '../../elemental';
import Scrollable from '../../atoms/Scrollable';
import styles from './styles';

interface ModalConfirmationProps {
  isVisible: boolean;
  sendAgain: () => void;
  onCloseModal: () => void;
  phoneNumber: string;
  confirmCode: (code: any) => void;
}

const ModalConfirmation = ({
  isVisible,
  sendAgain,
  onCloseModal,
  phoneNumber,
  confirmCode,
}: ModalConfirmationProps) => {
  const [seconds, setSeconds] = useState(120);
  const [isActive, setIsActive] = useState(false);
  const celCount = 6;
  const [verificationCode, setValue] = useState('');

  const ref = useBlurOnFulfill({verificationCode, cellCount: celCount});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    verificationCode,
    setValue,
  });

  useEffect(() => {
    if (verificationCode?.length === celCount) {
      Keyboard.dismiss();
      confirmCode?.(verificationCode);
      setValue('');
    }
  }, [verificationCode]);

  function reset() {
    setSeconds(120);
    setIsActive(false);
  }

  useEffect(() => {
    reset();
  }, [isVisible]);

  useEffect(() => {
    let interval = null;
    if (!isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (seconds == 0) {
      clearInterval(interval);
      setIsActive(true);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <Modal isVisible={isVisible} backdropColor="white" backdropOpacity={1}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Screen>
          <Scrollable>
            <Text
              style={{
                textAlign: 'center',
              }}>
              Sign In
            </Text>

            <Text
              style={{
                textAlign: 'center',
                marginVertical: 40,
                marginTop: 55,
                fontSize: 45,
                fontWeight: 'bold',
              }}>
              {convertTime(seconds)}
            </Text>

            <Text
              style={{
                textAlign: 'center',
                fontSize: 17,
              }}>{`We sent code verification to\nyour mobile number`}</Text>
            <TouchableOpacity
              disabled={seconds !== 0 ? true : false}
              onPress={() => {
                sendAgain();
                reset();
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: seconds !== 0 ? '#A1A1AA' : '#1DE9B6',
                  marginTop: 20,
                  fontSize: 16,
                }}>
                Send again
              </Text>
            </TouchableOpacity>

            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              caretHidden={true}
              value={verificationCode}
              onChangeText={setValue}
              cellCount={celCount}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) =>
                !symbol ? (
                  <View
                    style={{
                      height: '100%',
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <View
                      style={[
                        {
                          height: 50,
                          width: '80%',
                          borderWidth: 2,
                          borderColor: 'red',
                          borderRadius: 10,
                        },
                        isFocused && [{borderColor: '#1DE9B6'}],
                      ]}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      height: 50,
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <View
                      onLayout={getCellOnLayoutHandler(index)}
                      key={index}
                      style={[
                        {
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 50,
                          width: '80%',
                          borderWidth: 2,
                          borderColor: '#BDBDBD',
                          borderRadius: 10,
                        },
                        isFocused && [{borderColor: '#1DE9B6'}],
                      ]}>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        {symbol}
                      </Text>
                    </View>
                  </View>
                )
              }
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: 20,
              }}>
              <Text style={{marginEnd: 10, fontSize: 17}}>{phoneNumber}</Text>
              <TouchableOpacity onPress={onCloseModal}>
                <PencilEditIcon />
              </TouchableOpacity>
            </View>
          </Scrollable>
        </Screen>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalConfirmation;

export function convertTime(value) {
  return Math.floor(value / 60) + ':' + (value % 60 ? value % 60 : '00');
}
