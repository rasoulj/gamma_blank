import {useEffect} from 'react';
import useMatchAcceptedStore from '~/stores/matchAcceptedStore';
import {subscribe} from '~/utils/subscription';
import {useAuth} from '../../elemental';

const subscriptionDoc = `
subscription matchingAccepted($userId:Int!){
  matchingAccepted(userId: $userId) {
    requestedByUserId
    targetUserId
    matchStatus
    requestedByUser {
      externalId
      email
      photoUrl
      fullName
      phoneNumber
      about
      location
      age
      dateOfBirth
      streetAddress
      unitNumber
      city
      state
      zipCode
      gender
      id
      isDeleted
      createdDate
      lastModifiedDate
    }
    targetUser {
      externalId
      email
      photoUrl
      fullName
      phoneNumber
      about
      location
      age
      dateOfBirth
      streetAddress
      unitNumber
      city
      state
      zipCode
      gender
      id
      isDeleted
      createdDate
      lastModifiedDate
    }
    id
    isDeleted
    createdDate
    lastModifiedDate
  }
}
`;

export default function MatchingSubscription() {
  const {user} = useAuth();
  const userId = user?.id;
  const setMatchAccepted = useMatchAcceptedStore(
    state => state.setMatchAccepted,
  );
  const setIsOpen = useMatchAcceptedStore(state => state.setIsOpen);

  useEffect(() => {
    if (!userId) return;

    const unsbscribe = subscribe(subscriptionDoc, {userId}, listener);

    function listener(e) {
      try {
        const data = JSON.parse(e.data);

        const matchAccepted = data?.payload?.data;
        if (matchAccepted) {
          setMatchAccepted(matchAccepted);
          setIsOpen(true);
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
