import CShare from 'react-native-share';

export const shareData = [
  {
    id: 1,
    title: 'SMS',
    type: 'MessageSolidIcon',
    social: CShare.Social.SMS,
  },
  {
    id: 2,
    title: 'Telegram',
    type: 'TelegramSolidIcon',
    social: CShare.Social.TELEGRAM,
  },

  {
    id: 3,
    title: 'X',
    type: 'XIcon',
    social: CShare.Social.TWITTER,
  },
  {
    id: 4,
    title: 'Whatsapp',
    type: 'WhatsAppSolidIcon',
    social: CShare.Social.WHATSAPP,
  },
  {
    id: 5,
    title: 'Email',
    type: 'EmailSolidIcon',
    social: CShare.Social.EMAIL,
  },
  {
    id: 6,
    title: 'More',
    type: 'MoreSolidIcon',
    social: '',
    isNativeShare: true,
  },
];

export const sharePostData = [
  {
    id: 1,
    title: 'Share',
    type: 'MoreIcon',
    social: '',
    isNativeShare: true,
  },
  // {
  //   id: 2,
  //   title: 'SMS',
  //   type: 'NChatIcon',
  //   social: '',
  // },
  {
    id: 3,
    title: 'Mail',
    type: 'EmailIcon',
    social: CShare.Social.EMAIL,
  },
  {
    id: 4,
    title: 'Facebook',
    type: 'NFacebookIcon',
    social: CShare.Social.FACEBOOK,
  },
  {
    id: 5,
    title: 'Twitter',
    type: 'TwitterIcon',
    social: CShare.Social.TWITTER,
  },
  {
    id: 6,
    title: 'Instagram',
    type: 'NInstagramIcon',
    social: CShare.Social.INSTAGRAM,
  },
  {
    id: 7,
    title: 'Whatsapp',
    type: 'NWhatsAppIcon',
    social: CShare.Social.WHATSAPP,
  },
  {
    id: 8,
    title: 'Telegram',
    type: 'NTelegramIcon',
    social: CShare.Social.TELEGRAM,
  },
];
