import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Button,
  HStack,
  Layer,
  Typography,
  useAuth,
} from '~/components/elemental';

const LogOutModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {logout} = useAuth();

  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <Layer style={{position: 'relative'}}>
          <Typography style={styles.title}>Confirmation</Typography>
          <Typography fontSize="sm" style={styles.margin}>
            Are you sure you want to log out?
          </Typography>
          <HStack style={styles.footerView} space={'2'}>
            <Button
              style={styles.btn}
              _text={styles.lineHeight}
              variant="outline"
              onPress={e => {
                onClose();
              }}>
              No
            </Button>
            <Button
              style={styles.btn}
              _text={styles.lineHeight}
              variant="solid"
              bg={'error.500'}
              onPress={() => [logout(), onClose()]}>
              Yes
            </Button>
          </HStack>
        </Layer>
      </View>
    </CustomActionSheet>
  );
};

export default LogOutModal;

const styles = StyleSheet.create({
  lineHeight: {lineHeight: 15, fontWeight: '700'},
  btn: {
    position: 'relative',
    borderRadius: 10,
    flex: 1,
    height: 36,
  },
  margin: {
    marginVertical: 16,
  },
  footerView: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  title: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
    marginTop: 8,
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
  },
});
