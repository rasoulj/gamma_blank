import {
  Keys,
  Handler,
  Options,
  KeyCache,
  Listener,
  State,
  Key,
} from '../types/cache';

class ElementalCache {
  cache = {};

  apply(keys: Keys, handler: Handler, options?: Options) {
    if (!options) options = {enabled: true};
    if (!options.enabled) return;

    const {dependency, ...otherKeys} = parseKeys(keys);

    if (!otherKeys.mainKey) return;

    const previousDependency = this.getValue(otherKeys, 'dependency');

    if (previousDependency) return previousDependency;

    const keyCache: KeyCache = {
      state: this.getValue(otherKeys, 'state'),
      handler,
      options,
      dependency,
      listeners: new Set(),
    };

    this.createCache(keyCache, otherKeys);

    return keyCache.dependency;
  }

  createCache(keyCache: KeyCache, {mainKey, subKey}: Partial<Key>) {
    if (!this.cache[mainKey]) {
      this.cache[mainKey] = {main: undefined, sub: {}};
    }

    if (!subKey && !this.cache[mainKey].main) {
      this.cache[mainKey].main = keyCache;
    }

    if (subKey && !this.cache[mainKey].sub[subKey]) {
      this.cache[mainKey].sub[subKey] = keyCache;
    }
  }

  subscribe(keys: Keys, listener: Listener = () => {}) {
    const key = parseKeys(keys);

    if (typeof listener !== 'function') {
      warn(['listener must be a function']);
    }

    const listeners = this.getValue(key, 'listeners');
    const state = this.getValue(key, 'state');

    listeners?.add?.(listener);

    if (state === undefined) {
      this.fetch(key);
    } else {
      listener(state);
    }

    return () => listeners?.delete?.(listener);
  }

  getValue({mainKey, subKey}: Key, property: keyof KeyCache) {
    if (subKey) {
      return this.cache[mainKey]?.sub?.[subKey]?.[property];
    } else {
      return this.cache?.[mainKey]?.main?.[property];
    }
  }

  async fetch(key: Key) {
    const {
      onError,
      onSuccess,
      keepPreviousData = true,
    }: KeyCache['options'] = this.getValue(key, 'options');

    const {data: oldData} = this.getValue(key, 'state') || {};

    this.setState(key, {
      isLoading: true,
      data: keepPreviousData ? oldData : undefined,
    });
    this.notify(key);

    let err;

    for (let i = 0; i < 5; i++) {
      try {
        const handler = this.getValue(key, 'handler');
        const data = await handler();

        this.setState(key, {data, isLoading: false});
        onSuccess?.(data);

        break;
      } catch (error) {
        err = error;

        this.setState(key, {error, isLoading: false, data: oldData});
      }
    }

    this.notify(key);

    if (err) onError?.(err);
  }

  setState({mainKey, subKey}: Key, state: State<any>) {
    if (subKey) {
      this.cache[mainKey].sub[subKey].state = state;
    } else if (this.cache[mainKey].main) {
      this.cache[mainKey].main.state = state;
    }
  }

  notify(key: Key) {
    const listeners = this.getValue(key, 'listeners') || [];
    const state = this.getValue(key, 'state');

    listeners.forEach((listener: Listener) => listener(state));
  }

  refetch(keys: Keys) {
    const {mainKey, subKey} = parseKeys(keys);

    if (!mainKey) return;

    const subKeys = this.cache?.[mainKey]?.sub
      ? Object.keys(this.cache[mainKey].sub)
      : [];

    this.fetch({mainKey, subKey});

    if (!subKey) {
      subKeys.forEach(subKey => this.fetch({mainKey, subKey}));
    }
  }

  invalidate(keys: Keys) {
    const {mainKey, subKey} = parseKeys(keys);

    if (!mainKey) return;

    const listeners = this.getValue({mainKey, subKey}, 'listeners') || [];

    if (subKey) {
      delete this.cache[mainKey].sub[subKey];
    } else {
      Object.keys(this.cache[mainKey].sub || {}).forEach(subKey =>
        listeners.push(...this.cache[mainKey].sub[subKey].listeners),
      );

      delete this.cache[mainKey];
    }

    listeners.forEach((listener: Listener) => listener({}));
  }

  get(keys: Keys): State<any> {
    const key = parseKeys(keys);

    if (!key.mainKey) return {};

    return this.getValue(key, 'state') || {};
  }

  set(keys: Keys, data: any) {
    const key = parseKeys(keys);
    const state = this.getValue(key, 'state');

    if (key.mainKey && state) {
      this.setState(key, {...state, data});
      this.notify(key);
    } else if (key.mainKey && !state) {
      this.store(keys, data);
    }
  }

  store(keys: Keys, data: any) {
    this.createCache({state: {data}}, parseKeys(keys));
  }
}

const cache = new ElementalCache();

export default cache;

function stringifyKey(key: any): string {
  if (!Array.isArray(key)) key = [key];

  return key
    .map(item => {
      if (Array.isArray(item)) {
        item = stringifyKey(item);
      } else if (item instanceof Object) {
        item = stringifyKey(
          Object.entries(item).map(
            ([key, value]) => `${key}${stringifyKey(value)}`,
          ),
        );
      } else {
        item = String(item);
      }

      return item;
    })
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
    .join('');
}

function warn(message: string[]) {
  console.warn(message.join('\n'));
}

function parseKeys(keys: Keys): Key & {dependency?: Array<any>} {
  if (!keys) {
    warn(['key is required']);

    return {};
  }

  if (!Array.isArray(keys)) keys = [keys];

  const [mainKey, ...rest] = keys;

  return {
    mainKey: stringifyKey(mainKey),
    subKey: stringifyKey(rest),
    dependency: [...keys],
  };
}
