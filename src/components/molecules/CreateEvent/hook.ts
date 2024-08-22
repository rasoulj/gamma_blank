import { gql } from "graphql-request";
import useMutation from "../../elemental/cache/use_mutation";
import { graphqlFetcher } from "../../atoms/Provider/AuthProvider";




export function useCreateEvent() {
    return useMutation(args => {
      return graphqlFetcher(CREATE_EVENT, args);
    });
  }

  const CREATE_EVENT = gql`
  mutation eventAndTicketing_createEvent($input: EventInput!) {
    eventAndTicketing_createEvent(input: $input) {
      status
    }
  }
`;