import React, {Fragment, memo, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  HStack,
  Image,
  PlusIcon,
  Pressable,
  Typography,
  VStack,
  getColor,
} from '~/components/elemental';
import User3Icon from '~/assets/icons/user3icon';
import AskQuestionModal from '~/components/molecules/AskQuestionModal';
import FemaleIcon from '~/assets/icons/FemaleUser.icon';
import useAuthStore from '~/stores/authStore';
import {appFormatDate} from '~/utils/helper';

const LessonQuestions = ({topicId, data, educator}) => {
  const [reviewVisible, setReviewVisible] = useState(false);

  const user = useAuthStore(state => state?.user);

  const [selectedItem, setSelectedItem] = useState();

  const handleArrowDirection = i => {
    selectedItem == i ? setSelectedItem() : setSelectedItem(i);
  };

  const listHeaderComponent = () => {
    return (
      <HStack
        justifyContent={'space-between'}
        alignItems={'center'}
        mt="8"
        mb="4">
        <Typography
          fontSize="md"
          fontWeight={'700'}
          lineHeight={22}
          color={'gray.800'}>
          Questions
        </Typography>
        {user?.id !== educator?.id && (
          <Button
            style={styles.btn}
            onPress={() => setReviewVisible(true)}
            leftIcon={<PlusIcon color={getColor({color: 'primary.500'})} />}
            variant={'outline'}
            iconStyle={{marginRight: 8}}>
            <Typography
              ml="2"
              color={getColor({color: 'primary.500'})}
              fontSize="sm"
              lineHeight={16}
              fontWeight={'700'}>
              Ask a Question
            </Typography>
          </Button>
        )}
      </HStack>
    );
  };

  return (
    <Fragment>
      <FlatList
        data={data}
        contentContainerStyle={styles.TabStyle}
        ListHeaderComponent={listHeaderComponent}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <Pressable onPress={() => handleArrowDirection(index)}>
            <VStack
              w="98.5%"
              alignSelf="center"
              my="2"
              shadow={'3'}
              p="4"
              bg={getColor({color: 'background.500'})}
              borderRadius="md">
              <HStack justifyContent="space-between">
                <HStack space={'2'} flex={1}>
                  {item?.user?.photoUrl ? (
                    <Image
                      style={styles.img}
                      source={{uri: item?.user?.photoUrl}}
                    />
                  ) : (
                    <VStack
                      style={styles.img}
                      borderRadius={'full'}
                      borderWidth={1}
                      borderColor={getColor({color: 'background.700'})}>
                      <User3Icon width={30} height={30} />
                    </VStack>
                  )}
                  <VStack flex={1}>
                    <HStack alignItems={'center'} flex={1}>
                      <Typography
                        fontSize="sm"
                        color={'primary.500'}
                        fontWeight={'bold'}
                        numberOfLines={1}
                        maxWidth={'65%'}>
                        {item?.user?.fullName}
                      </Typography>
                      <Typography
                        fontSize="xs"
                        color={'gray.500'}
                        fontWeight={'400'}
                        ml="2">
                        {appFormatDate(item?.createdDate)}
                      </Typography>
                    </HStack>
                    <Typography
                      color={'gray.800'}
                      fontSize="sm"
                      lineHeight={19}
                      fontWeight={'400'}
                      flex={1}
                      mt="2">
                      {item?.question}
                    </Typography>
                  </VStack>
                </HStack>
                {item?.answer ? (
                  selectedItem === index ? (
                    <ChevronUpIcon />
                  ) : (
                    <ChevronDownIcon />
                  )
                ) : null}
              </HStack>

              {selectedItem === index && item?.answer && (
                <VStack
                  width="100%"
                  alignSelf="center"
                  mt={'4'}
                  py="2"
                  bg={getColor({color: 'background.500'})}>
                  <HStack space={'2'}>
                    {educator?.photoUrl ? (
                      <Image
                        style={styles.img}
                        source={{uri: educator?.photoUrl}}
                      />
                    ) : (
                      <VStack
                        style={styles.img}
                        borderRadius={'full'}
                        borderWidth={1}
                        borderColor={getColor({color: 'background.700'})}>
                        <FemaleIcon width={30} height={30} />
                      </VStack>
                    )}
                    <VStack flex={1}>
                      <HStack alignItems={'center'} flex={1}>
                        <Typography
                          fontSize="sm"
                          color={'secondary.500'}
                          fontWeight={'bold'}
                          maxWidth={'65%'}>
                          {educator?.fullName}
                        </Typography>
                        <Typography
                          fontSize="xs"
                          color={'gray.500'}
                          fontWeight={'400'}
                          ml="2">
                          {appFormatDate(item?.answerDate)}
                        </Typography>
                      </HStack>
                      <Typography
                        color={'gray.800'}
                        fontSize="sm"
                        lineHeight={19}
                        fontWeight={'400'}
                        flex={1}
                        mt="2">
                        {item?.answer}
                      </Typography>
                    </VStack>
                  </HStack>
                </VStack>
              )}
            </VStack>
          </Pressable>
        )}
      />
      <AskQuestionModal
        id={topicId}
        targetName="course"
        itemName={'this educator'}
        isOpen={reviewVisible}
        onClose={() => setReviewVisible(false)}
        hasReview={true}
        hasTitle={false}
      />
    </Fragment>
  );
};
export default memo(LessonQuestions);
const styles = StyleSheet.create({
  btn: {height: 36},
  TabStyle: {paddingBottom: 100},
  img: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
});
