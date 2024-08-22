import {gql} from 'graphql-request';
import {graphqlFetcher} from '~/components/elemental';

const GPT_TRANSLATE = gql`
  mutation gpt_translate($targetLanguage: String!, $text: String!) {
    gpt_translate(targetLanguage: $targetLanguage, text: $text) {
      result
      status
    }
  }
`;

async function translator({
  targetLanguage,
  text,
}: {
  targetLanguage: String;
  text: String;
}) {
  const response: any = await graphqlFetcher(GPT_TRANSLATE, {
    targetLanguage,
    text,
  });

  return response?.gpt_translate?.result;
}

export default translator;
