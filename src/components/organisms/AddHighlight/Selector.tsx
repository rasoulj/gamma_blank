import React, {useImperativeHandle, useState} from 'react';
import Typography from '~/components/atoms/Typography';
import {CheckCircleIcon, CheckIcon, VStack} from '~/components/elemental';

const Selector = React.forwardRef(
  ({defaultValue = false}: {defaultValue: boolean}, ref) => {
    const [isChecked, setIsChecked] = useState<boolean>(defaultValue);
    useImperativeHandle(ref, () => ({
      setCheck: onCheckValueChanged,
    }));
    const onCheckValueChanged = value => {
      setIsChecked(value);
    };
    return (
      <>
        {isChecked ? (
          <VStack
            alignItems="center"
            justifyContent="center"
            width="22px"
            borderWidth="4px"
            borderColor="primary.500"
            backgroundColor="primary.500"
            borderRadius="11px"
            height="22px">
            <CheckIcon color="background.200" width={33} />
          </VStack>
        ) : (
          <VStack
            borderColor="gray.50"
            width="22px"
            height="22px"
            borderRadius="11px"
            borderWidth="4px"></VStack>
        )}
      </>
    );
  },
);
export default Selector;
