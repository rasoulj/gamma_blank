import React, {useImperativeHandle, useState} from 'react';
import Typography from '~/components/atoms/Typography';
import {VStack} from '~/components/elemental';

const Selector = React.forwardRef(
  (
    {
      defaultValue = false,
      isChecked,
      selectNumber,
    }: {defaultValue: boolean; isChecked: boolean; selectNumber: number},
    ref,
  ) => {
    // const [isChecked, setIsChecked] = useState<boolean>(defaultValue);
    // const [selectNumber, setSelectNumber] = useState(0);
    // useImperativeHandle(ref, () => ({
    //   setCheck: onCheckValueChanged,
    //   setCounterText: onSetCounterText,
    // }));
    // const onSetCounterText = (value: number) => {
    //   setSelectNumber(value);
    // };
    // const onCheckValueChanged = value => {
    //   setIsChecked(value);
    // };
    // console.log({isChecked});
    return (
      <>
        {isChecked ? (
          <VStack
            alignItems="center"
            justifyContent="center"
            width="22px"
            borderRadius="11px"
            backgroundColor="primary.400"
            height="22px">
            <Typography
              color="background.100"
              fontSize="xs"
              fontWeight="700"
              alignSelf="center"
              textAlign="center">
              {selectNumber}
            </Typography>
          </VStack>
        ) : (
          <VStack
            borderColor="background.100"
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
