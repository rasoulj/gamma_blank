import {cache} from '~/components/elemental';
import {useEffect, useState} from 'react';
import {State} from '../types/cache';

export default function useDrawer(id) {
  const key = ['drawer', id];
  const dependency = cache.apply(key, () => false);
  const [state, setState] = useState<State<boolean>>(cache.get(key));

  useEffect(() => {
    const unsbscribe = cache.subscribe(dependency, listener);

    function listener(state) {
      setState(state);
    }

    return () => unsbscribe();
  }, [dependency]);

  function setIsOpen(isOpen: boolean) {
    cache.set(key, isOpen);
  }

  return {isOpen: state.data || false, setIsOpen};
}
