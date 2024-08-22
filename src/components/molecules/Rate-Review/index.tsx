import React, {useState} from 'react';
import {useQueryClient} from 'react-query';
import {
  Button,
  Form,
  HStack,
  Rating,
  Typography,
  View,
  getColor,
  CustomFormInput,
  useKeyboard,
  Layer,
  isDark,
  UploadFile,
  Divider,
  deviceHeight,
  ScrollView,
} from '~/components/elemental';
import {getTextColor} from '~/theme';
import {
  useCreateRateProduct,
  useCreateRateService,
  useRatingRate,
} from './hook';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Keyboard, StyleSheet, TouchableOpacity} from 'react-native';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';

import {
  useCreateRateEducation,
  useCreateReviewEducation,
  useCreateUserRate,
  useCreateUserReview,
} from '~/components/organisms/CourseList/hook';
import SubmitedRequestModal from './Modals/SubmitedRequestModal';
import {model} from '~/data/model';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  hasReview?: boolean;
  itemName?: string;
  id: number;
  hasTitle?: boolean;
  hasRate?: boolean;
  targetName:
    | 'Event'
    | 'Product'
    | 'Post'
    | 'Content'
    | 'Service'
    | 'course'
    | 'educator';
}

type InputType = {
  input: {
    eventId: number;
    rate: number;
  };
};

const schema = yup.object().shape({
  review: yup.string(),
});

const RateReviewConfig = model?.metaData?.configs?.rateReview;

