import React, {Fragment, memo} from 'react';
import styles from './styles';
import {getColor, HStack, Typography, VStack} from '~/components/elemental';
import FAQList from '~/components/molecules/FaqList';
import {Tabs} from 'react-native-collapsible-tab-view';
import useAuthStore from '~/stores/authStore';
import ExamIcon from '~/assets/icons/CustomIcons/ExamIcon';
import ExamSuccessStatus from '~/assets/icons/CustomIcons/ExamSuccessStatus';

const AboutCourse = ({data}) => {
  const user = useAuthStore(state => state?.user);

  return (
    <Tabs.ScrollView
      scrollEventThrottle={400}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.TabStyle}>
      <Typography mt={'4'} style={styles.content} color="gray.800">
        {data?.description}
      </Typography>
      {data?.keywords && JSON.parse(data?.keywords)?.length > 0 && (
        <Fragment>
          <Typography
            fontWeight={'700'}
            fontSize="lg"
            lineHeight={24}
            color="gray.800"
            mt="2">
            Keywords
          </Typography>
          <HStack style={styles.flexWrap}>
            {JSON.parse(data?.keywords)?.map(
              (element: string, elementIndex: number) => {
                return (
                  <HStack
                    key={elementIndex}
                    alignItems="center"
                    borderRadius="xl"
                    bg={getColor({color: 'primary.100'})}
                    mb={'2'}
                    mr={'2'}
                    p={'2.5'}>
                    <Typography
                      fontSize={'md'}
                      lineHeight={22}
                      fontWeight={'500'}
                      mx="1"
                      color={getColor({color: 'gray.800'})}>
                      {element}
                    </Typography>
                  </HStack>
                );
              },
            )}
          </HStack>
        </Fragment>
      )}
      {(data?.hasCertificate || user?.userRole === 'educator') && (
        <Fragment>
          <Typography
            fontWeight={'700'}
            fontSize="lg"
            lineHeight={24}
            color="gray.800"
            mt="2">
            Certificate
          </Typography>
          {!data?.hasCertificate ? (
            <VStack alignItems={'center'} my="7">
              <ExamIcon width={166} height={144} />
            </VStack>
          ) : (
            <Typography
              fontWeight={'400'}
              fontSize="sm"
              lineHeight={19}
              color="gray.800"
              mt="2"
              mb="2.5">
              {data?.aboutCertificate}
            </Typography>
          )}
        </Fragment>
      )}
      {(data?.faq || user?.userRole === 'educator') && (
        <Fragment>
          <Typography fontSize="lg" fontWeight={'700'} lineHeight={24} mb="2">
            FAQs
          </Typography>
          {JSON.parse(data?.faq).length > 0 ? (
            <FAQList data={JSON.parse(data?.faq)} />
          ) : (
            <VStack alignItems={'center'} mt="7">
              <ExamSuccessStatus width={138} height={159} />
            </VStack>
          )}
        </Fragment>
      )}
    </Tabs.ScrollView>
  );
};
export default memo(AboutCourse);
