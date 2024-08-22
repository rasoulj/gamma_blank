import {yupResolver} from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import React, {Fragment, memo, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import * as yup from 'yup';
import CertificateTemplate from '~/assets/icons/CustomIcons/CertificateTemplate';
import CustomKeyboardAwareScrollView from '~/components/atoms/CustomKeyboardAwareScrollView';
import {
  Button,
  CustomFormInput,
  CustomSwitch,
  HStack,
  ScrollView,
  Typography,
  VStack,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';

const CourseCertificate = ({productData, setProductData}) => {
  const [visible, setVisible] = useState(false);
  const user = useAuthStore(state => state?.user);

  const schema = visible
    ? yup.object().shape({
        aboutCertificate: yup.string().required('Required'),
        hasCertificate: yup.boolean().required('Required'),
        certificateTemplate: yup.string(),
      })
    : yup.object().shape({hasCertificate: yup.boolean().required('Required')});

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {
      aboutCertificate: productData?.aboutCertificate,
      hasCertificate: productData?.hasCertificate ?? false,
      certificateTemplate: productData?.certificateTemplate,
    },
  });

  const {handleSubmit, register, watch, setValue} = methods;

  return (
    <CustomKeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flex}>
      <FormProvider {...methods}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.mb}>
          <HStack justifyContent={'space-between'} mt="2" mr="1">
            <Typography fontSize="lg" color={'gray.800'} fontWeight={'600'}>
              Certificate
            </Typography>
            <CustomSwitch
              switchValue={
                productData?.hasCertificate ?? watch('hasCertificate')
              }
              onValueChange={() => {
                setVisible(!visible);
                setValue('hasCertificate', !watch('hasCertificate'));
              }}
            />
          </HStack>

          {watch('hasCertificate') && (
            <Fragment>
              <CustomFormInput
                {...register('aboutCertificate')}
                placeholder="Write something about your certificate..."
                required
                textArea
                showCharCounter
                maxLength={300}
                style={styles.marginBottom}
                label="About Certificate"
              />
              <Typography
                fontSize="md"
                color="gray.800"
                fontWeight={'500'}
                mt="6">
                Certificate Template
              </Typography>
              <VStack pb={'8'} width={'100%'}>
                <CertificateTemplate
                  width={'100%'}
                  height={238}
                  date={dayjs().format('DD/MM/YYYY')}
                  instructorName={user?.fullName}
                  category={productData?.category}
                  studentName={'John Doe'}
                />
              </VStack>
            </Fragment>
          )}
        </ScrollView>
      </FormProvider>
      <Button style={styles.mt} onPress={handleSubmit(setProductData)}>
        Next
      </Button>
    </CustomKeyboardAwareScrollView>
  );
};

export default memo(CourseCertificate);

const styles = StyleSheet.create({
  mt: {bottom: 10, position: 'absolute', width: '100%'},
  marginBottom: {marginBottom: 10},
  mb: {paddingBottom: 100},
  flex: {flex: 1},
});
