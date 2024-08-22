import React from 'react';
import {Control, RegisterOptions} from 'react-hook-form';

import dayjs from 'dayjs';

const YEAR_MILI = 31556952000;

export function calcAge(dob: Date): number {
  return Math.floor(dayjs().diff(dob) / YEAR_MILI);
}

export type DatingInputTypes =
  | 'text'
  | 'university'
  | 'textarea'
  | 'slider'
  | 'date'
  | 'select'
  | 'select-icon'
  | 'multi-select'
  | 'questions'
  | 'profile-pictures'
  | 'boolean'
  | 'age';

export function getDefaultValues(all: IDatingSetupStageData[]): any {
  const ret = {};
  for (const data of all) {
    for (const config of data.inputConfigs) {
      ret[config.name] = config.defaultValue;
      if (!config.rules) {
        ret[config.name + '_visible'] = false;
      }
    }
  }
  return ret;
}

export function getTypes(all: IDatingSetupStageData[]): any {
  const ret = {};
  for (const data of all) {
    for (const config of data.inputConfigs) {
      ret[config.name] = config.type;
      if (!config.rules) {
        ret[config.name + '_visible'] = 'boolean';
      }
    }
  }
  return ret;
}

function getDefaultValue(type: DatingInputTypes): any {
  switch (type) {
    case 'text':
      return '';
    case 'university':
      return '';
    case 'textarea':
      return '';
    case 'slider':
      return 185;
    case 'date':
      return new Date(2001, 1, 1);
    case 'select':
      return 0;
    case 'multi-select':
      return [];
    case 'questions':
      return [{q: '', a: ''}];
    case 'profile-pictures':
      [];
    case 'boolean':
      return false;
  }
}

export function zeroPad(n: number, length: number = 4): string {
  const zLen = length - (n + '').length;
  let zeros = '';
  for (let i = 0; i < zLen; i++) zeros += '0';
  return zeros + n;
}

export function serializeDatingInput(
  value: any,
  type: DatingInputTypes,
): string {
  switch (type) {
    case 'text':
    case 'textarea':
      return value ?? '';
    case 'date':
      return (value as Date).toISOString();
    case 'multi-select':
      return (value || []).join(',');
    case 'questions':
      return JSON.stringify(value || '[]');
    case 'profile-pictures':
      return (value || []).join('|');
    case 'boolean':
      return !value ? 'false' : 'true';
    case 'slider':
      return zeroPad(value);
    default:
      return value + '';
  }
}

export function desProfilePictures(value?: string): string[] {
  return (value || '[]').split('|');
}

export function deserializeDatingInput(
  value: string,
  type: DatingInputTypes,
): any {
  var ret: any;

  try {
    switch (type) {
      case 'text':
      case 'textarea':
      case 'university':
        ret = value || '';
        break;
      case 'slider':
      case 'select-icon':
      case 'select':
        ret = parseInt(value);
        break;
      case 'multi-select':
        ret = (value || '').split(',');
        break;
      case 'age':
      case 'date':
        ret = value && value != 'undefined' ? new Date(value) : new Date();
        break;
      case 'questions':
        ret = JSON.parse(value || '[]');
        break;
      case 'profile-pictures':
        ret = desProfilePictures(value);
        break;
      case 'boolean':
        ret = value === 'true';
        break;
      default:
        ret = getDefaultValue(type);
    }
  } catch (e) {
    ret = getDefaultValue(type);
  }

  return ret;
}

export interface IDatingInputOption {
  title: string;
  subtitle?: string;
  icon?: string;
  value: number;
}

export interface IDatingInput {
  view?: 'input' | 'menu';
  type?: DatingInputTypes;
  title: string;
  name: string;
  defaultValue: any;
  placeholder?: string;
  options?: Array<IDatingInputOption>;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

export interface IDatingSetupStageData {
  title?: string;
  shortTitle?: string;
  subTitle?: string;
  progressText?: string;
  inputConfigs: Array<IDatingInput>;
}

export type DatingBasePageProps = React.PropsWithRef<{
  stageData: IDatingSetupStageData;

  moveBack?: VoidFunction;
  canMoveBack: boolean;

  moveNext?: VoidFunction;
  canMoveNext: boolean;

  buttonText?: string;
  progress: number;

  needKeyboard: boolean;
}>;

export type DatingSetupInputProp = React.PropsWithRef<{
  config: IDatingInput;
  control: Control;
  errors: any;
  style?: any;
  onClose?: VoidFunction;
}>;

export type QuestionAnswer = {
  question: string;
  answer: string;
};

export function pagesToMap(all: QuestionAnswer[]) {
  const ret = {};
  for (const a of all) ret[a.question] = a.answer;
  return ret;
}
