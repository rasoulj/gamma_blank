import {Options} from '../types/cache';
import {useState} from 'react';
export default function useMutation<TData, TVariables>(
  handler: (args: TVariables) => TData | Promise<TData>,
  options: Options = {},
) {
  const [state, setState] = useState({
    isLoading: undefined,
    data: undefined,
    error: undefined,
  });
  const {onSuccess, onError} = options;
  return {mutate, ...state};
  async function mutate(args: TVariables, options: Options = {}) {
    let data;
    let error;
    setState({...state, isLoading: true});
    for (let i = 0; i < 5; i++) {
      try {
        data = await handler(args);
        break;
      } catch (err) {
        error = err;
      }
    }
    setState({...state, isLoading: false, data, error});
    if (data) {
      onSuccess?.(data);
      options?.onSuccess?.(data);
    }
    if (error) {
      onError?.(error);
      options.onSuccess?.(error);
    }
  }
}
