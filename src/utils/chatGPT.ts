import {gql} from 'graphql-request';
import {graphqlFetcher} from '~/components/elemental';

const CHAT_GPT_PROMPT = gql`
  mutation gpt_promptGpt($input: GptMessageInput!) {
    gpt_promptGpt(input: $input) {
      result
      status
    }
  }
`;

async function chatGPT({
  content,
  responseType,
}: {
  content: string;
  responseType: 'TEXT' | 'YES_NO';
}) {
  const response: any = await graphqlFetcher(CHAT_GPT_PROMPT, {
    input: {content, responseType},
  });
  return response?.gpt_promptGpt?.result;
}

export default chatGPT;
