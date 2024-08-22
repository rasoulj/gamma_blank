import {useNavigationState} from '@react-navigation/native';
import React, {Children} from 'react';
import {View} from 'react-native';
import useTrackedStore from '~/stores/store';
import {generateUuid, print, deviceHeight, deviceWidth} from '~/utils/methods';
export interface IState {
  _id: string;
  name: string;
  screenShot: string;
  metadata: {
    _id: string;
    components: {
      _id: string;
      name: string;
      parent: string;
      style: {
        x: number;
        y: number;
        width: number;
        height: number;
      };
      [key: string]: any;
    }[];
  };
}

type Names =
  | 'Typography'
  | 'Box'
  | 'Heading'
  | 'IconButton'
  | 'Icon'
  | 'Button'
  | 'Input'
  | 'Checkbox'
  | 'Image'
  | 'Scrollable'
  | 'VStack'
  | 'HStack'
  | 'Center'
  | 'Pressable'
  | 'Layer'
  | 'ListItem';

export interface IProps {
  nativeID?: string;
  type?: string;
  children?: any;
  parent?: string;
  name?: Names;
}

export const withMeasure = <P extends Object>(Component: any) => {
  return function MyComponent(props: P & IProps) {
    const state = useTrackedStore();

    const onLayout = (event: any) => {
      // console.log(props.nativeID, event.nativeEvent.layout.height);
    };

    if (props.type === 'custom') {
      return (
        <View onLayout={onLayout} nativeID={props.nativeID}>
          <Component {...props} />
        </View>
      );
    }

    return <Component onLayout={onLayout} {...props} />;
  };
};
