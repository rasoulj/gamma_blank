import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useQueryClient} from 'react-query';
import {
  Button,
  Form,
  Input,
  Layer,
  Typography,
  getColor,
  scale,
  useNavigate,
  useToast,
} from '~/components';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  checkPaymentInputs,
  removeNonNumericCharacters,
  seprate2Numbers,
  seprate4Numbers,
} from '~/utils/helper';
import {
  usePaymentCreatePaymentMethod,
  usePaymentUpdatePaymentMethod,
} from '../hook';

const AddCardModal = ({
  item,
  isVisible,
  onClose,
}: {
  item?: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {toast} = useToast();

  const queryClient = useQueryClient();
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cvv: '',
    date: '',
    zipCode: '',
    name: '',
  });

  useEffect(() => {
    if (item) {
      setCardDetails({
        cardNumber: item?.cardNumber || '',
        cvv: item?.cvc || '',
        date: `${item?.expMonth}/${item?.expYear}` || '',
        zipCode: item?.zipCode || '',
        name: item?.cardName || '',
      });
    }
  }, []);
  const {mutate, isLoading} = item
    ? usePaymentUpdatePaymentMethod()
    : usePaymentCreatePaymentMethod();
  const submit = () => {
    const dateArray = cardDetails?.date.split('/');
    const input = {
      cardNumber: cardDetails?.cardNumber.replace(/-/g, ''),
      cvc: cardDetails?.cvv,
      expMonth: String(dateArray[0]),
      expYear: String(dateArray[1]),
      cardName: cardDetails?.name,
      zipCode: cardDetails?.zipCode,
      saveForFuturePurchases: true,
      createForApsy: true,
    };

    mutate(
      {input},
      {
        onSuccess(data: any) {
          if (data?.paymentStripe_createPaymentMethod?.code === 1) {
            queryClient.invalidateQueries(['getPaymentMethods']);
          } else if (
            data?.paymentStripe_createPaymentMethod?.value === 'Failed'
          ) {
            toast({
              message: 'Failed to add card, please try again',
              type: 'error',
              containerStyle: styles.toastContainer,
            });
          } else {
            toast({
              message: data?.paymentStripe_createPaymentMethod?.description,
              type: 'error',
              containerStyle:styles.toastContainer,
            });
          }
          setCardDetails({
            cardNumber: '',
            cvv: '',
            date: '',
            zipCode: '',
            name: '',
          });
          onClose();
        },
      },
    );
  };

  const handleChange = text => {
    let numbers = removeNonNumericCharacters(text);
    let formattedText = seprate4Numbers(text);
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
    <CustomActionSheet
      title={item ? 'Edit Card' : 'Add Card'}
      isVisible={isVisible}
      onClose={onClose}>
      <Form>
        <ScrollView
          style={styles.Container}
          showsVerticalScrollIndicator={false}>
          <Layer style={{flexGrow: 1}}>
            <Layer style={{flexDirection: 'row'}}>
              <Layer style={{...styles.FormItemWrapper, flexGrow: 3}}>
                <Input
                  padding={1.5}
                  height={50}
                  fontSize={14}
                  label="Card Number"
                  marginTop={2}
                  onChangeText={handleChange}
                  keyboardType="number-pad"
                  variant="rounded"
                  style={styles.StyledInput}
                  defaultValue={cardDetails?.cardNumber}
                  placeholder="Card number"
                  maxLength={19}
                />
              </Layer>
              <Layer
                style={{
                  ...styles.FormItemWrapper,
                  flexGrow: 1,
                  marginLeft: 16,
                }}>
                <Input
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
                  style={styles.StyledInput}
                  value={cardDetails?.cvv.slice(0, 4)}
                  placeholder="CVV"
                  variant="rounded"
                />
              </Layer>
            </Layer>
            <Layer style={{flexDirection: 'row'}}>
              <View style={[styles.FormItemWrapper, {flexGrow: 1}]}>
                <Input
                  padding={1.5}
                  height={50}
                  fontSize={16}
                  marginTop={2}
                  onChangeText={handleChangeDate}
                  value={cardDetails?.date}
                  variant="rounded"
                  style={styles.StyledInput}
                  keyboardType="number-pad"
                  placeholder="MM/YY"
                  maxLength={5}
                  label="MM/YY"
                />
              </View>
              <View
                style={[styles.FormItemWrapper, {flexGrow: 3, marginLeft: 16}]}>
                <Input
                  padding={1.5}
                  height={50}
                  fontSize={16}
                  marginTop={2}
                  onChangeText={text =>
                    setCardDetails({...cardDetails, name: text})
                  }
                  value={cardDetails?.name}
                  variant="rounded"
                  style={styles.StyledInput}
                  placeholder="Card name"
                  label="Card name"
                />
              </View>
              <View
                style={[styles.FormItemWrapper, {flexGrow: 1, marginLeft: 16}]}>
                <Input
                  padding={1.5}
                  height={50}
                  fontSize={16}
                  marginTop={2}
                  label="Zip code"
                  onChangeText={text =>
                    setCardDetails({...cardDetails, zipCode: text})
                  }
                  value={cardDetails?.zipCode}
                  variant="rounded"
                  style={styles.StyledInput}
                  placeholder="Zip"
                />
              </View>
            </Layer>
          </Layer>
          <Button
            isLoading={isLoading}
            style={styles.button}
            onPress={submit}
            bgColor={
              checkPaymentInputs(cardDetails) ? 'primary.500' : 'primary.200'
            }
            _text={checkPaymentInputs(cardDetails) ? {} : {color: 'gray.500'}}
            disabled={!checkPaymentInputs(cardDetails)}>
            <Typography color={'background.500'} style={styles.buttonText}>
              Save
            </Typography>
          </Button>
        </ScrollView>
      </Form>
    </CustomActionSheet>
  );
};

export default AddCardModal;

const styles = StyleSheet.create({
  toastContainer: {top: 70},
  Container: {
    borderRadius: 15,
    paddingHorizontal: 5,
    flexDirection: 'column',
  },
  shadowContainer: {
    width: '96%',
    padding: 16,
    backgroundColor: getColor({color: 'background.500'}),
    shadowColor: getColor({color: 'gray.800'}),
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 16,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  ButtonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  PaymentPriceWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  FormItemWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  FormItemWrapperRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    width: '50%',
  },
  Header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: scale(20),
    marginBottom: scale(25),
    lineHeight: 25,
  },
  Title: {
    fontSize: 17,
    color: '#000000',
    marginVertical: 5,
  },
  StyledInput: {
    border: 1,
    borderColor: '#000',
    borderRadius: 100,
    backgroundColor: 'transparent',
    marginHorizontal: 5,
    width: '100%',
    fontSize: 14,
  },
  StyledButton: {
    borderRadius: 100,
    maxWidth: 320,
    justifySelf: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  Gradient: {
    height: 2,
    flexGrow: 1,
  },
  SuccessContainer: {
    flex: 1,
    marginTop: 16,
  },
  SuccessText: {
    fontWeight: '600',
    marginTop: 45,
    fontSize: 22,
  },
  SuccessSubText: {
    fontSize: 14,
    marginTop: 10,
  },
  payment_btn: {
    height: 49,
    marginHorizontal: 20,
    marginTop: scale(290),
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  FailedText: {
    fontWeight: '600',
    marginTop: 45,
    fontSize: 22,
  },
  statusFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitle: {
    marginTop: 4,
    marginBottom: 4,
  },
  textResult: {
    marginTop: 4,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  button: {
    marginVertical: 10,
    marginTop: 30,
    height: 36,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
});
