import {useRoute} from '@react-navigation/native';
import React, {Fragment, useState} from 'react';
import {View} from 'react-native';
import {useQueryClient} from 'react-query';
import {
  Button,
  CloseIconSet,
  Input,
  Layer,
  TickIconSet,
  Typography,
  VStack,
  getColor,
  useNavigate,
} from '~/components/elemental';
import useHeader from '~/components/elemental/hooks/use_header';
import {
  useCreateEnrollEducation,
  useCreateOneTimePayment,
} from '~/components/organisms/CourseList/hook';
import styles from './styles';
import Success from './success';
import {checkPaymentInputs, creditCardType} from '~/utils/helper';
import {removeNonNumericCharacters} from '~/utils/helper';
import {seprate4Numbers} from '~/utils/helper';
import {seprate2Numbers} from '~/utils/helper';
import CustomKeyboardAwareScrollView from '~/components/atoms/CustomKeyboardAwareScrollView';

const Payment = () => {
  const {params: item}: any = useRoute();
  const {navigateWithName} = useNavigate();

  const queryClient = useQueryClient();

  const [status, setStatus] = useState(item?.status || '');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cvv: '',
    date: '',
    zipCode: '',
    name: '',
  });

  const [paymentResult, setPaymentResult] = useState(item?.result ?? []);

  const {mutate: enrollMutate, isLoading: enrollLoading} =
    useCreateEnrollEducation();

  const {mutate: paymentMutate, isLoading: paymentLoading} =
    useCreateOneTimePayment();

  const {} = useHeader({hasBack: status === 'Success' ? false : true});

  const createTokenAndUpdateCard = async () => {
    const dateArray = cardDetails?.date.split('/');
    const input = {
      cardName: cardDetails?.name,
      zipCode: cardDetails?.zipCode,
      amount: item?.price,
      cardNumder: cardDetails?.cardNumber.replace(/ /g, ''),
      cvc: cardDetails?.cvv,
      expMonth: String(dateArray[0]),
      expYear: String(dateArray[1]),
    };

    paymentMutate(
      {
        input: input,
      },
      {
        onSuccess(data: any) {
          setPaymentResult(data?.paymentStripe_payment?.result);

          if (data?.paymentStripe_payment?.status?.value === 'Success') {
            enrollMutate(
              {
                input: {
                  courseId: item?.entityId,
                  status: 'IN_PROGRESS',
                },
              },
              {
                onSuccess(d) {
                  if (d?.course_enroll?.status?.value === 'Success') {
                    setStatus('Success');
                    queryClient.invalidateQueries(['getCourses']);
                  } else {
                    setStatus('Failed');
                  }
                },
              },
            );
          } else {
            setStatus('Failed');
          }
        },
      },
    );
  };

  const handleChange = text => {
    let numbers = removeNonNumericCharacters(text);
    let formattedText = seprate4Numbers(numbers);
    if (numbers.length === 16) {
      setCardDetails({...cardDetails, cardNumber: formattedText.slice(0, -1)});
    } else {
      setCardDetails({...cardDetails, cardNumber: formattedText});
    }
  };

  const handleChangeDate = text => {
    let numbers = removeNonNumericCharacters(text);
    let formattedText = seprate2Numbers(text);
    if (numbers.length === 4) {
      setCardDetails({...cardDetails, date: formattedText.slice(0, -1)});
    } else {
      setCardDetails({...cardDetails, date: formattedText});
    }
  };

  return (
    <>
      {status !== '' && (
        <View
          style={[
            styles.statusContainer,
            {
              backgroundColor: getColor({
                color: status === 'Success' ? 'green.200' : 'error.100',
              }),
            },
          ]}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: getColor({
                  color: status === 'Success' ? 'green.500' : 'error.500',
                }),
              },
            ]}>
            {status === 'Success' ? (
              <TickIconSet width={18} height={18} color={'white'} />
            ) : (
              <CloseIconSet width={18} height={18} color={'white'} />
            )}
          </View>
          <VStack flex={1}>
            <Typography
              style={{
                ...styles.status,
                fontWeight: status === 'Success' ? '400' : '700',
              }}>
              {status === 'Success' ? 'Successful Payment' : 'Payment Failed'}
            </Typography>
            {status !== 'Success' && (
              <Typography fontSize="sm" fontWeight={'400'} ml="2">
                {item?.item?.status?.description ??
                  paymentResult?.failureMessage}
              </Typography>
            )}
          </VStack>
        </View>
      )}
      {status === 'Success' ? (
        <Success
          paymentResult={item?.item || paymentResult?.result || paymentResult}
          cardNumberType={creditCardType(
            cardDetails?.cardNumber.replace(/ /g, ''),
          )}
        />
      ) : (
        <Fragment>
          <CustomKeyboardAwareScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <Layer style={styles.row}>
              <Layer style={[styles.formItemWrapper, styles.flex3]}>
                <Input
                  isDisabled={item?.type === 'COURSE' ? false : true}
                  padding={1.5}
                  height={50}
                  fontSize={14}
                  label="Card Number"
                  marginTop={2}
                  onChangeText={handleChange}
                  value={cardDetails?.cardNumber}
                  keyboardType="number-pad"
                  variant="rounded"
                  style={styles.styledInput}
                  placeholder="Card number"
                  maxLength={19}
                />
              </Layer>
              <Layer style={[styles.zipCode, styles.formItemWrapper]}>
                <Input
                  isDisabled={item?.type === 'COURSE' ? false : true}
                  padding={1.5}
                  height={50}
                  fontSize={16}
                  marginTop={2}
                  label="CVV"
                  onChangeText={text =>
                    setCardDetails({
                      ...cardDetails,
                      cvv: text.length > 4 ? text.slice(0, 4) : text,
                    })
                  }
                  keyboardType="number-pad"
                  style={styles.styledInput}
                  placeholder="CVV"
                  variant="rounded"
                  value={cardDetails?.cvv}
                />
              </Layer>
            </Layer>
            <Layer style={styles.row}>
              <View style={[styles.formItemWrapper, styles.flexGrow]}>
                <Input
                  isDisabled={item?.type === 'COURSE' ? false : true}
                  padding={1.5}
                  height={50}
                  fontSize={16}
                  marginTop={2}
                  variant="rounded"
                  onChangeText={handleChangeDate}
                  value={cardDetails?.date}
                  style={styles.styledInput}
                  keyboardType="number-pad"
                  placeholder="MM/YY"
                  maxLength={5}
                  label="MM/YY"
                />
              </View>
              <View style={[styles.formItemWrapper, styles.cardName]}>
                <Input
                  isDisabled={item?.type === 'COURSE' ? false : true}
                  padding={1.5}
                  height={50}
                  fontSize={16}
                  marginTop={2}
                  onChangeText={text =>
                    setCardDetails({...cardDetails, name: text})
                  }
                  value={cardDetails?.name}
                  variant="rounded"
                  style={styles.styledInput}
                  placeholder="Card name"
                  label="Card name"
                />
              </View>
              <View style={[styles.formItemWrapper, styles.zipCode]}>
                <Input
                  isDisabled={item?.type === 'COURSE' ? false : true}
                  padding={1.5}
                  height={50}
                  fontSize={16}
                  marginTop={2}
                  onChangeText={text =>
                    setCardDetails({...cardDetails, zipCode: text})
                  }
                  label="Zip code"
                  variant="rounded"
                  value={cardDetails?.zipCode}
                  style={styles.styledInput}
                  placeholder="Zip"
                />
              </View>
            </Layer>
          </CustomKeyboardAwareScrollView>
          <Button
            rounded="full"
            variant="solid"
            width="100%"
            style={styles.paymentButton}
            isLoading={enrollLoading || paymentLoading}
            bgColor={
              item?.type !== 'COURSE'
                ? 'primary.500'
                : checkPaymentInputs(cardDetails)
                ? 'primary.500'
                : 'primary.200'
            }
            _text={
              item?.type !== 'COURSE'
                ? {}
                : checkPaymentInputs(cardDetails)
                ? {}
                : {color: 'gray.500'}
            }
            disabled={
              item?.type !== 'COURSE' ? false : !checkPaymentInputs(cardDetails)
            }
            onPress={() =>
              item?.type === 'COURSE'
                ? createTokenAndUpdateCard()
                : navigateWithName('Shopping basket')
            }>
            {item?.type === 'COURSE'
              ? `Pay $${item?.price}`
              : 'Return to Shopping Basket'}
          </Button>
        </Fragment>
      )}
    </>
  );
};

export default Payment;
