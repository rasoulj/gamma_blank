import {gql} from 'graphql-request';
import {useMutation} from 'react-query';
import {graphqlFetcher} from '~/components/elemental';

export function useCreateViolationReport() {
  return useMutation((args: any) => {
    return graphqlFetcher(VIOLATION_REPORT, args);
  });
}

export const VIOLATION_REPORT = gql`
  mutation (
    $data: String
    $userId: Int
    $reason: String
    $defaultViolationId: Int
    $targetEntityId: Int
    $targetEntityName: String
  ) {
    violationReport_createViolationReport(
      input: {
        data: $data
        userId: $userId
        reason: $reason
        defaultViolationId: $defaultViolationId
        targetEntityId: $targetEntityId
        targetEntityName: $targetEntityName
      }
    ) {
      result {
        data
        userId
        targetEntityId
        targetEntityName
        defaultViolationId
        reason
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;
