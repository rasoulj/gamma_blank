import {yupResolver} from '@hookform/resolvers/yup';
import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {useQueryClient} from 'react-query';
import * as yup from 'yup';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {useToast} from '~/components/elemental';
import useHeader from '~/components/elemental/hooks/use_header';
import Button from '../../../atoms/Button';
import CustomFormInput from '../../../atoms/CustomFormInput';
import Dropdown from '../../../atoms/DropDown';
import Scrollable from '../../../atoms/Scrollable';
import useNavigate from '../../../elemental/hooks/use_navigate';
import Location from '../../../molecules/Location';
import {
  useCreateShopingAddress,
  useGetCountries,
  useGetStates,
  useValidateAddress,
} from '../hook';

const schema = yup.object().shape({
  fullName: yup.string().required(),
  address1: yup.string().required(),
  city: yup.string().required(),
  phoneNumber: yup.string().required(),
  zipcode: yup.string().required(),
});

const AddShippingAddress = () => {
  const [region, setRegion] = useState({
    latitude: 37,
    longitude: -122,
  });
  const [showMap, setShowMap] = useState(false);
  const {navigateWithName} = useNavigate();

  const queryClient = useQueryClient();
  const {toast} = useToast();

  const route: any = useRoute();

  const methods = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });
  const {handleSubmit, register, watch} = methods;

  const getCurrentCountry = watch('country');
  const {data: statesData}: any = useGetStates({
    country: getCurrentCountry?.value,
  });

  const {} = useHeader({
    title: {children: 'Add New Address', fontSize: 'md', fontWeight: 'bold'},
    onBack() {
      navigateWithName('ShippingAddress', {
        route: 'list',
        item: route?.params?.item,
      });
    },
  });
  const {data: countriesData}: any = useGetCountries();

  const getStates = data => {
    let states = [];
    for (let i = 0; i < data?.length; i++) {
      states = [...states, {value: data[i]?.data, label: data[i]?.data}];
    }
    return states;
  };

  const {mutate: CreateMutate, isLoading} = useCreateShopingAddress();
  const {mutate: mutateValitator, isLoading: isLoadingValidator} =
    useValidateAddress();
  const submitForm = data => {
    const input = {
      addressName: data?.fullName,
      country: data?.country?.value,
      aptSuiteBuilding: data?.address2,
      city: data?.city,
      street: data?.address1,
      phoneNumber: data?.phoneNumber,
      state: data?.state?.value,
      zipcode: data?.zipcode,
      isDefault: false,
      deliveryInstructions: data?.instructions,
      coordinate: JSON.stringify({
        latitude: region?.latitude,
        longitude: region?.longitude,
      }),
    };

    const validatorInput = {
      stateCode: data?.state?.value?.split('(')?.pop()?.split(')')?.[0],
      city: data?.city,
      street: data?.address1,
      zipCode: data?.zipcode,
    };

    mutateValitator(
      {input: validatorInput},
      {
        onSuccess(data: any, variables, context) {
          if (data?.ecommerce_validateAddress?.value === 'Failed') {
            toast({
              message: 'Your address is invalid, please check your address',
              type: 'error',
              containerStyle: styles.toastContainer,
            });
          } else if (data?.ecommerce_validateAddress?.code === 0) {
            toast({message: data?.ecommerce_validateAddress?.description});
          } else {
            CreateMutate(
              {input},
              {
                onSuccess(data: any, variables, context) {
                  if (
                    data?.shippingAddress_createShippingAddress?.status
                      ?.value === 'Success'
                  ) {
                    queryClient.refetchQueries(['getOrderAddress']);
                    navigateWithName('ShippingAddress', {
                      route: 'list',
                      item: route?.params?.item,
                    });
                  }
                },
              },
            );
          }
        },
      },
    );
  };
  return showMap ? (
    <CustomActionSheet
      animationType="none"
      isVisible={showMap}
      onClose={() => {}}>
      <Location
        setLocation={region => [setShowMap(false), setRegion(region)]}
      />
    </CustomActionSheet>
  ) : (
    <Scrollable>
      <FormProvider {...methods}>
        <CustomFormInput
          {...register('fullName')}
          placeholder="Title"
          label="Title"
          required
        />
        <CustomFormInput
          {...register('phoneNumber')}
          style={styles.input}
          placeholder="+0000000000"
          label="Phone Number"
          required
        />
        <CustomFormInput
          {...register('address1')}
          style={styles.input}
          placeholder="Street address or P.O Box"
          label="Address"
          required
        />
        <CustomFormInput
          {...register('address2')}
          style={styles.input}
          placeholder="Apt, suite, Building (optional)"
        />
        <CustomFormInput
          {...register('city')}
          style={styles.input}
          placeholder="Arizona"
          label="City"
          required
        />
        <Dropdown
          data={getStates(countriesData?.pages) || []}
          style={styles.countryDropDown}
          name="country"
          label={'Country'}
          required
        />
        <View style={styles.dropDownContainer}>
          <View style={styles.dropDownCon}>
            <Dropdown
              data={getStates(statesData?.pages) || []}
              style={styles.stateDropDown}
              name="state"
              placeholder="California"
              label={'State'}
              required
            />
          </View>
          <CustomFormInput
            {...register('zipcode')}
            style={styles.zipCodeInput}
            placeholder="00000"
            label="Zipcode"
            required
          />
        </View>
        <CustomFormInput
          {...register('instructions')}
          style={styles.input}
          placeholder="Tell us about your Delivery details.."
          label="Delivery Instructions"
          maxLength={300}
          showCharCounter
          textArea
        />
        <Button
          isLoading={isLoading || isLoadingValidator}
          onPress={handleSubmit(submitForm)}
          style={styles.button}>
          Save
        </Button>
      </FormProvider>
    </Scrollable>
  );
};

export default AddShippingAddress;

const styles = StyleSheet.create({
  toastContainer: {top: 70},
  dropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stateDropDown: {
    zIndex: 3,
  },
  zipCodeInput: {width: '48%'},
  input: {marginTop: 8},
  dropDownCon: {width: '48%'},
  countryDropDown: {zIndex: 3, height: 50},
  button: {
    height: 49,
    width: '100%',
    marginTop: 20,
    marginBottom: 100,
  },
});
