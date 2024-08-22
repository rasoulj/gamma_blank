import React, {Fragment, useMemo} from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {
  ArrowDownIcon,
  BriefcaseIconSet,
  CalendarIconSet,
  FlatList,
  HStack,
  IMG,
  Image,
  Layer,
  Pressable,
  ScrollView,
  Setting2IconSet,
  Typography,
  User2Icon,
  VStack,
  getColor,
  useNavigate,
} from '~/components/elemental';
import useHeader from '~/components/elemental/hooks/use_header';
import {
  useGetMyCourses,
  useGetUserBadges,
  useGetUserCertificates,
  useGetUserSpecialties,
  useGetUsers,
} from '../CourseList/hook';
import EducationVerticalItem from '~/components/molecules/EducationVerticalItem';
import BadgeVerticalItem from '~/components/molecules/BadgeVerticalItem';
import useAuthStore from '~/stores/authStore';
import CircleInstagramIcon from '~/assets/icons/CustomIcons/CircleInstagramIcon';
import FaceBookIcon from '~/assets/icons/CustomIcons/Facebook.icon';
import YoutubeIcon from '~/assets/icons/CustomIcons/Youtube.icon';
import LinkedInIcon from '~/assets/icons/CustomIcons/LinkedIn.icon';
import {appFormatDate} from '~/utils/helper';
import {BadgeList} from '../Badges';

