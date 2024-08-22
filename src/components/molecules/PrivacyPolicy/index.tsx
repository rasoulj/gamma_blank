import React from 'react';
import { View } from 'react-native';
import PrivacyPolicyIcon from '~/assets/icons/CustomIcons/PrivacyPolicy.icon';
import { Typography } from '~/components/elemental';

const PrivacyPolicy = ({content}: {content: string}) => {
  return (
    <View style={{alignItems: 'center', marginTop: 24}}>
      <PrivacyPolicyIcon />
      <Typography style={{fontWeight: '400', fontSize: 16, marginVertical: 24}}>
        {content
          ? content
          : `This Privacy Policy describes how your company, INC, treats customer personal information on the websites, social media and mobile apps where it is located (in this policy we call these our Platforms). This policy also applies to information collected in our stores. Your use of this Platform indicates you agree to our collection, use and disclosure of your information as described in this Privacy Policy.`}
      </Typography>
    </View>
  );
};

export default PrivacyPolicy;



