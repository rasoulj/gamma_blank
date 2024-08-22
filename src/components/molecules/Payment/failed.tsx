import {Center, Button} from 'native-base';
import React from 'react';
import {
  CloseIcon,
  Layer,
  Typography,
  useNavigate,
  getColor,
} from '~/components/elemental';
import styles from './styles';

const Failed = ({goBack}: {goBack: () => void}) => {
  const {navigateWithName} = useNavigate();
  return (
    <>
      <Layer style={styles.SuccessContainer}>
        <Center>
          <CloseIcon type="faild" />
          <Typography color={'error.500'} style={styles.FailedText}>
            Payment Failed!
          </Typography>
          <Typography style={styles.SuccessSubText}></Typography>
        </Center>
        <Button
          rounded="full"
          variant={'solid'}
          width={'100%'}
          style={styles.payment_btn}
          py={3}
          _text={{
            fontWeight: 'bold',
          }}
          onPress={goBack}>
          Done
        </Button>
      </Layer>
    </>
  );
};

export default Failed;
