import React, {useEffect, useRef} from 'react';
import {FlatList} from 'react-native';
import {
  InfiniteScroll,
  View,
  Typography,
  HStack,
  VStack,
  Pressable,
  Box,
  Form,
  FormInput,
  SubmitButton,
  RelativeLayout,
  //   Send2Icon,
  useQuery,
  useMutation,
  cache,
  graphqlFetcher,
  useToast,
} from '../../elemental';
import Image from '../../atoms/Image';
export default function Review({route, navigation}) {
  const id = route?.params?.id;
  const {toast} = useToast();
  const listRef = useRef<FlatList>();

  const {
    data: commentsData,
    isLoading: commentsLoading,
    error,
  } = useQuery(['comments', id], () =>
    graphqlFetcher(
      `
            query comment_getComments($id:Int!){
             comment_getComments{
               status
               result (where:{eventGalleryImageId:{eq:$id}}){
                 items {
                   id
                   content
                   user {
                     fullName
                     photoUrl
                   }
                 }
               }
             }
            }
        `,
      {id},
    ),
  );
  const comments = commentsData?.comment_getComments?.result?.items;

  const {mutate: createComment} = useMutation(args =>
    graphqlFetcher(
      `
        mutation($input:CommentInput!){
          Comment_createComment (input:$input){
            result {
              id
            }
            status
          }
        }
      `,
      args,
    ),
  );

  function renderItem({item}) {
    return (
      <HStack mx={3} my={3} space={2}>
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
          }}
          src={item?.user?.photoUrl}
        />
        <VStack
          space={2}
          style={{
            flex: 1,
          }}>
          <VStack space={2} p={3} bgColor={'#F4F9FB'} borderRadius={'lg'}>
            <HStack space={3}>
              <Typography>{item?.user?.fullName}</Typography>
              {/* <Typography color={'#006194'}>@Username</Typography> */}
            </HStack>
            <Typography color={'#828282'}>{item?.content}</Typography>
            <Typography color={'#C0C4C4'} alignSelf={'flex-end'}>
              {item?.createdDate}
            </Typography>
          </VStack>
          {/* <HStack space={3} alignItems={'center'}>
            <Pressable>
              <Typography>Like</Typography>
            </Pressable>
            <Typography>.</Typography>
            <Pressable>
              <Typography>Reply</Typography>
            </Pressable>
          </HStack> */}
        </VStack>
      </HStack>
    );
  }

  return (
    <>
      <InfiniteScroll
        ref={listRef}
        isLoading={commentsLoading}
        width={'100%'}
        data={comments}
        renderItem={renderItem}
        reverse
        mb={12}
        style={{flex: 1, backgroundColor: 'white'}}
      />

      <Form
        style={{
          width: '100%',
          flexDirection: 'row',
          padding: 10,
        }}>
        <FormInput
          placeholder="Add a comment"
          height={12}
          mr={2}
          style={{
            width: '86%',
          }}
          // InputRightElement={
          //   <Pressable onPress={onPress}>
          //     <AttachIcon
          //       style={{
          //         marginRight: 16,
          //       }}
          //     />
          //   </Pressable>
          // }
          name="content"
        />
        <SubmitButton
          flex={1}
          borderRadius={50}
          bgColor="#00E9C0"
          style={{
            width: 49,
            height: 49,
          }}
          onPress={e => {
            createComment(
              {
                input: {...e, eventGalleryImageId: id},
              },
              {
                onSuccess: data => {
                  cache.refetch(['comments', id]);
                  listRef?.current?.scrollToEnd?.({animated: true});
                  toast({message: 'Add comment success!'});
                },
              },
            );
          }}>
          {/* <Send2Icon /> */}
        </SubmitButton>
      </Form>
    </>
  );
}
