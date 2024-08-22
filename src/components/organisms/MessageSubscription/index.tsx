import {useEffect, useRef} from 'react';
import {useQueryClient} from 'react-query';
import useAuth from '~/components/elemental/hooks/useAuth';
import useTrackedStore from '~/stores/store';
import {subscribe} from '~/utils/subscription';

const subscriptionDocument = `
subscription($userId:Int!){
  directMessageAdded(userId: $userId) {
    id
    createdAt
    conversationId
    text
    senderId
    mediaType
    mediaUrl
    parentId
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
}
`;

export default function MessageSubscription() {
  const {user} = useAuth();
  const userId = user?.id;
  const {chatKey} = useTrackedStore();
  const {conversationId} = chatKey || {};
  const ref = useRef(0);
  const queryClient = useQueryClient();
  ref.current = Number(conversationId);

  useEffect(() => {
    if (!userId) return;

    const unsbscribe = subscribe(subscriptionDocument, {userId}, listener);
    function listener(e) {
      try {
        const data = JSON.parse(e.data);
        const message = data?.payload?.data?.directMessageAdded;

        if (message === undefined) {
          return;
        }

        if (isNaN(ref.current) || ref.current !== message?.conversationId) {
          queryClient.invalidateQueries(['chat_messages']);
          return queryClient.refetchQueries('getUserMessages');
        }

        const key = ['message_getConversation', {conversationId: ref.current}];
        const allData: any = queryClient.getQueryData(key);

        if (!allData) return;

        allData.message_getConversation?.result.messages.push(
          message.directMessageAdded,
        );

        queryClient.setQueryData(key, JSON.parse(JSON.stringify(allData)));
      } catch (e) {
        console.log(e);
      }
    }

    return () => {
      unsbscribe();
    };
  }, [userId]);

  return null;
}
