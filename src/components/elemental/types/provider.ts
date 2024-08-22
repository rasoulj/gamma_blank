import { Dispatch, SetStateAction } from 'react';
import { APIOptions } from './api';
import { User } from './auth';

export type ElementalState = {};

export type AuthProviderState = { user?: User; authError?: any };

export type AuthProviderContextProps = {
  state: AuthProviderState;
  setState: Dispatch<SetStateAction<AuthProviderState>>;
};

export type ElementalContextProps = {
  state: ElementalState;
  setState?: Dispatch<SetStateAction<ElementalState>>;
};
