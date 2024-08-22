import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import debounce from 'lodash.debounce';
import {
  ArrowLeftIconSet,
  SearchNormalIconSet,
  Typography,
  scale,
  useNavigate,
} from '~/components/elemental';
import {getColor} from '~/utils/helper/theme.methods';

const SearchBox = ({
  onPress,
  type = 'text',
  onChangeText,
  containerStyle,
  defaultValue,
  hasBackIcon,
}: {
  onPress?: () => void;
  type?: 'input' | 'text';
  onChangeText?: (value: string) => void;
  containerStyle?: ViewStyle;
  defaultValue?: string;
  hasBackIcon?: boolean;
}) => {
  const [userQuery, setUserQuery] = useState(defaultValue);

  const delayedQuery = debounce(() => updateQuery(), 500);
  useEffect(() => {
    delayedQuery();
    return delayedQuery.cancel;
  }, [userQuery]);

  const updateQuery = () => {
    onChangeText?.(userQuery);
  };
  const onChange = (text: any) => {
    setUserQuery(text);
  };

  const inputRef = useRef<TextInput>();
  useEffect(() => {
    if (type === 'input') {
      inputRef?.current?.focus();
      inputRef.current.setNativeProps({text: defaultValue});
    }
  }, [defaultValue]);

  const {navigation} = useNavigate();
  const onBackPress = () => navigation.goBack();

  return (
    <View style={[styles.main, containerStyle]}>
      {hasBackIcon && (
        <TouchableOpacity activeOpacity={1} onPress={onBackPress}>
          <ArrowLeftIconSet
            style={styles.marginTop}
            width={scale(32)}
            height={scale(32)}
            color="gray.800"
          />
        </TouchableOpacity>
      )}
      <View style={[styles.contanier]}>
        <SearchNormalIconSet color="gray.400" />
        {type === 'text' ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={styles.touchable}>
            <Typography
              style={styles.input}
              color={defaultValue ? 'gray.800' : 'gray.400'}>
              {defaultValue ?? 'Search'}
            </Typography>
          </TouchableOpacity>
        ) : (
          <TextInput
            placeholder="Search"
            style={styles.input}
            onChangeText={onChange}
            defaultValue={userQuery}
            ref={inputRef}
          />
        )}
      </View>
    </View>
  );
};
export default SearchBox;

const styles = StyleSheet.create({
  contanier: {
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: getColor({color: 'gray.400'}),
    borderWidth: 1,
    height: scale(50),
    alignItems: 'center',
    paddingHorizontal: 16,
    flex: 1,
  },

  input: {
    fontSize: 14,
    marginStart: 8,
    color: getColor({color: 'gray.800'}),
  },

  touchable: {
    justifyContent: 'center',
    flex: 1,
  },

  marginTop: {marginEnd: 8},

  main: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
});
