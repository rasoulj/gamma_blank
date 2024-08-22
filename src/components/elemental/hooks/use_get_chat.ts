import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from 'react-query';
import {
  graphqlFetcher,
  useMutation as elementUseMutation,
} from '~/components/elemental';

export function useGetChatList(input = {}) {
  return useInfiniteQuery(
    ['getUserMessages', input],
    ({pageParam = 0}) =>
      graphqlFetcher(GET_CHAT_LIST, {
        skip: pageParam * 10,
        take: 10,
        ...input,
      }),
    {
      getNextPageParam: (lastPage, allPages: []) => {
        if (lastPage?.message_getUserMessages?.result?.pageInfo?.hasNextPage) {
          return allPages?.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(page => page?.message_getUserMessages?.result?.items)
            ?.flat()
            ?.filter(Boolean),
          totalCount:
            data?.pages[0]?.message_getUserMessages?.result?.totalCount,
        };
      },
      ...input,
    },
  );
}

const GET_CHAT_LIST = `
query message_getUserMessages($take:Int!,$where:ConversationDtoFilterInput, $order:[ConversationDtoSortInput!],$skip:Int){
  message_getUserMessages {
    result(take: $take,where: $where,order: $order,skip: $skip) {
      items{
        conversationId
        unreadCount
        receiver{
          id
          fullName
          photoUrl
          lastSeen
          lastModifiedDate
        }
        lastMessage{
          id
          text
        }
        latestMessageDate
      }
      pageInfo{
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
    status
  }
}
`;

export function useGetUserList(input = {}) {
  return useInfiniteQuery(
    ['user_getUsers', input],
    ({pageParam = 0}) =>
      graphqlFetcher(GET_USER_LIST, {
        skip: pageParam * 10,
        take: 10,
        ...input,
      }),
    {
      getNextPageParam: (lastPage, allPages: []) => {
        if (lastPage?.user_getUsers?.result?.pageInfo?.hasNextPage) {
          return allPages?.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(page => page?.user_getUsers?.result?.items)
            ?.flat()
            ?.filter(Boolean),
          totalCount: data?.pages[0]?.user_getUsers?.result?.totalCount,
        };
      },
      ...input,
    },
  );
}

const GET_USER_LIST = `
query social_getUsers($skip:Int,$take:Int,$where:UserFilterInput, $order:[UserSortInput!]){
  user_getUsers {
    result(skip: $skip,take: $take,where: $where,order: $order) {
      items {
          id
          fullName
          photoUrl
      }
      pageInfo{
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
    status
  }
}
`;

interface MessageItem {
  conversationId: number;
  text: string;
  receiverId: number;
  mediaType: string;
  mediaUrl: string;
  parentId: number;
  senderId: number;
  createdAt: string;
}

type GetMessage = {
  messages: Array<MessageItem>;
  firstUser: {id: number};
  secondUser: {id: number};
};

export function useCreateDirectMessage() {
  const queryClient = useQueryClient();

  return useMutation(
    args => {
      return graphqlFetcher(CREATE_DIRECT_MESSAGE, args);
    },
    {
      onMutate: async (item: MessageItem) => {
        const key = [
          'message_getConversation',
          {conversationId: item?.conversationId},
        ];

        const data = queryClient.getQueryData<{
          message_getConversation: {
            result: GetMessage;
          };
        }>(key);

        const firstUser = data?.message_getConversation?.result?.firstUser?.id;
        const secondUser =
          data?.message_getConversation?.result?.secondUser?.id;
        const senderId =
          firstUser === item?.receiverId ? secondUser : firstUser;

        const object = data;

        if (!data) return;

        data?.message_getConversation?.result?.messages?.push({
          createdAt: new Date().toISOString(),
          conversationId: item?.conversationId,
          text: item?.text,
          receiverId: item?.receiverId,
          mediaType: item?.mediaType,
          mediaUrl: item?.mediaUrl,
          parentId: item?.parentId,
          senderId,
        });

        queryClient.setQueryData(key, JSON.parse(JSON.stringify(data)));
        return {previousPost: object, key};
      },
      onError: (err, newTodo, {key, previousPost}) => {
        queryClient.setQueryData(key, previousPost);
      },
      onSettled: () => {
        queryClient.refetchQueries('message_getConversation');
      },
    },
  );
}

