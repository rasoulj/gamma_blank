import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {memo, useMemo} from 'react';
import {HStack, VStack, scale} from '~/components';
import {
  User2Icon,
  Typography,
  useNavigate,
  Image,
} from '~/components/elemental';
import LinearGradient from 'react-native-linear-gradient';
import {isElementInModel} from '~/utils/helper/isElementsInModel';

const UserAvatar = ({
  user,
  avatarSize = scale(41),
  extraData,
  paddingX = 0,
  rightIcon,
  mb = '0',
  color,
  containerStyle,
  hasShadow = true,
  fullNameFontSize = 'sm',
  extraDataFontSize = 'xs',
  mainNavigation,
  pushStack = false,
  fullNameTextStyle,
  extraDataTextStyle,
}: {
  user: any;
  avatarSize?: any;
  extraData?: any;
  paddingX?: any;
  rightIcon?: any;
  mb?: any;
  color?: string;
  containerStyle?: ViewStyle;
  hasShadow?: boolean;
  fullNameFontSize?: string;
  extraDataFontSize?: string;
  mainNavigation?: any;
  pushStack?: boolean;
  fullNameTextStyle?: StyleProp<TextStyle>;
  extraDataTextStyle?: StyleProp<TextStyle>;
}) => {
  const {navigateWithName} = useNavigate();

  const onProfilePress = () => {
    if (isElementInModel('DatingUserProfile'))
      navigateWithName(
        'DatingUserProfile',
        {item: user, userId: user?.id},
        {push: pushStack},
      );
    else
      navigateWithName(
        'profile',
        {item: user, userId: user?.id},
        {push: pushStack},
      );
  };

  const avatarStyle = useMemo(() => {
    return {
      width: avatarSize,
      height: avatarSize,
      borderRadius: avatarSize / 2,
    };
  }, [avatarSize]);

  return (
    <LinearGradient
      colors={
        !hasShadow
          ? ['transparent', 'transparent']
          : ['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0)']
      }
      style={[containerStyle, styles.linear]}>
      <HStack
        pb={mb}
        style={[styles.container, {paddingHorizontal: paddingX}]}
        space={'2'}>
        <VStack w="90%">
          <TouchableOpacity onPress={onProfilePress}>
            <HStack space="2" w="100%">
              {user?.photoUrl ? (
                <Image src={user?.photoUrl} style={avatarStyle} />
              ) : (
                <User2Icon width={avatarSize} height={avatarSize} />
              )}
              <VStack style={styles.textLayer}>
                <Typography
                  fontWeight="500"
                  style={fullNameTextStyle}
                  fontSize={fullNameFontSize}
                  noOfLines={1}
                  bgColor="primary.500"
                  color={color ?? 'gray.800'}>
                  {user?.fullName}
                </Typography>
                {extraData && (
                  <Typography
                    style={extraDataTextStyle}
                    fontSize={extraDataFontSize}
                    fontWeight="400"
                    noOfLines={1}
                    color={color ?? 'gray.800'}>
                    {extraData}
                  </Typography>
                )}
              </VStack>
            </HStack>
          </TouchableOpacity>
        </VStack>
        {rightIcon && rightIcon}
      </HStack>
    </LinearGradient>
  );
};

export default memo(UserAvatar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLayer: {
    alignSelf: 'center',
    flexShrink: 1,
  },
  linear: {flexShrink: 1, width: '100%'},
});
