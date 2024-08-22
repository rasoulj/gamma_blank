import React, {useState} from 'react';
import {graphqlFetcher, useMutation, useToast} from '~/components/elemental';
import {useQueryClient} from 'react-query';

export default function useService() {
  const {toast} = useToast();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const queryClient = useQueryClient();
  const {mutate: deletedEvent} = useMutation(args => {
    return graphqlFetcher(
      'mutation eventAndTicketing_removeEvent($eventId: Int!) {  eventAndTicketing_removeEvent (eventId: $eventId) {    code  }}',
      args,
    );
  });
  const {mutate: activeEvent} = useMutation(args => {
    return graphqlFetcher(
      'mutation eventAndTicketing_updateEvent($eventId: Int!,$input:EventInput!) {  eventAndTicketing_updateEvent (eventId: $eventId,input:$input) {    status  }}',
      args,
    );
  });
  const onDelete = id => {
    const input = {
      eventId: id,
    };

    deletedEvent(input, {
      onSuccess: success => {
        console.log(success);
        queryClient.invalidateQueries('getEvents');
        toast({message: 'success'});
        setShowModal(false);
      },
      onError: error => {
        console.log(error);
        toast({message: error.toString()});
      },
    });
  };
  const onActive = item => {
    const input = {
      eventId: item?.event?.id,
      input: {
        title: item?.event?.title,
        imageUrl: item?.event?.imageUrl,
        description: item?.event?.description,
        state: item?.event?.state,
        date: item?.event?.date,
        currency: item?.event?.currency,
        isActive: item?.event?.isActive ? false : true,
        city: item?.event?.city,
        streetAddress: item?.event?.streetAddress
          ? item?.event?.streetAddress
          : '',
        zipCode: item?.event?.zipCode,
        eventCategoryId: item?.event?.eventCategoryId,
        startTime: item?.event?.startTime,
        endTime: item?.event?.endTime,
        price: item?.event?.price,
        capacity: item?.event?.capacity,
        eventTypeId: item?.event?.eventTypeId,
      },
    };

    activeEvent(input, {
      onSuccess: async success => {
        console.log(success);
        await queryClient.refetchQueries(['getEvents']);
        toast({message: 'success'});
      },
      onError: error => {
        toast({message: error.toString()});
      },
    });
  };
  const result = queryClient.getQueriesData(['getEvents']);
  console.log('cache useService', result);
  return {
    showModal,
    setShowModal,
    onDelete,
    onActive,
    deleteId,
    setDeleteId,
  };
}