const CREATE_DIRECT_MESSAGE = `
mutation message_createDirectMessage(
  $conversationId: Int
  $text: String
  $receiverId: Int!
  $mediaType: MediaType!
  $mediaUrl: String
  $parentId: Int
  $mediaEntityId: Int
) {
  message_createDirectMessage(
    input: {
      parentId: $parentId
      mediaType: $mediaType
      conversationId: $conversationId
      text: $text
      mediaUrl: $mediaUrl
      mediaEntityId: $mediaEntityId
    }
    receiverId: $receiverId
  ) {
    result {
      id
      text
      mediaType
      mediaUrl
      parentId
      conversationId
      senderId
      mediaEntityId
    }
    status
  }
}
`;

export function useGetConversationId() {
  return useQuery(['message_getUserMessages'], () => {
    return graphqlFetcher(GET_CONVERSATION_ID);
  });
}

const GET_CONVERSATION_ID = `
query message_getUserMessages{
  message_getUserMessages{
    result{
      items{
        conversationId
        unreadCount
        receiver{
          id
          fullName
        }
      }
    }
  }
}
`;

export function useGetDirectChat(input = {}, options?: any) {
  return useQuery(
    ['message_getConversation', input],
    () => graphqlFetcher(GET_DIRECT_MESSAGE, input),
    options,
  );
}

// export function useGetDirectChat(input = {}) {
//   return useInfiniteQuery(
//     ['message_getConversation', input],
//     ({pageParam = 0}) => graphqlFetcher(GET_DIRECT_MESSAGE, {
//       skip: pageParam * 10,
//         take: 10,
//         ...input,
//     }),
//     {
//       getNextPageParam: (lastPage, allPages: []) => {
//         if (lastPage?.message_getConversation?.result?.pageInfo?.hasNextPage) {
//           return allPages?.length;
//         }
//         return undefined;
//       },
//       select: data => {
//         return {
//           ...data,
//           pages: data?.pages
//             ?.map(page => page?.message_getConversation?.result?.items)
//             ?.flat()
//             ?.filter(Boolean),
//           totalCount: data?.pages[0]?.message_getConversation?.result?.totalCount,
//         };
//       },
//       ...input,
//     },
//   );
// }

const GET_DIRECT_MESSAGE = `
query message_getConversation($conversationId:Int!){
  message_getConversation(conversationId: $conversationId) {
    result {
      secondUser{
        id
        photoUrl
        fullName
        lastModifiedDate
        lastSeen
      }
      firstUser{
        id
        photoUrl
        fullName
        lastModifiedDate
        lastSeen
      }
      latestMessageDate
      messages{
        id
        createdAt
        conversationId
        text
        senderId
        mediaType
        mediaUrl
        parentId
        mediaEntityId
        parent {
          id
          createdAt
          conversationId
          text
          senderId
          mediaType
          mediaUrl
          parentId
        }
      }
      id
    }
    status
  }
}
`;

export function useRemoveUserMessage() {
  return elementUseMutation(args => {
    return graphqlFetcher(DELETE_USER_MESSAGE, args);
  });
}

const DELETE_USER_MESSAGE = `
mutation message_removeMessage($messageId:Int!){
  message_removeMessage(messageId: $messageId) {
    code
    value
    description
  }
}
`;

export function useUpdateUserMessage() {
  return useMutation(args => {
    return graphqlFetcher(EDIT_USER_MESSAGE, args);
  });
}

const EDIT_USER_MESSAGE = `
mutation message_updateMessage($text:String,$messageId:Int!){
  message_updateMessage(text: $text, messageId: $messageId) {
    result {
      createdAt
      senderId
      text
      isEdited
      id
    }
    status
  }
}
`;
