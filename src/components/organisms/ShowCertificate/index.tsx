import React, {memo, useMemo, useState} from 'react';
import {
  DownloadIconSet,
  HStack,
  LoadIndicator,
  Pressable,
  VStack,
  useNavigate,
  useRoute,
  useToast,
} from '~/components';
import useHeader from '~/components/elemental/hooks/use_header';
import {useGetMyCourses} from '../CourseList/hook';
import {Share3Icon} from '~/assets';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import CertificateTemplate from '~/assets/icons/CustomIcons/CertificateTemplate';
import useAuthStore from '~/stores/authStore';
import CourseShareModal from '../CourseDetail/Modals/CourseShareModal';
import {appFormatDate} from '~/utils/helper';
import Mailer from 'react-native-mail';

const ShowCertificate = () => {
  const {params} = useRoute();
  const {toast} = useToast();
  const {navigateWithName} = useNavigate();

  const user = useAuthStore(state => state?.user);

  const [visibleShare, setVisibleShare] = useState(false);
  const [pdfDestination, setPdfDestination] = useState();

  const {data: certificationData, isLoading}: any = useGetMyCourses({
    where: {
      course: {hasCertificate: {eq: true}, id: {eq: params?.courseId}},
    },
  });

  const icons = useMemo(
    () => (
      <HStack space={'6'}>
        <Pressable onPress={() => exportToPdf('share')}>
          <Share3Icon />
        </Pressable>
        <Pressable onPress={() => exportToPdf('mail')}>
          <DownloadIconSet />
        </Pressable>
      </HStack>
    ),
    [],
  );

  const exportToPdf = async type => {
    const svgContent = () => {
      return (
        <CertificateTemplate
          width={'100%'}
          height={238}
          date={appFormatDate(new Date(), 'DD/MM/YYYY')}
          instructorName={user?.fullName}
          category={certificationData?.pages[0]?.course?.category}
          studentName={user?.fullName}
        />
      );
    };

    const {filePath} = await RNHTMLtoPDF.convert({
      html: `<html><body>${svgContent}</body></html>`,
      fileName: `${certificationData?.pages[0]?.course?.title}Certificate`,
    });

    const destPath = `${RNFS.DocumentDirectoryPath}/${certificationData?.pages[0]?.course?.title}Certificate.pdf`;

    try {
      await RNFS.moveFile(filePath, destPath);
      toast({
        message: 'The PDF file downloaded to Document directory successfully',
        type: 'success',
      });
    } catch (error) {
      toast({
        message: 'The file already exist...',
        type: 'error',
      });
    }

    if (type === 'mail') {
      Mailer.mail(
        {
          subject: `Certificate`,
          recipients: [user?.email],
          body: '',
          isHTML: true,
          attachment: {
            path: filePath,
            type: 'pdf',
            name: `${certificationData?.pages[0]?.course?.title}Certificate.pdf`,
          },
        },
        error => {
          if (error) {
            toast({
              type: 'error',
              message:
                'Could not send mail. Please check your email configuration.',
            });
          }
        },
      );
    } else {
      const options = {
        title: `${certificationData?.pages[0]?.course?.title} Certificate`,
        url: `file://${destPath}`,
        type: 'image/svg+xml',
      };
      setPdfDestination(options);
      setVisibleShare(true);
    }
  };

  const {} = useHeader({
    icons,
    hasBack: true,
    hasTitle: false,
    onBack: () => navigateWithName('CourseDetail', {id: params?.courseId}),
  });

  return isLoading ? (
    <LoadIndicator />
  ) : (
    <VStack flex={1}>
      <VStack alignItems={'center'} justifyContent={'center'} mt="40%">
        <CertificateTemplate
          width={'100%'}
          height={238}
          date={appFormatDate(
            certificationData?.pages[0]?.completeDate,
            'DD/MM/YYYY',
          )}
          instructorName={certificationData?.pages[0]?.course?.user?.fullName}
          category={certificationData?.pages[0]?.course?.category}
          studentName={user?.fullName}
        />
      </VStack>

      <CourseShareModal
        item={pdfDestination}
        isVisible={visibleShare}
        onClose={() => setVisibleShare(false)}
      />
    </VStack>
  );
};

export default memo(ShowCertificate);
