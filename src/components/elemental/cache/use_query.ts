import {cache} from '..';
import {useEffect, useState} from 'react';
import {State, Options} from '../types/cache';

export default function useQuery<T>(
  keys: any,
  handler?: () => T | Promise<T>,
  options: Options = {},
) {
  if (options.enabled === undefined) options.enabled = true;

  const [state, setState] = useState<State<T>>(cache.get(keys) || {});
  const dependency = cache.apply(keys, handler, options);

  useEffect(() => {
    if (!dependency) return;

    const listener = (state: State<T>) => setState(state);
    const unsbscribe = cache.subscribe(dependency, listener);

    return () => unsbscribe();
  }, [dependency]);

  return state;
}
