import {useEffect, useMemo, useState} from 'react';
import {DatingUser} from '../models/user';
import {useGetDatingUsers, useGetSimilarityUsers} from './home.query';
import useAuthStore from '~/stores/authStore';
import {
  IDatingInput,
  IDatingSetupStageData,
  calcAge,
  desProfilePictures,
  pagesToMap,
} from '../../DatingSetup/types';
import {check, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {Platform} from 'react-native';
import {useDisclose} from '~/components';
import {useUpdateUser} from '~/components/molecules/settings/hook';
import dayjs from 'dayjs';
import {
  useCreateMatch,
  useCreateUserSeen,
} from '~/components/organisms/Matching/hooks';

import {model} from '~/data/model';
import {useQueryClient} from 'react-query';

const meta = model?.metaData?.configs?.datingSetup;
const AddressTODO = 'West Purwokerto, 82,3 km';

export function calcPercent(percent: number) {
  return Math.round(100 * percent);
}

function ageToDob(age: number): Date {
  const d = dayjs(new Date()).add(-age, 'year');
  return d.toDate();
}

export type FilterType = {
  genderOption: any;
  age: number[];
  height: number[];
  distance: number[];
  verifiedOnly: boolean;
};

export const DefaultFilter: FilterType = {
  genderOption: '',
  age: [23, 75],
  height: [150, 200],
  distance: [0, 120],
  verifiedOnly: true,
};

export interface FilterFunction {
  (filter: FilterType): void;
}

export interface IFilterHook {
  filter: FilterType;
  setValue: (key: string, value: any) => void;
  clear: VoidFunction;
}

export function useDatingFilter(): IFilterHook {
  const [filter, setFilter] = useState<FilterType>(DefaultFilter);

  const setValue = (key: string, value: any) =>
    setFilter({...filter, [key]: value});

  const clear = () => setFilter(DefaultFilter);

  return {
    filter,
    setValue,
    clear,
  };
}

export function findDatingInputByName(key: string): IDatingInput {
  for (const data of meta) {
    const config = data.inputConfigs.find(p => p.name === key);
    if (!!config) return config;
  }
  return undefined;
}

export function findDatingConfigByName(key: string): IDatingSetupStageData {
  for (const data of meta) {
    const config = data.inputConfigs.find(p => p.name === key);
    if (!!config) return data;
  }
  return undefined;
}

export function findAnswerOption(key: string, map: any): string {
  const setupData = findDatingConfigByName(key);
  const ans = map[key] ?? '';

  if (!setupData) return ans ?? '';
  const value = parseInt(ans);
  const option = setupData.inputConfigs[0].options?.find(
    opt => opt.value === value,
  );
  if (!option) return isNaN(value) ? ans : value;
  return option.title;
}

export function getDatingUserFromAnswers(user: any, auth: any): DatingUser {
  const map = pagesToMap(user?.matchAnswers ?? []);

  return getDatingUserFromAnswersMap(map, user);
}

function arrayAnswerCounter(values: any[], isOneQuestion): number {
  let counter = 0;
  values.forEach(element => {
    if (typeof element === 'object') {
      let key = Object.keys(element);
      if (element[key[0]]?.length > 0) counter += 1;
    }
    if (element?.length > 0 || (!isNaN(element) && element > 0)) {
      if (isOneQuestion) counter = 1;
      else counter += 1;
    }
  });

  return counter;
}

export function calcDatingSetupProgress(answers: any): number {
  let answerCounter = 0;
  const keys = Object.keys(answers ?? {});
  keys.map(key => {
    if (
      Array.isArray(answers[key]) &&
      arrayAnswerCounter(answers[key], key === 'interestedIn' ? true : false) >
        0
    ) {
      answerCounter += arrayAnswerCounter(
        answers[key],
        key === 'interestedIn' ? true : false,
      );
    } else if (answers[key]) {
      answerCounter += 1;
    }
  });
  return answerCounter / meta.length > 100 ? 100 : answerCounter / meta.length;
}

export function getDatingUserFromAnswersMap(map: any, user: any): DatingUser {
  const ans = (key: string) => map[key] ?? '';

  const ansE = (key: string) => {
    const setupData = meta.find(v => v.inputConfigs[0].name === key);
    if (!setupData) return '';
    const value = parseInt(ans(key));
    const option = setupData?.inputConfigs[0].options?.find(
      opt => opt.value === value,
    );
    if (!option) return '';
    return option.title;
  };

  return {
    id: user?.id,
    email: user?.email,
    name: ans('fullName'),
    age: calcAge(new Date(ans('dob'))),
    avatar: desProfilePictures(ans('profilePictures')),
    address: AddressTODO,
    gender: ans('gender'),
    about: ans('bio'),
    basics: [ansE('why'), ansE('relationStatus'), ansE('sexOrientation')],
    moreAbout: [
      ansE('introvert'),
      ansE('kids'),
      ansE('drink'),
      ansE('drug'),
      ansE('education'),
    ],

    interestedIn: ans('interests')
      .split(',')
      .map(p => parseInt(p)),

    moreInfo: [
      {term: 'My greatest strength', def: ansE('introvert')},
      {term: 'University', def: ans('university')},
      {term: 'Work', def: ans('jobTitle')},
      {term: 'Company', def: ans('jobCompany')},
      {term: 'Location', def: AddressTODO},
    ],

    why: ansE('why'),

    height: ans('height'),
  };
}

export function useDatingHome() {
  const [index, setIndex] = useState(0);

  const user = useAuthStore(state => state?.user);

  const filterHook = useDatingFilter();

  const [_filter, setFilter] = useState<FilterType>(filterHook.filter);

  const applyFilter = () => setFilter(filterHook.filter);

  const queryClient = useQueryClient();

  const dobs = useMemo(() => {
    return _filter.age.map(ageToDob);
  }, [_filter.age]);

  const getDatingUsers = useGetDatingUsers({
    userId: user?.id,
    order: [{user: {createdDate: 'DESC'}}],
    maxDistance: undefined, //_filter.distance[1] ?? 180,
    where: {
      user: {
        //TODO: height: { gte: _filter.height[0], lte: _filter.height[1] },
        //TODO: dateOfBirth: { gte: dobs[1], lte: dobs[0] },
        matchAnswers: {
          some: {
            question: {eq: 'fullName'},
          },
        },
      },
    },
  });

  const getSimilarityUsers = useGetSimilarityUsers({
    order: [{createdDate: 'DESC'}],
    where: {
      //TODO: height: { gte: _filter.height[0], lte: _filter.height[1] },
      //TODO: dateOfBirth: { gte: dobs[1], lte: dobs[0] },
      matchAnswers: {
        some: {
          question: {eq: 'fullName'},
        },
      },
    },
  });

  const auth = useAuthStore();

  const users = getSimilarityUsers?.data?.pages.map((user: any) =>
    getDatingUserFromAnswers(user, auth),
  );

  const moveNext = () => {
    setIndex((index + 1) % users.length);
  };

  const {mutate: updateUser, isLoading: isLoadingUpdateUser} = useUpdateUser();

  const locationDisclose = useDisclose();

  const {mutate: createMatch, isLoading: createMatchIsLoading} =
    useCreateMatch();

  const {mutate: matchUserSeen, isLoading: isLoadingMatchUserSeen} =
    useCreateUserSeen();

  const saveLocation = () => {
    //TODO: saveLocation
    return;

    Geolocation.getCurrentPosition(
      async (pos: any) => {
        const crd = pos?.coords;

        const userInput = {
          latitude: crd?.latitude,
          longitude: crd?.longitude,
        };

        await updateUser(
          {userId: user?.id, userInput},
          {
            onSuccess: data => {},
            onError: error => {},
          },
        );
      },
      error => {},
      {enableHighAccuracy: true},
    );
  };

  useEffect(() => {
    const isAndroid = Platform.OS === 'android';
    const permissionName = isAndroid
      ? PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    check(permissionName).then(status => {
      if (status !== 'granted') {
        locationDisclose.onOpen();
      } else {
        saveLocation();
      }
    });
  }, []);

  const doLike = (cb: VoidFunction) => {
    createMatch(
      {input: {targetUserId: users[index]?.id}},
      {
        onSuccess: (data: any, variables) => {
          moveNext();

          setTimeout(() => cb?.call(0), 0);

          const isSuccess =
            data?.match_createMatch?.status?.value === 'Success' ||
            data?.match_createMatch?.status?.value === 'AlreadyExists';
          if (isSuccess) {
            queryClient.invalidateQueries(['match_getMatches'], {exact: false});
            queryClient.invalidateQueries(['match_getSimilarUsers'], {
              exact: false,
            });
          }
        },
        onError: () => {
          setTimeout(() => cb?.call(0), 0);
        },
      },
    );
  };

  const doDislike = (cb: VoidFunction) => {
    matchUserSeen(
      {targetUserId: users[index]?.id ?? 0},
      {
        onSuccess: (data: any) => {
          moveNext();
          setTimeout(() => {
            if (!!cb) cb();
          }, 0);

          const isSuccess =
            data?.match_createMatch?.status?.value === 'Success' ||
            data?.match_createMatch?.status?.value === 'AlreadyExists';
          if (isSuccess) {
            queryClient.invalidateQueries(['match_getMatches'], {exact: false});
            queryClient.invalidateQueries(['match_getSimilarUsers'], {
              exact: false,
            });
          }
        },
        onError: () => {
          setTimeout(() => cb?.call(0), 0);
        },
      },
    );
  };

  const props = {
    moveNext,
    locationDisclose,
    saveLocation,
    filterHook,
    applyFilter,

    doLike,
    doDislike,

    isLoading:
      createMatchIsLoading || isLoadingMatchUserSeen || isLoadingUpdateUser,
  };

  return !users
    ? {
        activeUser: undefined,
        nextUser: undefined,
        users: [],
        ...props,
      }
    : {
        activeUser: users[index],
        nextUser: users[(index + 1) % users.length],
        users,
        ...props,
      };
}
