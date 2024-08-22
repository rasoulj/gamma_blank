import React from 'react';
import {View, Text} from 'react-native';
import { Divider } from 'native-base';

import Button from '../../atoms/Button';
import IncludeItem from './IncludeItem';

import styles from './styles';

export interface PlanProps {
  className?: string;
  title: string;
  description: string;
  price?: string;
  priceAmount?: number;
  includes?: string[];
  onClick: () => void;
}

const Plan = ({
  className,
  title,
  description,
  includes = [],
  price,
  onClick,
}: PlanProps) => {
  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <Text style={styles.Title}>{title}</Text>
        {price && <Text style={styles.Price}>{price}</Text>}
      </View>
      <Divider marginY={5}/>
      <Text style={styles.Description}>{description}</Text>
      <Text style={styles.Label}>What's Included</Text>
      <View style={styles.Includes}>
        {includes.map((text, key) => (
          <IncludeItem key={key} title={text} />
        ))}
      </View>
      <Button style={styles.Button} variant="outline" data-parent="upload-media" marginTop={5}>
        Buy
      </Button>
    </View>
  );
};

export default Plan;
