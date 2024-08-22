import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {memo, useMemo} from 'react';
import {HStack, Layer} from '~/components';
import {
  User2Icon,
  Typography,
  useNavigate,
  Image,
  scale,
} from '~/components/elemental';

const CommentItem = ({
  user,
  avatarSize = scale(41),
  extraData,
  paddingX = 0,
  rightIcon,
  mb = '0',
  color,
}: {
  user: any;
  avatarSize?: any;
  extraData?: any;
  paddingX?: any;
  rightIcon?: any;
  mb?: any;
  color?: string;
}) => {
  const {navigateWithName} = useNavigate();

  const avatarStyle = useMemo(() => {
    return {
      width: avatarSize,
      height: avatarSize,
      borderRadius: avatarSize / 2,
    };
  }, [avatarSize]);

  return (
    <HStack
      w={'100%'}
      style={[styles.container, {paddingHorizontal: paddingX}]}>
      <HStack>
        <TouchableOpacity
          onPress={() => navigateWithName('profile', {item: user})}>
          {user?.photoUrl ? (
            <Image src={user?.photoUrl} style={avatarStyle} />
          ) : (
            <User2Icon width={avatarSize} height={avatarSize} />
          )}
        </TouchableOpacity>
        <Layer style={styles.textLayer}>
          <Typography
            fontWeight="500"
            fontSize="sm"
            color={color ?? 'gray.800'}>
            {user?.fullName}
          </Typography>
          {extraData && (
            <Typography
              fontSize="xs"
              fontWeight="400"
              color={color ?? 'gray.800'}>
              {extraData}
            </Typography>
          )}
        </Layer>
      </HStack>
      {rightIcon && rightIcon}
    </HStack>
  );
};

export default memo(CommentItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 11,
    borderRadius: 10,
  },
  textLayer: {marginLeft: 8, alignSelf: 'center', flexShrink: 1},
});
