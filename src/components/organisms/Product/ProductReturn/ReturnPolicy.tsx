import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import useHeader from '~/components/elemental/hooks/use_header';
import ReturnPolicyIcon from '~/assets/icons/CustomIcons/ReturnPolicy.icon';
import {Button, Typography} from '~/components/elemental';

const ReturnPolicy = ({onChange, content}) => {
  const {title, setTitle} = useHeader({
    title: {children: 'Return Policy', fontWeight: 'bold'},
  });
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <ReturnPolicyIcon style={styles.icon} />
      <Typography style={styles.text}>
        Under these circumstances you can return a product: {'\n'}
        1. Damaged or Defective Products: If you receive a product that is
        damaged or defective, you should be eligible for a return or exchange
        within 30 days of delivery. {'\n'}
        2. Incorrect Product Shipped: If you receive a different product from
        what you ordered. {'\n'}
        3. Missing Parts or Accessories:. {'\n'}
        4. Change of Mind: If you wish to return a product for reasons other
        than damage, defects, or incorrect shipments (e.g., change of mind), the
        rules may include: The return must be requested within the app's
        specified return window. The product must be unused, in its original
        packaging, and in resellable condition. You may be responsible for
        return shipping costs, and there may be restocking fees.
        {'\n'}
        {'\n'}
        If the product was shipped and you want to return it, we will send you a
        return label to your email. When the product is delivered to you, please
        put the label on it & send it back to where you ordered it. For this
        process, you have 14 days after requesting a return.
      </Typography>
      <Button style={styles.button} onPress={onChange}>
        Next
      </Button>
    </ScrollView>
  );
};

export default ReturnPolicy;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  icon: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginVertical: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 24,
  },
  button: {
    width: '100%',
    height: 49,
    marginVertical: 10,
  },
});
