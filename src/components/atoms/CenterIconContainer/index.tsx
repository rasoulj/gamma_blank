import React, {ReactElement} from 'react';
import VStack from '../VStack';

export interface CenterIconContainerProps {
  width: string | number;
  height: string | number;
  color: string;
  children?: ReactElement;
}

const CenterIconContainer = ({
  width,
  height,
  color,
  children,
}: CenterIconContainerProps) => {
  return (
    <VStack
      alignItems={'center'}
      justifyContent={'center'}
      width={width}
      height={height}
      borderRadius={'full'}
      bg={color}>
      {children}
    </VStack>
  );
};

export default CenterIconContainer;
