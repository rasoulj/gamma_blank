import React from 'react';
import * as yup from 'yup';
import {useNavigate} from '~/components/elemental';
import EditProfile from '~/components/molecules/EditProfile';

const schema = yup.object().shape({
  fullName: yup.string().required('Required'),
});

export default function SocialEditProfile() {
  const {navigation} = useNavigate();
  return (
    <EditProfile
      data-id="32d42084-8d22-4ecc-a3a2-452d373957c3"
      data-parent="scrollable_screen"
      data-name="SocialProfile"
      isConfig
      edit
      age={false}
      about
      address={false}
      gender
      location={false}
      username
      email
      phone
      contactDisplaySwitch
      genderDisplaySwitch
      buttonText="Save"
      postAction={() => navigation?.goBack()}
    />
  );
}
