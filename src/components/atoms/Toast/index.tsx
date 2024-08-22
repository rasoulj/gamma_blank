import {randomString} from '~/utils/helper/random';
import {Typography, cache, getColor, useQuery} from '~/components/elemental';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'native-base';
import {StyleSheet, ViewStyle} from 'react-native';
import {DangerBoldIcon, TickCircleIcon} from '~/assets';

type ToastProps = {
  id?: string;
  style?: any;
  message: string;
  timeout?: number;
  type?: 'success' | 'error';
  containerStyle?: ViewStyle;
};

export default function Toasts() {
  const {data} = useQuery<Array<ToastProps>>('toasts');

  return (
    <View
      style={[
        {
          ...styles.toast,
        },
        data?.[0]?.containerStyle,
      ]}>
      {data?.map?.((toast, index) => (
        <Toast key={index} deleteToast={deleteToast} {...toast} />
      ))}
    </View>
  );

  function deleteToast(id: string) {
    const toasts: Array<ToastProps> = cache.get('toasts').data || [];

    cache.set(
      'toasts',
      toasts.filter((toast: any) => toast.id !== id),
    );
  }
}

export function useToast() {
  function toast(toast: ToastProps) {
    if (!toast.id) toast.id = randomString(20);

    const toasts: Array<ToastProps> = cache.get('toasts').data || [];

    cache.set('toasts', toasts.concat(toast));
  }

  return {toast};
}

function Toast({
  message,
  deleteToast,
  id,
  style = {},
  timeout = 3000,
  type,
  ...props
}: ToastProps & {
  deleteToast: (id: string) => void;
}) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setTimeout(() => setOpacity(1), 10);
    setTimeout(() => setOpacity(0), timeout - 500);
    setTimeout(() => deleteToast(id), timeout);
  }, []);

  return (
    <View
      nativeID={id}
      style={[
        type === 'success'
          ? styles.successContainer
          : type === 'error'
          ? styles.errorContainer
          : styles.container,
        {opacity, ...style},
      ]}
      {...props}>
      {type === 'success' ? (
        <>
          <TickCircleIcon color="success.500" />
          <Typography
            marginLeft={2}
            fontSize="sm"
            fontWeight="400"
            color="black">
            {message}
          </Typography>
        </>
      ) : type === 'error' ? (
        <>
          <DangerBoldIcon />
          <Typography marginLeft={2} fontSize="sm" fontWeight="400">
            {message}
          </Typography>
        </>
      ) : (
        <Text color={style.textColor}>{message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: getColor({color: 'primary.500'}),
    borderRadius: 10,
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 60,
  },

  successContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: getColor({color: 'success.100'}),
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    margin: 5,
    marginBottom: 60,
  },

  errorContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: getColor({color: 'error.100'}),
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    margin: 5,
    marginBottom: 60,
  },
  toast: {position: 'absolute', bottom: 40, left: 10, right: 10, zIndex: 1000},
});
