import React from 'react';
import {DatingSetupInputProp} from '../../types';
import {DatingTextInput} from './DatingTextInput';
import {DatingDateInput} from './DatingDateInput';
import {DatingSelectInput} from './DatingSelectInput';
import {DatingMultiSelectInput} from './DatingMultiSelectInput';
import {Typography} from '~/components';
import {DatingSliderInput} from './DatingSliderInput';
import {QuestionsInput} from './QuestionsInput';
import {ProfilePicturesInput} from './ProfilePicturesInput';
import {UniversitySelectInput} from './UniversitySelectInput';

export function DatingSetupInput(props: DatingSetupInputProp): JSX.Element {
  const type = props?.config.type || 'text';
  switch (type) {
    case 'textarea':
    case 'text':
      return <DatingTextInput {...props} />;

    case 'age':
    case 'date':
      return <DatingDateInput {...props} />;

    case 'select-icon':
    case 'select':
      return <DatingSelectInput {...props} />;

    case 'multi-select':
      return <DatingMultiSelectInput {...props} />;

    case 'slider':
      return <DatingSliderInput {...props} />;

    case 'questions':
      return <QuestionsInput {...props} />;

    case 'profile-pictures':
      return <ProfilePicturesInput {...props} />;

    case 'university':
      return <UniversitySelectInput {...props} />;

    default:
      return (
        <Typography color="error.600" fontWeight="600" fontSize="lg">
          Not implemented: {type}
        </Typography>
      );
  }
}
