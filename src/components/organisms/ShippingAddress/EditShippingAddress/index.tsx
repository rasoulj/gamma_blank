import {yupResolver} from '@hookform/resolvers/yup';
import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {useQueryClient} from 'react-query';
import * as yup from 'yup';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import useHeader from '~/components/elemental/hooks/use_header';
import Location from '~/components/molecules/Location';
import Button from '../../../atoms/Button';
import CustomFormInput from '../../../atoms/CustomFormInput';
import Dropdown from '../../../atoms/DropDown';
import Scrollable from '../../../atoms/Scrollable';
import useNavigate from '../../../elemental/hooks/use_navigate';
import {useEditShopingAddress, useGetCountries, useGetStates, useValidateAddress} from '../hook';
import { useToast } from '~/components/elemental';

const schema = yup.object().shape({
  fullName: yup.string().required(),
  address1: yup.string().required(),
  city: yup.string().required(),
  phoneNumber: yup.string().required(),
  zipcode: yup.string().required(),
});

const EditShippingAddress = ({item}) => {
  const {navigateWithName} = useNavigate();
  const coordinate = item?.coordinate ? JSON?.parse?.(item?.coordinate) : null;
  const [region, setRegion] = useState({
    latitude: coordinate?.latitude,
    longitude: coordinate?.longitude,
  });
  const queryClient = useQueryClient();
  const [showMap, setShowMap] = useState(false);

  const route: any = useRoute();

  const {} = useHeader({
    title: {children: 'Edit New Address', fontSize: 'md', fontWeight: 'bold'},
    onBack() {
      navigateWithName('ShippingAddress', {
        route: 'list',
        item: route?.params?.item,
      });
    },
  });

  const methods = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    defaultValues: {
      fullName: item?.addressName,
      country: item?.country,
      address1: item?.street,
      city: item?.city,
      phoneNumber: item?.phoneNumber,
      state: item?.state,
      zipcode: item?.zipcode,
      instructions: item?.deliveryInstructions,
      address2: item?.aptSuiteBuilding,
    },
  });
  const {handleSubmit, register, watch} = methods;

  const getCurrentCountry = watch('country');
  const {data: statesData}: any = useGetStates({
    country: getCurrentCountry?.value,
  });

  const {data: countriesData}: any = useGetCountries();

  const getStates = data => {
    let states = [];
    for (let i = 0; i < data?.length; i++) {
      states = [...states, {value: data[i]?.data, label: data[i]?.data}];
    }
    return states;
  };
  const {mutate: editMutate, isLoading} = useEditShopingAddress();
  const {toast} = useToast();
  const {mutate: mutateValitator, isLoading: isLoadingValidator} =
  useValidateAddress();

  const submitForm = data => {
    const input = {
      id: item?.id,
      addressName: data?.fullName,
      aptSuiteBuilding: data?.address2,
      country: data?.country?.value,
      city: data?.city,
      street: data?.address1,
      phoneNumber: data?.phoneNumber,
      deliveryInstructions: data?.instructions,
      state: data?.state?.value,
      zipcode: data?.zipcode,
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
        onSuccess(data:any, variables, context) {
          if (data?.ecommerce_validateAddress?.code === 0) {
            toast({message: data?.ecommerce_validateAddress?.description});
          } else {
            editMutate(
              {input},
              {
                onSuccess(data: any, variables, context) {
                  if (
                    data?.shippingAddress_updateShippingAddress?.status
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
          style={styles.inputInst}
          placeholder="+0000000000"
          label="Phone Number"
          required
        />
        <CustomFormInput
          {...register('address1')}
          style={styles.inputInst}
          placeholder="Street address or P.O Box"
          label="Address"
          required
        />
        <CustomFormInput
          {...register('address2')}
          style={styles.inputInst}
          placeholder="Apt, suite, Building (optional)"
        />
        <CustomFormInput
          {...register('city')}
          style={styles.inputInst}
          placeholder="Arizona"
          label="City"
          required
        />
        <Dropdown
          data={getStates(countriesData?.pages) || []}
          style={{zIndex: 3, height: 50}}
          defaultValue={item?.country}
          name="country"
          label={'Country'}
          required
        />
        <View style={styles.dropDownContainer}>
          <View style={styles.dropDownCon}>
            <Dropdown
              data={getStates(statesData?.pages) || []}
              style={styles.stateDropDown}
              defaultValue={item?.state}
              name="state"
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
          style={styles.inputInst}
          placeholder="Tell us about your Delivery details.."
          label="Delivery Instructions"
          textArea
          maxLength={300}
          showCharCounter
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

export default EditShippingAddress;

const styles = StyleSheet.create({
  dropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stateDropDown: {
    zIndex: 3,
  },
  zipCodeInput: {width: '48%'},
  inputInst: {marginTop: 8},
  button: {
    height: 49,
    width: '100%',
    marginTop: 20,
    marginBottom: 100,
  },
  dropDownCon: {width: '48%'},
});
