import React, {useState} from 'react';
import {Button, Input, Layer, View, useNavigate} from '~/components/elemental';
import {usePaymentCreatePaymentMethod} from './hook';
import styles from './styles';

const AddCard = () => {
  const {navigateWithName} = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cvv: '',
    date: '',
    zipCode: '',
    name: '',
  });

  const handleChange = text => {
    let numbers = text.replace(/\D+/g, '');
    let formattedText = numbers.replace(/(.{4})/g, '$1-');
    if (numbers.length === 16) {
      setCardDetails({...cardDetails, cardNumber: formattedText.slice(0, -1)});
    } else {
      setCardDetails({...cardDetails, cardNumber: formattedText});
    }
  };

  const handleChangeDate = text => {
    let numbers = text.replace(/\D+/g, '');
    let formattedText = numbers.replace(/(.{2})/g, '$1/');
    if (numbers.length === 4) {
      setCardDetails({...cardDetails, date: formattedText.slice(0, -1)});
    } else {
      setCardDetails({...cardDetails, date: formattedText});
    }
  };

  const {mutate, isLoading} = usePaymentCreatePaymentMethod();
  const submit = () => {
    const dateArray = cardDetails?.date.split('/');
    const input = {
      cardNumber: cardDetails?.cardNumber.replace(/-/g, ''),
      cvc: cardDetails?.cvv,
      expMonth: Number(dateArray[0]),
      expYear: Number(dateArray[1]),
      cardName: cardDetails?.name,
      saveForFuturePurchases: true,
    };
    mutate(
      {input},
      {
        onSuccess(data) {
          console.log(data);
          navigateWithName('interests');
        },
      },
    );
  };

  return (
    <Layer style={{flex: 1}}>
      <Layer style={{flexGrow: 1}}>
        <Layer style={{flexDirection: 'row'}}>
          <Layer style={{...styles.FormItemWrapper, flexGrow: 3}}>
            <Input
              height={50}
              fontSize={16}
              label="Card Number"
              marginTop={2}
              onChangeText={handleChange}
              color={'black'}
              keyboardType="number-pad"
              variant="rounded"
              style={styles.StyledInput}
              defaultValue={cardDetails?.cardNumber}
              placeholder="1212 - 1312 - 1415 - 1616"
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
              height={50}
              fontSize={16}
              marginTop={2}
              label="CVV"
              color={'black'}
              onChangeText={text => setCardDetails({...cardDetails, cvv: text})}
              keyboardType="number-pad"
              style={styles.StyledInput}
              value={cardDetails?.cvv}
              placeholder="125"
              variant="rounded"
            />
          </Layer>
        </Layer>
        <Layer style={{flexDirection: 'row'}}>
          <View style={[styles.FormItemWrapper, {flexGrow: 1}]}>
            <Input
              height={50}
              fontSize={16}
              label="MM/YY"
              marginTop={2}
              onChangeText={handleChangeDate}
              value={cardDetails?.date}
              color={'black'}
              variant="rounded"
              style={styles.StyledInput}
              keyboardType="number-pad"
              placeholder="MM/YY"
              maxLength={5}
            />
          </View>
          <View style={[styles.FormItemWrapper, {flexGrow: 3, marginLeft: 16}]}>
            <Input
              height={50}
              fontSize={16}
              marginTop={2}
              onChangeText={text =>
                setCardDetails({...cardDetails, name: text})
              }
              value={cardDetails?.name}
              color={'black'}
              variant="rounded"
              style={styles.StyledInput}
              placeholder="Card name"
              label="Card name"
            />
          </View>
          <View style={[styles.FormItemWrapper, {flexGrow: 1, marginLeft: 16}]}>
            <Input
              height={50}
              fontSize={16}
              marginTop={2}
              onChangeText={text =>
                setCardDetails({...cardDetails, zipCode: text})
              }
              value={cardDetails?.zipCode}
              color={'black'}
              variant="rounded"
              style={styles.StyledInput}
              placeholder="Zip"
              label="Zip code"
            />
          </View>
        </Layer>
      </Layer>
      <Button
        isLoading={isLoading}
        style={{marginBottom: 8}}
        onPress={() => submit()}>
        Save
      </Button>
      <Button
        variant={'outline'}
        style={{marginBottom: 8}}
        onPress={() => navigateWithName('interests')}>
        Skip
      </Button>
    </Layer>
  );
};

export default AddCard;
