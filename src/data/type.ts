import {CSSProperties} from 'react';

enum EntityState {
  Default = 'DEFAULT',
  Deleted = 'DELETED',
  Modified = 'MODIFIED',
  New = 'NEW',
  None = 'NONE',
}

type BackendModelType = {
  __typename?: 'Model';
  lastModifiedDate?: any | null;
  creationDate: any;
  id: number;
  metaData?: string | null;
  name?: string | null;
  screens?: Array<{
    __typename?: 'Screen';
    body?: string | null;
    metaData?: string | null;
    id: number;
    name?: string | null;
    screenShot?: string | null;
    isLunch: boolean;
  } | null> | null;
  entities?: Array<{
    __typename?: 'Entity';
    name?: string | null;
    entityState: EntityState;
    id: number;
    modelId: number;
    properties?: Array<{
      __typename?: 'Property';
      defaultValue?: string | null;
      desplayName?: string | null;
      id: number;
      isOptional: boolean;
      isEditable: boolean;
      isCollection: boolean;
      isPrimaryKey: boolean;
      name?: string | null;
      typeName?: string | null;
      type: DataType;
      propState: PropState;
    } | null> | null;
  } | null> | null;
};

type BackendScreenType = {
  __typename?: 'Screen';
  body?: string | null;
  metaData?: string | null;
  id: number;
  name?: string | null;
  screenShot?: string | null;
  isLunch: boolean;
} | null;

type Tab = {
  label: string;
  id: string | number;
};

enum PropState {
  Default = 'DEFAULT',
  Deleted = 'DELETED',
  New = 'NEW',
  None = 'NONE',
}

enum DataType {
  Bool = 'BOOL',
  Byte = 'BYTE',
  ByteArray = 'BYTE_ARRAY',
  Char = 'CHAR',
  Custom = 'CUSTOM',
  DateTime = 'DATE_TIME',
  DateTimeOffset = 'DATE_TIME_OFFSET',
  Decimal = 'DECIMAL',
  Double = 'DOUBLE',
  Float = 'FLOAT',
  Guid = 'GUID',
  Int = 'INT',
  Long = 'LONG',
  None = 'NONE',
  Object = 'OBJECT',
  Sbyte = 'SBYTE',
  Short = 'SHORT',
  String = 'STRING',
  TimeSpan = 'TIME_SPAN',
  Uint = 'UINT',
  Ulong = 'ULONG',
  Ushort = 'USHORT',
}

type UnArray<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

type QueryActionType =
  | undefined
  | Partial<{
      event: string;
      name: string;
      dataName: string;
      key: string[];
      returns: string;
      variables: string;
      options: {
        operation: string;
        fields: Array<{
          operation: string;
          variables: Record<string, any>;
          fields: Array<{
            items: Array<string | Record<string, string[]>>;
          }>;
        }>;
      };
      path: string;
      onSuccess: Array<{
        name: string;
        path: string;
        [x: string]: string;
      }>;
      onError: Array<{
        name: string;
        path: string;
        [x: string]: string;
      }>;
    }>;

interface ComponentType {
  _id: string;
  parent?: string;
  name: string;
  import?: string;
  style?: CSSProperties;
  itemStyle?: CSSProperties;
  children?: any;
  value?: any;
  src?: string;
  header?: string;
  onPress?: () => void;
  headerStyle?: CSSProperties;
  tabs?: Array<Tab>;
  activeTab?: string;
  onTabChange?: string;
  selectable?: string;
  selectedItem?: any;
  onItemSelected?: any;
  selectedItemStyle?: any;
  actions: QueryActionType[];
  textColor: {
    color?: string;
    [x: string]: string;
  };
  isLayoutLayer?: boolean;
  isbeingaddedfrompanel?: string /**Warning: React does not recognize the `isBeingAddedFromPanel` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `isbeingaddedfrompanel` instead. If you accidentally passed it from a parent component, remove it from the DOM element. */;
  score?: number;
  [x: string]: any;
}

type ScreenMetaDataType = {
  _id?: string;
  components?: Array<Partial<ComponentType>>;
  style?: {
    backgroundColor?: string;
    [x: string]: string;
  };
};

interface ScreenType
  extends Omit<BackendScreenType, 'metaData' | 'id' | 'isLunch'> {
  metaData: ScreenMetaDataType;
  id?: number;
  _id?: number | string;
  screenShot?: string;
  modelId?: number;
  isLunch?: boolean;
}

export type ModelCategory = {
  name: string;
  subCategories: string[];
};

export type ModelConstants = {
  productCategories?: ModelCategory[];
  postCategories?: ModelCategory[];
  eventCategories?: ModelCategory[];
  contentCategories?: ModelCategory[];
  educationCategories?: ModelCategory[];
};

export type AuthConfig = {
  isConfig: boolean;
  social: {
    google: boolean;
    facebook: boolean;
    apple: boolean;
  };
  confirmation: {
    phone: boolean;
    email: boolean;
  };
  terms: boolean;
  fields: Array<'name' | 'mobile'>;
};

