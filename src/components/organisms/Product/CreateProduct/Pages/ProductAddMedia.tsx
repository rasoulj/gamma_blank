import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, ScrollView, Typography } from '~/components';
import { model } from '~/data/model';
import AddPhotos from '../Components/AddPhotos';
import AddVideos from '../Components/AddVideos';

const ProductConfig = model?.metaData?.configs?.product;

const ProductAddMedia = ({productData, setProductData, submit}) => {
  const [requiredText, setRequiredText] = useState('');

  const checkRequirement = () => {
    if (
      ProductConfig.photoIsRequired !== false &&
      !(productData?.images?.filter(i => i !== '').length > 0)
    ) {
      setRequiredText('Photo is Required');
      return true;
    } else if (
      ProductConfig.videoIsRequired !== false &&
      !(productData?.videos?.filter(i => i !== '').length > 0)
    ) {
      setRequiredText('Video is Required');
      return true;
    }else if (
      ProductConfig.photoIsRequired !== false &&
      productData?.images?.[0] === undefined || ""
    ) {
      setRequiredText('Please upload a cover photo');
      return true;
    } else {
      setRequiredText('');
      return false;
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <AddPhotos
        productData={productData}
        onChange={list => setProductData({...productData, images: list})}
      />
      {ProductConfig?.video !== false && (
        <AddVideos
          attachedFiles={productData?.videos}
          setAttachedFiles={list =>
            setProductData({...productData, videos: list})
          }
        />
      )}
      <Typography color={'error.500'} style={styles.errorText}>
        {requiredText}
      </Typography>
      <Button
        style={styles.button}
        onPress={() => checkRequirement() ? {} :  submit()}>
        Done
      </Button>
    </ScrollView>
  );
};

export default ProductAddMedia;

const styles = StyleSheet.create({
  errorText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 16,
  },
  button: {marginVertical: 8},
});