export default function RateReview({
  isOpen,
  onClose,
  hasReview,
  itemName,
  id,
  hasTitle,
  targetName,
  hasRate,
}: IProps) {
  const queryClient = useQueryClient();
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });
  const {handleSubmit, register, watch, setValue, reset, control} = methods;
  const [rating, setRating] = useState(0);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [quality, setQuality] = useState('Brand New');
  const onChange = count => {
    setRating(count);
  };

  const {mutate, isLoading, error} = useRatingRate();
  const {mutate: ProductMutate, isLoading: isLoadingProduct} =
    useCreateRateProduct();
  const {mutate: ServiceMutate, isLoading: isLoadingService} =
    useCreateRateService();
  const {mutate: EducationMutate, isLoading: isLoadingEducation} =
    useCreateRateEducation();
  const {mutate: EducationReviewMutate, isLoading: isLoadingReviewEducation} =
    useCreateReviewEducation();
  const {mutate: userMutate, isLoading: isLoadinguser} = useCreateUserReview();
  const {mutate: userRAteMutate, isLoading: userRAteLoading} =
    useCreateUserRate();

  const {keyboardHeight, keyboardVisible} = useKeyboard();

  const onSubmit = data => {
    switch (targetName) {
      case 'Product' || 'Content':
        ProductMutate(
          {
            input: {
              title: data?.title,
              productId: id,
              review: data?.review,
              rate: rating,
              quality: quality === 'Brand New' ? 'BRAND_NEW' : 'SECOND_HAND',
              attachments: JSON?.stringify(data?.files),
            },
          },
          {
            onSuccess(data) {
              if (
                data?.ecommerceRateReview_createRateAndReview?.status?.value ===
                'Success'
              ) {
                queryClient.invalidateQueries(['getProducts']);
                queryClient.invalidateQueries(['getProductRatings']);
                queryClient.invalidateQueries(['getRatingContent']);
                setIsVisibleModal(true);
                setValue('review', '');
                setValue('title', '');
                setValue('files', '');
                setRating(0);
              }
            },
          },
        );
        break;
      case 'Service':
        ServiceMutate(
          {
            input: {
              serviceId: id,
              review: data?.review,
              rate: rating,
            },
          },
          {
            onSuccess(data) {
              if (
                data?.serviceRateReview_createRateAndReview?.status?.value ===
                'Success'
              ) {
                queryClient.invalidateQueries(['getServices']);
                queryClient.invalidateQueries(['getRatingService']);
                setIsVisibleModal(true);
                setValue('review', '');
                setRating(0);
              }
            },
          },
        );
        break;

      case 'course':
        EducationMutate(
          {
            input: {
              courseId: id,
              rate: rating,
            },
          },
          {
            onSuccess(dataReview) {
              if (dataReview?.course_createRate?.status?.value === 'Success') {
                queryClient.invalidateQueries(['getCourseReviews']);
                queryClient.invalidateQueries(['getCourses']);
                if (!data?.review) {
                  setIsVisibleModal(true);
                  setValue('review', '');
                  setRating(0);
                }
              }
            },
          },
        );
        if (data?.review) {
          EducationReviewMutate(
            {
              input: {
                courseId: id,
                review: data?.review,
              },
            },
            {
              onSuccess(data) {
                if (data?.course_createReview?.status?.value === 'Success') {
                  queryClient.invalidateQueries(['getCourseReviews']);
                  queryClient.invalidateQueries(['getCourses']);
                  setIsVisibleModal(true);
                  setValue('review', '');
                  setRating(0);
                }
              },
            },
          );
        }
        break;
      case 'educator':
        if (data?.review) {
          userRAteMutate(
            {
              input: {
                targetUserId: id,
                rate: rating,
              },
            },
            {
              onSuccess(data) {
                if (data?.user_createRate?.status?.value === 'Success') {
                  queryClient.invalidateQueries(['getUsers']);
                  queryClient.invalidateQueries(['getUserReviews']);
                  setIsVisibleModal(true);
                  setValue('review', '');
                  setRating(0);
                }
              },
            },
          );
          userMutate(
            {
              input: {
                targetUserId: id,
                review: data?.review,
              },
            },
            {
              onSuccess(data) {
                if (data?.user_createReview?.status?.value === 'Success') {
                  queryClient.invalidateQueries(['getUsers']);
                  queryClient.invalidateQueries(['getRatingService']);
                  setIsVisibleModal(true);
                  setValue('review', '');
                  setRating(0);
                }
              },
            },
          );
        }
        break;
      default:
        mutate(
          {
            input: {
              targetEntityId: id,
              targetEntityName: targetName,
              rate: rating,
              review: data?.review,
            },
          },
          {
            onSuccess: data => {
              if (data?.rating_rate?.status?.value === 'Success') {
                queryClient.invalidateQueries(['getRatings']);
                queryClient.invalidateQueries(['getProductDetail']);
                queryClient.invalidateQueries(['getEvents']);
                queryClient.invalidateQueries(['getTotalRate']);
                setIsVisibleModal(true);
                setValue('review', '');
                setRating(0);
              }
            },
          },
        );
        break;
    }
  };

  return (
    <CustomActionSheet isVisible={isOpen} onClose={onClose}>
      <ScrollView
        contentContainerStyle={styles.container}
        maxHeight={(deviceHeight * 2) / 3}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => Keyboard.dismiss()} accessible={false}>
          <Typography
            color={getTextColor(getColor({color: 'background.500'}))}
            style={styles.titleSheet}>
            {hasRate && hasReview
              ? 'Rate and Review'
              : hasReview
              ? 'Review'
              : 'Rate'}
          </Typography>
          <Typography
            style={styles.desc}
            color={getTextColor(getColor({color: 'background.500'}))}>
            How was your experience with {itemName}?
          </Typography>
          {hasRate && (
            <Rating
              onChange={onChange}
              rating={rating}
              space={4}
              style={styles.starView}
              starStyle={styles.star}
            />
          )}
          {hasTitle && <View style={styles.divider} />}
          <Form style={styles.inputView}>
            {hasReview && (
              <>
                {hasTitle && (
                  <Layer keyboardAvoidingView behavior="position">
                    <CustomFormInput
                      {...register('title')}
                      control={control}
                      name={'title'}
                      placeholder="Input Text Here"
                      label="Title"
                      keyboardType="default"
                    />
                  </Layer>
                )}
                {hasReview && (
                  <Layer keyboardAvoidingView behavior="position">
                    <CustomFormInput
                      {...register('review')}
                      control={control}
                      name={'review'}
                      placeholder="Input Text Here"
                      label="Write Your Review"
                      keyboardType="default"
                      maxLength={300}
                      showCharCounter
                      textArea
                    />
                  </Layer>
                )}

                {(targetName === 'Product' || targetName === 'Content') &&
                  RateReviewConfig?.commentPhoto !== false && (
                    <>
                      <UploadFile
                        name={'files'}
                        multiple
                        control={control}
                        type="image"
                      />
                    </>
                  )}
              </>
            )}
            <HStack
              mt={8}
              space={4}
              width={'100%'}
              marginBottom={keyboardVisible ? keyboardHeight : 0}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <Button
                onPress={onClose}
                style={styles.btn}
                _text={{lineHeight: 15}}
                variant={'outline'}>
                <Typography color={'primary.500'} style={styles.submitTxt}>
                  Maybe Later
                </Typography>
              </Button>
              <Button
                isLoading={
                  isLoading ||
                  isLoadingProduct ||
                  isLoadingService ||
                  isLoadingEducation ||
                  isLoadingReviewEducation ||
                  isLoadinguser ||
                  userRAteLoading
                }
                onPress={handleSubmit(onSubmit)}
                _text={{lineHeight: 16}}
                style={styles.btn}>
                <Typography color={'#fff'} style={styles.submitTxt}>
                  Submit
                </Typography>
              </Button>
            </HStack>
          </Form>
        </TouchableOpacity>
      </ScrollView>
      <SubmitedRequestModal
        isVisible={isVisibleModal}
        onClose={() => [setIsVisibleModal(false), onClose()]}
      />
    </CustomActionSheet>
  );
}

const styles = StyleSheet.create({
  submitTxt: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 15,
    height: 16,
  },
  btn: {
    flex: 1,
    height: 36,
    alignItems:"center"
  },
  emptyView: {
    flex: 1,
    backgroundColor: getColor({
      color: 'primary.500',
    }),
    borderRadius: 100,
  },
  itemContainer: {
    width: 18,
    height: 18,
    borderRadius: 100,
    padding: 3,
    borderColor: getColor({color: 'primary.500'}),
    borderWidth: 2,
    marginRight: 8,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  conditionTxt: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 8,
  },
  inputView: {
    width: '100%',
    marginVertical: 16,
  },
  divider: {
    height: 1,
    backgroundColor: getColor({
      color: 'gray.300',
    }),
    marginTop: 20,
  },
  star: {
    width: 45,
    height: 45,
    margin: 10,
  },
  starView: {
    width: '100%',
    marginTop: 16,
    alignSelf: 'center',
  },
  desc: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 25,
  },
  titleSheet: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
  },
  container: {
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
  },
});
