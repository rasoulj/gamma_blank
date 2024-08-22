import React, {memo, useState} from 'react';
import {FlatList, Linking, TouchableOpacity} from 'react-native';
import styles from './styles';
import {
  getColor,
  HStack,
  Image,
  Typography,
  VStack,
} from '~/components/elemental';
import {Tabs} from 'react-native-collapsible-tab-view';
import CourseItemIcon from '~/assets/icons/CustomIcons/CourseItem.icon';
import FaceBookIcon from '~/assets/icons/CustomIcons/Facebook.icon';
import YoutubeIcon from '~/assets/icons/CustomIcons/Youtube.icon';
import CircleInstagramIcon from '~/assets/icons/CustomIcons/CircleInstagramIcon';
import LinkedInIcon from '~/assets/icons/CustomIcons/LinkedIn.icon';

const maxCaptionChar = 140;

const AboutEducator = ({
  data,
  speciality,
  certificate,
  socialMedia,
  certificates,
}) => {
  const [desLength, setDesLength] = useState(140);

  const renderItem = ({item}) => {
    return item?.url ? (
      <Image style={styles.certificate} source={{uri: item?.url}} />
    ) : (
      <VStack
        alignSelf={'center'}
        width={303}
        height={166}
        p="2"
        mr="2"
        borderRadius={5}
        borderWidth={1}
        borderColor={getColor({color: 'background.700'})}>
        <CourseItemIcon />
      </VStack>
    );
  };

  return (
    <Tabs.ScrollView
      scrollEventThrottle={400}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.TabStyle}>
      <Typography my="4">
        <Typography style={{fontSize: 14, fontWeight: '400'}} color="gray.800">
          {data?.about?.length > desLength
            ? (data?.about).substring(0, desLength - 3) + '...'
            : data?.about}
        </Typography>
        {data?.about?.length > maxCaptionChar &&
        desLength === maxCaptionChar ? (
          <TouchableOpacity onPress={() => setDesLength(2000)}>
            <Typography
              style={{
                fontSize: 16,
                fontWeight: '500',
              }}
              color="secondary.500">
              See more
            </Typography>
          </TouchableOpacity>
        ) : data?.about?.length > maxCaptionChar ? (
          <TouchableOpacity onPress={() => setDesLength(maxCaptionChar)}>
            <Typography
              style={{
                fontSize: 16,
                fontWeight: '500',
              }}
              color="secondary.500">
              See Less
            </Typography>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </Typography>
      {JSON.parse(data?.socialLinks) && socialMedia && (
        <HStack space="2">
          {JSON.parse(data?.socialLinks)[0]?.length > 0 && (
            <CircleInstagramIcon
              width={32}
              height={32}
              onPress={() => Linking.openURL(JSON.parse(data?.socialLinks)[0])}
            />
          )}
          {JSON.parse(data?.socialLinks)[1]?.length > 0 && (
            <FaceBookIcon
              width={32}
              height={32}
              onPress={() => Linking.openURL(JSON.parse(data?.socialLinks)[1])}
            />
          )}
          {JSON.parse(data?.socialLinks)[2]?.length > 0 && (
            <LinkedInIcon
              width={32}
              height={32}
              onPress={() => Linking.openURL(JSON.parse(data?.socialLinks)[2])}
            />
          )}
          {JSON.parse(data?.socialLinks)[3]?.length > 0 && (
            <YoutubeIcon
              width={32}
              height={32}
              onPress={() => Linking.openURL(JSON.parse(data?.socialLinks)[3])}
            />
          )}
        </HStack>
      )}
      {speciality?.length > 0 && (
        <>
          <Typography
            fontSize="md"
            fontWeight={'700'}
            lineHeight={22}
            mb="3"
            mt="6">
            Specialties
          </Typography>
          <HStack style={styles.flexWrap}>
            {speciality?.map((element: string, elementIndex: number) => {
              return (
                <HStack
                  key={elementIndex}
                  alignItems="center"
                  borderRadius="xl"
                  bg={getColor({color: 'primary.100'})}
                  mb={'2'}
                  mr={'2'}
                  px={'4'}
                  py={'2.5'}>
                  <Typography
                    fontSize={'md'}
                    lineHeight={22}
                    fontWeight={'500'}
                    mx="1"
                    color={getColor({color: 'gray.800'})}>
                    {element?.title}
                  </Typography>
                </HStack>
              );
            })}
          </HStack>
        </>
      )}
      {certificate?.length > 0 && certificates && (
        <>
          <Typography
            fontSize="md"
            fontWeight={'700'}
            lineHeight={22}
            mb="3"
            mt="4">
            Certificates
          </Typography>
          <FlatList
            horizontal
            data={certificate}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
          />
        </>
      )}
    </Tabs.ScrollView>
  );
};
export default memo(AboutEducator);
