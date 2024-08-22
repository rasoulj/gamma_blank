import React, {useCallback, useMemo, useState} from 'react';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {
  Button,
  CustomFormInput,
  deviceWidth,
  HStack,
  Scrollable,
  useNavigate,
  VStack,
  ConfirmationActionSheet,
} from '~/components';
import Carousel, {Pagination} from 'react-native-snap-carousel-v4';
import {StyleSheet} from 'react-native';
import {getColor} from '~/utils/helper/theme.methods';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';
import CarouselItem from './CarouselItem';
import {model} from '~/data/model';
import LocationHoriztontalList from './LocationHorizontalList';

function CreateSocialContent({
  items,
  onSubmitContent,
  onSaveAsDraft,
  createButtonText,
  isCreateLoading = false,
  content,
  description = true,
  type = 'add',
}: {
  items?: any[];
  onSubmitContent: (formData: any) => any;
  onSaveAsDraft?: (formData: any) => any;
  createButtonText: string;
  isCreateLoading?: boolean;
  content?: {content?: string; locations?: any};
  description?: boolean;
  type?: 'edit' | 'add';
}) {
  const {navigation} = useNavigate();
  const {socialType} = useSocialTypesConfig();
  const [finalItems, setFinalItems] = useState(items);

  const schema = yup.object().shape({
    caption: description ? yup.string().required() : yup.string().nullable(),
    location: yup.string().nullable(),
    items: yup.array(),
  });

  const {...methods} = useForm<Record<string, any>, object>({
      resolver: yupResolver<yup.AnyObjectSchema>(schema),
      mode: 'onChange',
      defaultValues: {
        usedTags: '',
        caption: content?.content,
      },
    }),
    {handleSubmit, register, watch, getValues} = methods;

  const [currentIndex, setCurrentIndex] = useState(0);

  const renderCarouselItem = useCallback(
    ({item, index}) => (
      <CarouselItem
        {...{item, index, currentIndex, setFinalItems, finalItems, type}}
      />
    ),
    [currentIndex],
  );

  const submitForm = async formData => {
    formData.items = finalItems;

    onSubmitContent?.(formData);
  };

  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const onCloseModal = () => {
    setIsVisibleModal(false);
  };
  const onCancelPress = () => {
    if (onSaveAsDraft) {
      setIsVisibleModal(true);
    } else {
      setIsVisibleModal(false);
      navigation.goBack();
    }
  };
  const onPressDraft = () => {
    setIsVisibleModal(false);
    onSaveAsDraft?.(getValues());
  };
  const onCancelDraft = () => {
    setIsVisibleModal(false);
    navigation.goBack();
  };

  const maxCaptionLen = useMemo(() => {
    return socialType === 'text' &&
      model.metaData?.configs?.socialText?.hasCharacterLimit
      ? model.metaData?.configs?.socialText?.characterLimitCount
      : undefined;
  }, [socialType]);

  const isCreateButtonDisabled =
    watch('caption')?.length >= maxCaptionLen ? true : false;

  return (
    <>
      <FormProvider {...methods}>
        <VStack flex="1">
          <Scrollable
            data-id="from-scroll"
            data-name="Scrollable"
            keyboardShouldPersistTaps={'handled'}
            contentContainerStyle={styles.flexGrow}>
            {finalItems?.length > 0 && socialType === 'social' && (
              <VStack space="2" mb="7" px="5" alignItems="center">
                <Carousel
                  keyExtractor={(item, index) => `${index}`}
                  autoplay={false}
                  sliderWidth={deviceWidth}
                  itemWidth={deviceWidth - 40}
                  data={finalItems}
                  renderItem={renderCarouselItem}
                  firstItem={currentIndex}
                  onSnapToItem={index => setCurrentIndex(index)}
                />
                <Pagination
                  dotsLength={finalItems?.length}
                  activeDotIndex={currentIndex}
                  containerStyle={styles.containerStyle}
                  dotStyle={styles.activeDotStyle}
                  inactiveDotStyle={styles.dotStyle}
                  inactiveDotOpacity={0.5}
                  inactiveDotScale={0.9}
                />
              </VStack>
            )}
            {(description || socialType === 'text') && (
              <VStack px="5">
                <CustomFormInput
                  {...register('caption')}
                  placeholder="Type something..."
                  label="Write a caption"
                  textArea
                  showCharCounter={socialType === 'text'}
                  maxLength={maxCaptionLen}
                />
              </VStack>
            )}
            <LocationHoriztontalList {...{name: 'location', content}} />
            {finalItems?.length === 0 && <VStack flex="1" />}
            <HStack space="4" h="12" mb="8" mt="5" mx="5">
              <Button
                onPress={onCancelPress}
                flex="1"
                bgColor="transparent"
                color="error.500"
                borderColor="error.500"
                borderWidth="2">
                Cancel
              </Button>
              <Button
                flex="1"
                disabled={isCreateButtonDisabled}
                bgColor={isCreateButtonDisabled ? 'gray.400' : 'primary.500'}
                onPress={handleSubmit(submitForm)}
                isLoading={isCreateLoading}>
                {createButtonText}
              </Button>
            </HStack>
          </Scrollable>
        </VStack>
      </FormProvider>
      <ConfirmationActionSheet
        title="Save as draft?"
        description="Drafts let you save your edits, so you come back later."
        isOpen={isVisibleModal}
        onClose={onCloseModal}
        onCancelPress={onCancelDraft}
        onConfirmPress={onPressDraft}
        confirmButtonText="Save draft"
        confirmBtnColor="primary.500"
        cancelBtnText="Discard"
      />
    </>
  );
}

export default CreateSocialContent;

const styles = StyleSheet.create({
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: -5,
    backgroundColor: getColor({color: 'primary.300'}),
  },

  activeDotStyle: {
    width: 35,
    height: 10,
    borderRadius: 4,
    marginHorizontal: -5,
    backgroundColor: getColor({color: 'primary.400'}),
  },

  containerStyle: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  flexGrow: {flexGrow: 1},
});
