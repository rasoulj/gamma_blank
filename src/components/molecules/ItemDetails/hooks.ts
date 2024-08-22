import {gql} from 'graphql-request';
import {useInfiniteQuery, useQuery} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

export const useGetItems = itemId => {
  return useQuery(['getItems'], async () => {
    return graphqlFetcher(GET_ITEMS, itemId);
  });
};

export const GET_ITEMS = gql`
  query ecommerce_getItem($itemId: Int!) {
    ecommerce_getItem(itemId: $itemId) {
      result {
        calory
        sectionValues {
          key
          value
          sectionId
          section {
            name
            id
          }
          itemId
        }

        title
        price
        description
        imageUrl
        quantity

        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;
