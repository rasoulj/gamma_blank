import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {Button, Progress} from 'native-base';
import CountDown from 'react-native-countdown-component';

import styles from './BidHistory.styles';

export type BidHistoryItem = {
  avatar: string;
  username: string;
  isCurrentUser: boolean;
  price: string;
};

export interface BidHistoryProps {
  title: string;
  estimate: string;
  expirationDate: Date;
  lastBidPrice: string;
  warningCount?: string;
  bidList?: BidHistoryItem[];
  onPlaceBid: () => void;
}

const BidHistory = ({
  title,
  estimate,
  expirationDate,
  lastBidPrice = '',
  warningCount = '0',
  bidList = [],
  onPlaceBid,
}: BidHistoryProps) => {
  const calculateProgress = (): number => {
    const now = new Date().getTime();
    const expirationTime = expirationDate.getTime();
    const remainingTime = expirationTime - now;

    if (remainingTime <= 0) {
      return 100;
    } else {
      return 100 - remainingTime / (1000 * 60);
    }
  };

  const [progress, setProgress] = useState(calculateProgress());

  return (
    <View style={styles.Container}>
      <Text style={styles.Title}>{title}</Text>
      <View style={styles.EstimateWrapper}>
        <Text style={styles.Label}>Estimate :</Text>
        <Text style={styles.Price}>{estimate}</Text>
      </View>

      <Progress colorScheme="light" size="xs" value={progress} />

      <CountDown
        until={expirationDate.getTime() - new Date().getTime()}
        onFinish={() => setProgress(calculateProgress())}
        onChange={() => setProgress(calculateProgress())}
        showSeparator={true}
        size={20}
        style={styles.Timer}
        timeLabels={{h: '', m: '', s: ''}}
        digitStyle={{
          backgroundColor: 'transparent',
        }}
        timeToShow={['H', 'M', 'S']}
        digitTxtStyle={{
          fontSize: 10,
          color: '#000',
        }}
        separatorStyle={{
          fontSize: 10,
          color: '#000',
        }}
      />

      <View style={styles.EstimateWrapper}>
        <Text style={styles.Price}>{lastBidPrice}</Text>
      </View>

      <View style={styles.BidHistoryWrapper}>
        {bidList.map((bidItem, index) => (
          <View style={styles.BidWrapper}>
            <View style={styles.BidUserWrapper}>
              {bidItem.avatar && (
                <View style={styles.BidAvatar}>
                  <Image source={{uri: bidItem.avatar}} style={styles.Avatar} />
                </View>
              )}
              {bidItem.isCurrentUser ? (
                <Text style={styles.BidUsernameOwner}>{bidItem.username}</Text>
              ) : (
                <Text style={styles.BidUsername}>{bidItem.username}</Text>
              )}
            </View>
            <Text style={styles.BidPrice}>{bidItem.price}</Text>
          </View>
        ))}
      </View>

      <Button style={styles.StyledButton} variant="solid" onPress={onPlaceBid}>
        Place a bid
      </Button>
    </View>
  );
};

export default BidHistory;
