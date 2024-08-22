import {useEffect, useRef} from 'react';
import {useQueryClient} from 'react-query';
import useAuth from '~/components/elemental/hooks/useAuth';
import {subscribe} from '~/utils/subscription';

const subscriptionDoc = `
subscription ($userId:Int!){
    bookingCreated(userId: $userId) {
      customerId
      contractorId
      startTime
      endTime
      status
      price
      paid
      accepted
      fullName
      phoneNumber
      address
      serviceId
      rateCount
      rateAverage
      id
      isDeleted
      createdDate
      lastModifiedDate
    }
  }
  
`;

export default function ContractorSubscription() {
  const {user} = useAuth();
  const userId = user?.id;

  const ref = useRef(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const unsbscribe = subscribe(subscriptionDoc, {userId}, listener);
    function listener(e) {
      try {
        const data = JSON.parse(e.data);

        if (data?.payload?.data) {
          queryClient.invalidateQueries('getBookings');
        }
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
