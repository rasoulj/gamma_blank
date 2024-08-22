import React from 'react';
import DefaultShare from 'react-native-share';
import {Share as NativeShare} from 'react-native';
import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  WhatsappIcon,
  View,
  Pressable,
} from '../../elemental';
import * as Element from '~/components/elemental';

type IProps = {
  'data-id': string;
  parent?: string;
  name: string;
  type:
    | 'instagram'
    | 'whatsapp'
    | 'facebook'
    | 'telegram'
    | 'twitter'
    | 'email';
  style: any;
  iconProps: any;
  data: any;
  isNativeShare: boolean;
  navigate: any;
};

const SocialMedia = {
  instagram: DefaultShare.Social.INSTAGRAM,
  telegram: DefaultShare.Social.TELEGRAM,
  whatsapp: DefaultShare.Social.WHATSAPP,
  facebook: DefaultShare.Social.FACEBOOK,
  twitter: DefaultShare.Social.TWITTER,
  email: DefaultShare.Social.EMAIL,
};

export default function Share({
  type,
  iconProps,
  style,
  data,
  navigate,
  ...props
}: IProps) {
  const onShare = async () => {
    try {
      if (data?.social === 'Chat') {
        navigate('chat');
        return;
      }
      data?.isNativeShare
        ? await NativeShare.share({
            url: data?.url,
            title: data?.title,
          })
        : await DefaultShare.shareSingle({
            title: data?.title,
            message: data?.message,
            url: data?.url,
            social: data?.social || SocialMedia[type],
          });
    } catch (e) {
      console.log(e);
    }
  };

  const Icon = Element[type || 'FacebookIcon'];

  const Icons = {
    instagram: <InstagramIcon {...iconProps} />,
    telegram: <TelegramIcon {...iconProps} />,
    whatsapp: <WhatsappIcon {...iconProps} />,
    facebook: <FacebookIcon {...iconProps} />,
  };

  return (
    <Pressable onPress={onShare}>
      <View style={style} {...props}>
        <Icon {...iconProps} />
      </View>
    </Pressable>
  );
}
