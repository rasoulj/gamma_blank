/* eslint-disable react/prop-types */
import React from 'react';
import styles from './styles';
import {Button, Typography, VStack, useNavigate} from '~/components/elemental';
import EducationEmptyState from '~/assets/icons/CustomIcons/EducationEmptyState.icon';

export default function ListEmptyComponent() {
  const {navigateWithName} = useNavigate();
  return (
    <VStack justifyContent={'center'} alignItems={'center'} mt="114px">
      <EducationEmptyState />
      <Typography style={styles.title} color={'gray.400'}>
        Pick a few courses, we’ll keep them on yor home screen for quick access
      </Typography>
      <Button
        style={styles.startBtn}
        _text={styles.btnText}
        onPress={() => navigateWithName('EducationHome')}>
        Get Started
      </Button>
    </VStack>
  );
}
