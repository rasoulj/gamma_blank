import {gql} from 'graphql-request';
import {graphqlFetcher} from '~/components/elemental';

const SEND_SMS = gql`
  mutation sms_sendSms($smsInput: SmsInput!) {
    sms_sendSms(smsInput: $smsInput) {
      status
    }
  }
`;

async function sendSms({
  title,
  description,
  receiver,
}: {
  title: string;
  description: string;
  receiver: string;
}) {
  const response: any = await graphqlFetcher(SEND_SMS, {
    emailInput: {
      toNumber: receiver,
      text: `${title}, \n${description}`,
    },
  });
  return response?.sms_sendSms?.status?.value === 'Success';
}

export default sendSms;