export type CreatePostConfig = {
  category?: boolean;
  description?: boolean;
  hashtags?: boolean;
  media?: boolean;
};

export type PostListConfig = {
  profile?: boolean;
  social?: boolean;
};

export type SocialActionsConfig = {
  like?: boolean;
  comments?: boolean;
  share?: boolean;
};

export type ProductConfig = {
  secondHand?: boolean;
  ar?: boolean;
  photoIsRequired?: boolean;
  video?: boolean;
  videoIsRequired?: boolean;
  features?: boolean;
  weight?: boolean;
  dimensions?: boolean;
  attributes?: boolean;
};

export type SubcategoryAndTagsConfig = {
  subCategories?: boolean;
  tags?: boolean;
};

export type ContentConfig = {
  category?: boolean;
  description?: boolean;
  price?: boolean;
};

export type ServiceConfig = {
  rate?: boolean;
  price?: boolean;
  category?: boolean;
};

export type EventConfig = {
  choose: boolean;
  category: boolean;
  price: boolean;
  description: boolean;
  time: boolean;
  zipcode: boolean;
  isConfig?: boolean;
};

export type EventDetailsConfig = {
  participant: boolean;
  favorite: boolean;
};

export type TabsNavigationConfig = {
  paths: Array<{
    name: string;
    icon: string;
    fillIcon?: string;
  }>;
};

export type ShoppingBasketConfig = {
  price: string;
  hasPrice: boolean;
  methods: {standard: boolean; overnight: boolean; mail: boolean};
};

export type NotificationConfig = {
  likePost: boolean;
  comment: boolean;
  likeComment: boolean;
  follow: boolean;
};

export type ProductHomeConfig = {
  promotions: boolean;
  foryou: boolean;
  recents: boolean;
  purchase: boolean;
  categories: boolean;
  wishlist: boolean;
  card: boolean;
};

export type RateReviewConfig = {
  rate: boolean;
  homeRate: boolean;
  review: boolean;
  commentPhoto: boolean;
};

export type CommissionConfig = {
  value: string;
};

export type ModelConfig = {
  name: string;
  isConfig?: boolean;
  [x: string]: any;
};

export type MetaDataConfigs = {
  selectRole?: {seller?: boolean};
  authConfig?: AuthConfig;
  createpost?: CreatePostConfig;
  showcreatepost?: CreatePostConfig;
  postlist?: PostListConfig & SocialActionsConfig;
  showpostlist?: PostListConfig & SocialActionsConfig;
  showsocialpostlist?: PostListConfig;
  socialactions?: SocialActionsConfig;
  showsocialactions?: SocialActionsConfig;
  product?: ProductConfig;
  subcategoryAndTags?: SubcategoryAndTagsConfig;
  content?: ContentConfig;
  service?: ServiceConfig;
  event?: EventConfig;
  showevent?: EventConfig;
  eventdetails?: EventDetailsConfig;
  showeventdetails?: EventDetailsConfig;
  tabsNavigation?: TabsNavigationConfig;
  shopingBasket?: ShoppingBasketConfig;
  notif?: NotificationConfig;
  productHome?: ProductHomeConfig;
  educationHome?: ProductHomeConfig;
  model?: Array<ModelConfig>;
  rateReview?: RateReviewConfig;
  commission?: CommissionConfig;
};

interface ModelType
  extends Omit<BackendModelType, 'screens' | 'metaData' | 'id'> {
  screens: Array<ScreenType>;
  id?: number;
  lastPublish: Date;
  lastUpdate: Date;
  metaData?: {
    gqlLogin?: string;
    logo?: string;
    themeName?: string;
    recentColors?: Array<string>;
    newPropertiesOfEntities?: NewPropertyType[];
    launchPage?: number;
    themeColors?: ThemeColors;
    originalModelId?: number;
    configs?: MetaDataConfigs;
    screenType?: 'default' | 'tabs_navigation';
    homeScreen?: string;
    [x: string]: any;
    constants?: ModelConstants;
  };
}

export type DataModelType = Omit<ModelType, 'screens'> & {
  screens: Array<
    Omit<ScreenType, 'metaData'> & {
      metaData: Omit<ScreenMetaDataType, 'components'> & {
        components: string[];
      };
    }
  >;
  stacks: {
    mainStack: string[];
    authStack: string[];
    introStack: string[];
    onboardingStack: string[];
  };
  homeScreen: string;
  screenNames: string[];
  constants: ModelConstants;
  recentColors: string[];
};

type ThemeColors = {
  primary?: {[x: string | number]: string};
  secondary?: {[x: string | number]: string};
  background?: {[x: string | number]: string};
};

type EntityType = UnArray<ModelType['entities']>;

type NewPropertyType = Partial<{
  entity: EntityType;
  isNew: boolean;
  entityId: number;
  isCollection: boolean;
  isEditable: boolean;
  isOptional: boolean;
  isPrimaryKey: boolean;
  propState: PropState;
  type: Extract<
    DataType,
    DataType.String | DataType.Int | DataType.DateTime | DataType.Bool
  >;
  name: string;
}>;
