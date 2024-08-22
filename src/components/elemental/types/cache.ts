export type State<T> = {
  data?: T;
  error?: any;
  isLoading?: boolean;
};

export type Handler = Function;

export type Key = {mainKey?: string; subKey?: string};

export type Listener = (state: State<any>) => void;

export type Listeners = Set<Listener>;

export type KeyCache = {
  state: State<any>;
  handler?: Handler;
  dependency?: Array<any>;
  listeners?: Listeners;
  options?: Options;
};

export type Cache = {
  main: KeyCache;
  sub: {
    [subKey: string]: KeyCache;
  };
};

export type Options = {
  enabled?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  keepPreviousData?: boolean;
};

export type Keys = string | Array<any>;
