import React, {useEffect, useMemo, useState} from 'react';
import {useQueryClient} from 'react-query';
import {
  Layer,
  LoadIndicator,
  Typography,
  deviceWidth,
  useNavigate,
  useRoute,
  useToast,
} from '~/components/elemental';
import useHeader from '~/components/elemental/hooks/use_header';
import CreationStep from '../../Product/CreateProduct/Components/CreationStep';
import {StyleSheet} from 'react-native';
import CourseInformation from './CourseInformation';
import CourseCertificate from './CourseCertificate';
import CourseFaqs from './CourseFaqs';
import EnrollStatusModal from '../../CourseDetail/Modals/EnrollStatusModal';
import {
  useCreateCourse,
  useGetCourses,
  useUpdateCourse,
} from '../../CourseList/hook';
import useAuthStore from '~/stores/authStore';
import {getColor} from '~/utils/helper/theme.methods';

const CreateCourse = ({
  preAction,
  postAction,
}: {
  preAction?: (values) => boolean;
  postAction?: (values?: any) => boolean;
}) => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const {navigateWithName} = useNavigate();
  const queryClient = useQueryClient();
  const {toast} = useToast();
  const route: any = useRoute();

  const user = useAuthStore(state => state?.user);

  const {data: educatorCourses}: any = useGetCourses({
    where: {course: {user: {id: {eq: user?.id}}}},
  });

  const informationInput = {
    title: route?.params?.item?.title,
    price: Number(route?.params?.item?.price),
    description: route?.params?.item?.description,
    category: route?.params?.item?.category,
    subcategory: route?.params?.item?.subcategory,
    photoUrl: route?.params?.item?.photoUrl,
    paymentTopicConfiguration: route?.params?.item?.paymentTopicConfiguration,
    keywords: route?.params?.item
      ? JSON.parse(route?.params?.item?.keywords)
      : null,
    faqs: route?.params?.item ? JSON.parse(route?.params?.item?.faq) : null,
    aboutCertificate: route?.params?.item?.aboutCertificate,
    isDraft: route?.params?.item?.isDraft,
    level: route?.params?.item?.level,
    hasCertificate: route?.params?.item?.hasCertificate,
  };
  const [productData, setProductData]: any = useState(null);

  useEffect(() => {
    if (route?.params?.item) {
      setProductData(informationInput);
    }
  }, []);

  useEffect(() => {
    if (!user?.profession) {
      toast({message: 'Please complete your profile', type: 'error'});
      navigateWithName('EducatorEditProfile');
    }
  }, []);

  const logo = useMemo(
    () => (
      <Typography fontWeight={'700'} fontSize="2xl" color="gray.800">
        {route?.params?.item ? 'Edit Course' : 'Create Course'}
      </Typography>
    ),
    [route?.params?.item],
  );

  const {} = useHeader({
    logo,
    hasBack: false,
    hasTitle: false,
  });

  const {mutate, isLoading} = route?.params?.item
    ? useUpdateCourse()
    : useCreateCourse();

  function checkDuplicateLessonTitle(newTitle) {
    for (const {course} of educatorCourses?.pages) {
      if (course.title?.toLowerCase() === newTitle?.toLowerCase()) {
        return true;
      }
    }

    return false;
  }

  const submitForm = async data => {
    const result = await preAction?.(data);
    if (result === false) {
      return;
    }

    if (!user?.profession) {
      toast({message: 'Please complete your profile', type: 'error'});
      navigateWithName('EducatorEditProfile');
      return;
    }

    const submitInput = {
      id: route?.params?.item?.id || null,
      title: data?.title,
      price: Number(data?.price) ?? 0,
      description: data?.description,
      photoUrl: data?.photoUrl,
      category: data?.category,
      subcategory: data?.subcategory,
      faq: JSON.stringify(data?.faqs),
      level: data?.level,
      keywords: JSON.stringify(data?.keywords),
      isDraft: route?.params?.item?.isDraft ?? true,
      hasCertificate: data?.hasCertificate,
      aboutCertificate: data?.aboutCertificate,
      paymentTopicConfiguration: data?.paymentTopicConfiguration,
    };

    mutate(
      {input: submitInput},
      {
        onSuccess: (data: any) => {
          if (
            data?.course_createCourse?.status?.value === 'Success' ||
            data?.course_updateCourse?.status?.value === 'Success'
          ) {
            postAction?.(productData);
            setProductData({});
            setShowModal(true);
          }
          queryClient.invalidateQueries(['getCourses']);
        },
        onError: error => {
          toast({message: error.toString()});
        },
      },
    );
  };

  const renderPage = () => {
    switch (page) {
      case 1:
        return (
          <CourseInformation
            productData={
              !route?.params?.item
                ? productData
                : {...productData, ...informationInput}
            }
            setProductData={d => {
              if (checkDuplicateLessonTitle(d?.title) && !route?.params?.item) {
                toast({
                  message: `The title "${d?.title}" already exists.\nPlease change title of this course.`,
                  type: 'error',
                  containerStyle: styles.toastPosition,
                  style: styles.errorToast,
                });

                return false;
              }
              [setProductData({...productData, ...d}), setPage(2)];
            }}
          />
        );

      case 2:
        return (
          <CourseCertificate
            productData={!route?.params?.item ? productData : {...productData}}
            setProductData={d => [
              setProductData({...productData, ...d}),
              setPage(3),
            ]}
          />
        );

      case 3:
        return (
          <CourseFaqs
            productData={!route?.params?.item ? productData : {...productData}}
            setProductData={d => [
              setProductData({...productData, ...d}),
              submitForm(d),
            ]}
          />
        );

      default:
        return <Typography>no page</Typography>;
    }
  };

  return (
    <Layer style={styles.flex}>
      <CreationStep page={page} setPage={setPage} counter={3} />
      {isLoading && (
        <LoadIndicator height="100%" style={{width: deviceWidth}} />
      )}
      {renderPage()}
      <EnrollStatusModal
        iconSize={24}
        isVisible={showModal}
        title={`Your course created \nSuccessfully!`}
        description={`View Course on “My courses”\nto add your lessons.`}
        onClose={() => {
          setShowModal(false);
          navigateWithName('EducationHome');
        }}
      />
    </Layer>
  );
};

export default CreateCourse;

const styles = StyleSheet.create({
  flex: {flex: 1},

  toastPosition: {
    top: 55,
  },

  errorToast: {
    backgroundColor: getColor({color: 'error.100'}),
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
