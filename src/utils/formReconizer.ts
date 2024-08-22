type RecognizerType =
  | 'prebuilt-document'
  | 'prebuilt-read'
  | 'prebuilt-layout'
  | 'prebuilt-businessCard'
  | 'prebuilt-idDocument'
  | 'prebuilt-invoice'
  | 'prebuilt-receipt'
  | 'prebuilt-tax.us.w2'
  | 'prebuilt-vaccinationCard'
  | 'prebuilt-healthInsuranceCard.us';
interface Input {
  recognizerType?: RecognizerType;
  documentUrl: string;
  returnType: 'content' | 'keyvalue';
}

type Item = {
  key: {
    content: string;
  };
  value: {
    content: string;
  };
};

const endpoint = 'https://aps-form-recognizer.cognitiveservices.azure.com';
const subscriptionKey = 'b874fc9cacfc4ac5878c0e88c0ac2c42';

let defaultRecognizerType: RecognizerType = 'prebuilt-read';

const formReconizer = async ({
  recognizerType,
  documentUrl,
  returnType = 'content',
}: Input): Promise<any> => {
  try {
    if (!recognizerType) {
      defaultRecognizerType = suggestDefaultModelID(documentUrl);
    }

    const response = await fetch(
      `${endpoint}/formrecognizer/documentModels/${
        recognizerType || defaultRecognizerType
      }:analyze?api-version=2022-08-31&pages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
        body: JSON.stringify({
          urlSource: documentUrl,
        }),
      },
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      handleErrorResponse(errorResponse);
      return;
    }

    const operationLocation = response.headers.get('Operation-location');

    if (!operationLocation) {
      return 'Operation-location header not found in the response.';
    }

    return await pollForResult(operationLocation, returnType);
  } catch (error) {
    return 'An error occurred while processing the request.';
  }
};

async function pollForResult(
  operationLocation: string,
  returnType: Input['returnType'],
) {
  try {
    const pollingInterval = 1000;
    let status = 'running';

    while (status === 'running' || status === 'notStarted') {
      await new Promise(resolve => setTimeout(resolve, pollingInterval));

      const analyzeResponse = await fetch(operationLocation, {
        headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
      });

      if (!analyzeResponse.ok) {
        const analyzeErrorResponse = await analyzeResponse.json();
        handleErrorResponse(analyzeErrorResponse);
        return;
      }

      const analyzeData = await analyzeResponse.json();
      status = analyzeData.status;

      if (status === 'succeeded') {
        if (returnType === 'content') {
          return analyzeData.analyzeResult.content;
        }

        return JSON.stringify(
          mapToKeyValue(analyzeData.analyzeResult.keyValuePairs),
        );
      } else if (status === 'failed') {
        return 'Analyze operation failed.';
      }
    }
  } catch (error) {
    return 'An error occurred while polling for analyze results.';
  }
}

function handleErrorResponse(errorResponse) {
  if (errorResponse.error && errorResponse.error.code) {
    switch (errorResponse.error.code) {
      case 'Forbidden':
        if (
          errorResponse.error.innererror &&
          errorResponse.error.innererror.code
        ) {
          switch (errorResponse.error.innererror.code) {
            case 'AuthorizationFailed':
              return `Authorization failed: ${errorResponse.error.innererror.message}`;
            case 'InvalidDataProtectionKey':
              return `Data protection key is invalid: ${errorResponse.error.innererror.message}`;
            default:
              return 'Access forbidden due to policy or other configuration.';
          }
        } else {
          return 'Access forbidden due to policy or other configuration.';
        }
      case 'OutboundAccessForbidden':
        return 'The request contains a domain name that is not allowed by the current access control policy.';
      default:
        return 'An error occurred during the request.';
    }
  } else {
    return 'An error occurred during the request.';
  }
}
function suggestDefaultModelID(documentUrl = ''): RecognizerType {
  if (typeof documentUrl !== 'string') return 'prebuilt-document';

  const extension = documentUrl.split('.').pop().toLowerCase();

  switch (extension) {
    case 'pdf':
      return 'prebuilt-document';
    case 'jpeg':
    case 'jpg':
    case 'png':
    case 'tiff':
    case 'bmp':
      return 'prebuilt-layout';
    default:
      return 'prebuilt-read';
  }
}

const mapToKeyValue = (arr: Item[]): Array<Record<string, string> | string> => {
  return arr.map(item => {
    if (!item?.value?.content) {
      return item.key.content;
    }
    return {
      [item.key.content]: item?.value?.content,
    };
  });
};

export default formReconizer;
