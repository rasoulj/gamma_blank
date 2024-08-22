import {gql} from 'graphql-request';
import {graphqlFetcher} from '~/components/elemental';

const SEND_EMAIL = gql`
  mutation email_sendEmail($emailInput: EmailInput!) {
    email_sendEmail(emailInput: $emailInput) {
      result {
        toEmailAddress
        toName
        subject
        plainTextContent
        htmlContent
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

async function sendEmail({
  title,
  description,
  receiver,
  attachments,
}: {
  title: string;
  description: string;
  receiver: string;
  attachments?: Array<{
    url?: string;
    fileName?: string;
  }>;
}) {
  const response: any = await graphqlFetcher(SEND_EMAIL, {
    emailInput: {
      toEmailAddress: receiver,
      subject: `${title}`,
      plainTextContent:`${description}`,
      attachments: attachments,
    },
  });
  return response?.email_sendEmail?.status?.value === 'Success';
}

export default sendEmail;
