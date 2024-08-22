import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';
import {useFormContext, useForm} from 'react-hook-form';
import Pressable from '~/components/atoms/Pressable';
interface IProps {
  onPress: any;
  color?: 'string';
}

function SendIcon({onPress, ...props}: IProps) {
  const {handleSubmit} = useFormContext();
  const {reset} = useForm();
  function submitForm(values) {
    console.log(onPress);
    onPress?.(values);
    reset();
  }
  return (
    <Pressable onPress={handleSubmit(submitForm)}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={27.86}
        height={27.86}
        viewBox="0 0 27.86 27.86"
        {...props}>
        <Path
          data-name="Path 29945"
          d="M15.93 2A13.93 13.93 0 112 15.93 13.93 13.93 0 0115.93 2m-5.572 7.954v4.653L20.3 15.93l-9.946 1.323v4.653l13.93-5.976z"
          transform="translate(-2 -2)"
          fill={props.color || '#006194'}
        />
      </Svg>
    </Pressable>
  );
}

export default SendIcon;