export default function EducationProfile(badges = true) {
  const {navigateWithName} = useNavigate();

  const user = useAuthStore(state => state?.user);
  const {data: certificationData}: any = useGetMyCourses({
    where: {status: {eq: 'COMPLETED'}, course: {hasCertificate: {eq: true}}},
    order: [{completeDate: 'DESC'}],
    enabled: user?.userRole !== 'educator',
  });

  const {data: userBadges}: any = useGetUserBadges({
    userId: user?.id,
    enabled: user?.userRole !== 'educator',
  });

  const {data: userData}: any = useGetUsers({
    where: {id: {eq: user?.id}},
  });

  const {data: specialityData}: any = useGetUserSpecialties({
    userId: user?.id,
    enabled: user?.userRole === 'educator',
  });

  const {data: certificateData}: any = useGetUserCertificates({
    userId: user?.id,
    enabled: user?.userRole === 'educator',
  });

  const icons = useMemo(
    () => (
      <Pressable onPress={() => navigateWithName('Setting')}>
        <Setting2IconSet style={styles.marginRight} />
      </Pressable>
    ),
    [],
  );

  const logo = useMemo(
    () => (
      <Typography fontWeight={'700'} fontSize="2xl">
        Profile
      </Typography>
    ),
    [],
  );

  const {} = useHeader({
    icons,
    logo,
    hasTitle: false,
  });

  const renderItem = ({item}) => {
    return <Image style={styles.certificate} source={{uri: item?.url}} />;
  };

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <Layer style={styles.topPanel}>
        <View style={styles.info}>
          {user?.photoUrl ? (
            <IMG style={styles.photoUrl} src={user.photoUrl} />
          ) : (
            <User2Icon style={styles.photoUrl} />
          )}
          <View style={styles.bioContainer}>
            <Typography fontWeight={'bold'} fontSize="md" color="gray.800">
              {user?.fullName}
            </Typography>
            <Typography mt="2" fontSize="sm" color="gray.500" numberOfLines={1}>
              {user?.userRole === 'educator' ? user?.profession : user?.email}
            </Typography>
          </View>
        </View>
        {user?.userRole === 'educator' && userData?.pages[0]?.about && (
          <Typography
            fontWeight={'400'}
            fontSize="sm"
            color="gray.500"
            mt={'6'}>
            {userData?.pages[0]?.about}
          </Typography>
        )}
      </Layer>
      {user?.userRole === 'educator' && (
        <Fragment>
          <HStack space={'2'} alignItems={'center'} my={'2'} mt={'4'}>
            <CalendarIconSet />
            <Typography style={styles.date}>
              Joined{' '}
              {appFormatDate(userData?.pages[0]?.createdDate, 'MMM YYYY')}
            </Typography>
          </HStack>
          {userData?.pages?.length > 0 && (
            <HStack space={'2'} alignItems={'center'}>
              <BriefcaseIconSet />
              <Typography style={styles.date}>
                {userData?.pages[0]?.yearsOfExperience} years of Experience
              </Typography>
            </HStack>
          )}
        </Fragment>
      )}
      {user?.userRole === 'educator' && (
        <Fragment>
          {specialityData?.pages?.length > 0 && (
            <Fragment>
              <Typography
                fontSize="md"
                fontWeight={'700'}
                lineHeight={22}
                color="gray.800"
                mb="3"
                mt="5">
                Specialties
              </Typography>
              <HStack style={styles.flexWrap}>
                {specialityData?.pages?.map(
                  (element: string, elementIndex: number) => {
                    return (
                      <HStack
                        key={elementIndex}
                        alignItems="center"
                        borderRadius="xl"
                        bg={getColor({color: 'primary.100'})}
                        mb={'2'}
                        mr={'2'}
                        px={'4'}
                        py={'3'}>
                        <Typography
                          fontSize={'mg'}
                          lineHeight={22}
                          fontWeight={'500'}
                          mx="1"
                          color={getColor({color: 'gray.800'})}>
                          {element?.title}
                        </Typography>
                      </HStack>
                    );
                  },
                )}
              </HStack>
            </Fragment>
          )}
          {user?.socialLinks && (
            <HStack space="2" mt="4">
              {JSON.parse(user?.socialLinks)[0]?.length > 0 && (
                <CircleInstagramIcon
                  width={32}
                  height={32}
                  onPress={() =>
                    Linking.openURL(JSON.parse(user?.socialLinks)[0])
                  }
                />
              )}
              {JSON.parse(user?.socialLinks)[1]?.length > 0 && (
                <FaceBookIcon
                  width={32}
                  height={32}
                  onPress={() =>
                    Linking.openURL(JSON.parse(user?.socialLinks)[1])
                  }
                />
              )}
              {JSON.parse(user?.socialLinks)[2]?.length > 0 && (
                <LinkedInIcon
                  width={32}
                  height={32}
                  onPress={() =>
                    Linking.openURL(JSON.parse(user?.socialLinks)[2])
                  }
                />
              )}
              {JSON.parse(user?.socialLinks)[3]?.length > 0 && (
                <YoutubeIcon
                  width={32}
                  height={32}
                  onPress={() =>
                    Linking.openURL(JSON.parse(user?.socialLinks)[3])
                  }
                />
              )}
            </HStack>
          )}
        </Fragment>
      )}
      {user?.userRole !== 'educator' && badges && (
        <Typography fontWeight={'700'} fontSize="md" mt="5" mb="2">
          Badges
        </Typography>
      )}
      {user?.userRole !== 'educator' &&
        badges &&
        BadgeList?.slice(0, 3)?.map(item => (
          <BadgeVerticalItem
            item={item}
            style={styles.margin}
            userBadge={userBadges?.pages}
            onItemPress={() => {}}
          />
        ))}
      {user?.userRole !== 'educator' && badges && (
        <Pressable
          alignSelf={'center'}
          justifyContent={'center'}
          mt="6"
          onPress={() => navigateWithName('Badges')}>
          <Typography
            fontSize="sm"
            lineHeight={19}
            fontWeight={'500'}
            color={getColor({color: 'secondary.500'})}>
            See more
          </Typography>
          <VStack alignSelf={'center'} mt="2">
            <ArrowDownIcon color={getColor({color: 'secondary.500'})} />
          </VStack>
        </Pressable>
      )}
      {(certificationData?.pages?.length > 0 ||
        certificateData?.pages?.length > 0) && (
        <Typography fontWeight={'700'} fontSize="md" mt="5" mb="2">
          Certificates
        </Typography>
      )}

      {user?.userRole === 'educator' && (
        <FlatList
          horizontal
          data={certificateData?.pages}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
        />
      )}
      {user?.userRole !== 'educator' &&
        certificationData?.pages?.slice(0, 3)?.map(item => (
          <EducationVerticalItem
            course={item}
            style={styles.margin}
            onCoursePress={() => {
              navigateWithName('CourseDetails', {id: item?.courseId});
            }}
          />
        ))}
      {user?.userRole !== 'educator' &&
        certificationData?.pages?.length > 3 && (
          <Pressable
            alignSelf={'center'}
            justifyContent={'center'}
            mt="6"
            onPress={() =>
              navigateWithName('CourseList', {
                data: 'Certificates',
                filter: `{course: {hasCertificate: {eq: true},isDraft: {eq: false}}`,
              })
            }>
            <Typography
              fontSize="3.5"
              lineHeight={19}
              fontWeight={'500'}
              color={getColor({color: 'secondary.500'})}>
              See more
            </Typography>
            <VStack alignSelf={'center'} mt="2">
              <ArrowDownIcon color={getColor({color: 'secondary.500'})} />
            </VStack>
          </Pressable>
        )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  topPanel: {
    shadowColor: getColor({color: 'gray.300'}),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: getColor({color: 'background.400'}),
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
    padding: 16,
    marginTop: 8,
    paddingBottom: 20,
    borderRadius: 15,
  },

  photoUrl: {
    width: 90,
    height: 90,
    borderRadius: 90,
    marginLeft: 6,
  },

  bioContainer: {
    flex: 1,
    marginLeft: 16,
  },

  verticalView: {
    marginHorizontal: 0,
  },

  margin: {marginHorizontal: 2},

  container: {
    paddingHorizontal: 2,
    paddingBottom: 30,
  },

  date: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19,
    color: getColor({color: 'gray.400'}),
  },

  flexWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1,
  },

  certificate: {
    width: 233,
    height: 166,
    borderRadius: 5,
    marginRight: 8,
  },

  marginRight: {marginRight: 5},
});
