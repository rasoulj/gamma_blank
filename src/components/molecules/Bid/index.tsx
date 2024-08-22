import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {Button, Input} from 'native-base';

import styles from './styles';

export interface BidProps {
  avatar?: string;
  currentPrice: string;
  minPrice: string;
  onBid: (value: string) => void;
  currency?: string;
}

const Bid = ({
  avatar,
  currentPrice,
  minPrice,
  onBid,
  currency = '$',
}: BidProps) => {
  const [bidAmount, setBidAmount] = useState('');

  return (
    <View style={styles.Container}>
      {avatar && (
        <View style={styles.AvatarWrapper}>
          <Image
            style={styles.Avatar}
            source={{
              uri: avatar,
            }}
          />
        </View>
      )}
      <Text style={styles.CurrentPrice}>
        {bidAmount === '' ? '0' : bidAmount} Eth
      </Text>
      <View style={styles.BidWrapper}>
        <Text style={styles.Currency}>{currency}</Text>
        <Input
          maxWidth={200}
          minH={100}
          fontSize={24}
          variant="unstyled"
          placeholder="bid amount"
          value={bidAmount}
          keyboardType="decimal-pad"
          autoFocus={true}
          marginLeft={1}
          onChangeText={text => setBidAmount(text)}
        />
      </View>

      <Button
        variant="solid"
        rounded="full"
        paddingRight={10}
        paddingLeft={10}        
        minW="full"
        onPress={() => onBid(bidAmount)}>
        Confirm
      </Button>

      <Text style={styles.MinPrice}>{minPrice}</Text>
    </View>
  );
};

export default Bid;
