import React, {Fragment, memo, useMemo} from 'react';
import {
  Button,
  CloseIcon,
  Pressable,
  Typography,
  VStack,
  useNavigate,
  useRoute,
} from '~/components';
import useHeader from '~/components/elemental/hooks/use_header';
import {StyleSheet} from 'react-native';
import GetCertificateIcon from '~/assets/icons/CustomIcons/GetCertificate';

const CourseCertification = () => {
  const {navigateWithName, navigation} = useNavigate();
  const {params} = useRoute();

  const logo = useMemo(
    () => (
      <Pressable onPress={() => navigation.goBack()}>
        <CloseIcon />
      </Pressable>
    ),
    [],
  );

  const {} = useHeader({
    logo,
    hasBack: false,
    title: {
      children: 'Certification',
      fontWeight: 'bold',
      fontSize: 'lg',
    },
  });

  const onNextPress = () => {
    navigateWithName('ShowCertificate', {courseId: params?.courseId});
  };

  return (
    <Fragment>
      <VStack flex={1}>
        <VStack alignItems={'center'} justifyContent={'center'} mt="10%">
          <GetCertificateIcon />
          <Typography
            my={'6'}
            fontWeight={'700'}
            color={'primary.500'}
            fontSize="xl">
            Congratulations!
          </Typography>
          <Typography
            mb={'2'}
            fontWeight={'500'}
            color={'gray.800'}
            fontSize="lg">
            You just Finished this course and successfully get the
            Certification!
          </Typography>
        </VStack>
      </VStack>

      <Button onPress={() => onNextPress()}>View Certificate</Button>
    </Fragment>
  );
};

export default memo(CourseCertification);

const styles = StyleSheet.create({});
