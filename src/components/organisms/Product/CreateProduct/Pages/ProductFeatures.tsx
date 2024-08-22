import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import * as yup from 'yup';
import {
  Button,
  CustomFormInput,
  Layer,
  Scrollable,
  Typography,
} from '~/components/elemental';
import {model} from '~/data/model';
import Features from '../Features';

const schema = yup.object().shape({
  weight: yup.string().required('Required'),
  length: yup.string().required('Required'),
  width: yup.string().required('Required'),
  height: yup.string().required('Required'),
});

const ProductConfig = model?.metaData?.configs?.product;

const ProductFeatures = ({productData, setProductData}) => {
  const [features, setFeatures] = useState([]);

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {
      weight: productData?.weight,
      length: productData?.length,
      width: productData?.width,
      height: productData?.height,
    },
  });
  const {handleSubmit, register} = methods;

  const setFeature = () => {
    let List = [];
    for (let i = 0; i < productData?.features?.length; i++) {
      List.push({
        key: productData?.features[i]?.title,
        value: productData?.features[i]?.description,
        sectionId: 8,
        itemId: 0,
      });
    }
    setFeatures(List);
  };
  useEffect(() => {
    setFeature();
  }, []);

  const getFeatures = (item: any) => {
    let List = [];
    for (let i = 0; i < item?.length; i++) {
      List.push({title: item[i].key, description: item[i].value});
    }
    return List;
  };

  return (
    <Scrollable
      contentContainerStyle={styles.conatiner}
      style={styles.scrollStyle}>
      <FormProvider {...methods}>
        <Typography style={styles.featureText}>
          Product Features
        </Typography>
        {ProductConfig?.weight !== false && (
          <CustomFormInput
            {...register('weight')}
            placeholder="2 lb"
            required
            label="Weight"
            unit="(lb)"
          />
        )}
        {ProductConfig?.dimensions !== false && (
          <>
            <Typography
              style={{
                fontSize: scale(14),
                marginVertical: 10,
                fontWeight: '500',
                marginTop: 16,
              }}>
              Dimension
              <Typography color={'gray.400'} style={styles.unitTypography}>
                {' '}
                {'(inch)'}
              </Typography>
              <Typography
                color={'error.500'}
                style={{fontSize: 18, fontWeight: '500'}}>
                {'*'}
              </Typography>
            </Typography>
            <Layer style={{flexDirection: 'row'}}>
              <CustomFormInput
                {...register('length')}
                style={{width: '32%', marginRight: 6}}
                placeholder="Length"
                required
              />
              <CustomFormInput
                {...register('width')}
                style={{width: '33%', marginRight: 6}}
                placeholder="Width"
                required
              />
              <CustomFormInput
                {...register('height')}
                style={{width: '32%'}}
                placeholder="Height"
                required
              />
            </Layer>
          </>
        )}
        {ProductConfig?.features !== false && (
          <Features
            title="Other Features"
            features={features}
            setFeatures={setFeatures}
          />
        )}
      </FormProvider>
      <Button
        style={{marginTop: 60}}
        onPress={handleSubmit((d: any) =>
          setProductData({...d, features: getFeatures(features)}),
        )}>
        Next
      </Button>
    </Scrollable>
  );
};

export default ProductFeatures;

const styles = StyleSheet.create({
  unitTypography: {
    fontSize: 12,
    fontWeight: '400',
  },
  conatiner:{paddingBottom: 10},
  scrollStyle:{position: 'relative', margin: 0, flex: 1},
  featureText:{fontSize: 16, fontWeight: '600'}
});
