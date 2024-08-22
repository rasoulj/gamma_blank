import {useEffect, useMemo, useState} from 'react';
import {
  IDatingInput,
  IDatingSetupStageData,
  deserializeDatingInput,
  getDefaultValues,
  getTypes,
  pagesToMap,
  serializeDatingInput,
} from '../types';
import {useForm} from 'react-hook-form';
import {useDisclose} from 'native-base';
import {useGetCurrentUser, useNavigate} from '~/components';
import {useAnswerQuestion, useGetAnswers} from './setup.query';
import useAuthStore from '~/stores/authStore';
import {useUpdateUser} from '~/components/molecules/settings/hook';
import {model} from '~/data/model';
import {useQueryClient} from 'react-query';

const metaData = model?.metaData?.configs?.datingSetup;

export function useDatingSetup(notMain: boolean = true) {
  const {navigateWithName} = useNavigate();

  const stagesLen = metaData.length;
  const [stage, setStage] = useState(0);

  const form = useForm({
    delayError: 0,
    mode: 'all',
    defaultValues: getDefaultValues(metaData),
  });

  const allTypes = getTypes(metaData);

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    setValue,
  } = form;

  const user = useAuthStore(state => state?.user);

  const queryClient = useQueryClient();

  const {mutate: updateUser, isLoading: isLoadingUpdateUser} = useUpdateUser();

  const {data: currentUserData, isLoading: isCurrentUserLoading} =
    useGetCurrentUser(user?.id);

  const currentUser = currentUserData?.user_getCurrentUser?.result ?? user;
  const getAnswers = useGetAnswers({userId: user?.id ?? currentUser?.id});

  const answers = useMemo(
    () => getAnswers?.data?.pages ?? [],
    [getAnswers?.data?.pages],
  );

  const answerQuestion = useAnswerQuestion();

  const answersMap = pagesToMap(answers);

  const valueChanged = async () => {
    for (const config of data.inputConfigs) {
      const {name: question, type} = config;

      const answer = watch(question);
      const ser = serializeDatingInput(answer, type);

      if (answersMap[question] !== ser) {
        return true;
      }
    }
    return false;
  };

  const answerToQuestion = async (data: IDatingSetupStageData) => {
    for (const config of data.inputConfigs) {
      const {name: question, type} = config;

      const answer = watch(question);
      const ser = serializeDatingInput(answer, type);

      if (answersMap[question] === ser) continue;

      await answerQuestion.mutate(
        {question, answer: ser},
        {
          onSuccess: data => {
            if (data?.match_answerToQuestion?.status?.code === 1) {
              queryClient.invalidateQueries(['current_user'], {exact: false});
              queryClient.invalidateQueries(['getAnswers'], {exact: false});
            }
          },
        },
      );
      answersMap[question] = ser;

      if (question === 'gender') {
        const userInput = {
          gender: answer === 1 ? 'MALE' : answer === 2 ? 'FEMALE' : 'OTHER',
        };
        await updateUser(
          {userId: user?.id, userInput},
          {
            onSuccess: data => {},
            onError: error => {},
          },
        );
      } else if (question === 'height') {
        const userInput = {height: answer};
        await updateUser({userId: user?.id, userInput});
      } else if (question === 'fullName') {
        const userInput = {fullName: answer};
        await updateUser({userId: user?.id, userInput});
      } else if (question === 'dob') {
        const userInput = {dateOfBirth: answer};
        await updateUser({userId: user?.id, userInput});
      } else if (question === 'profilePictures') {
        const photoUrl = ((answer ?? []) as any[])[0];
        if (!!photoUrl) {
          const userInput = {photoUrl};
          await updateUser(
            {userId: user?.id, userInput},
            {
              onSuccess: data => {
                queryClient.invalidateQueries(['current_user'], {exact: false});
                queryClient.invalidateQueries(['getAnswers'], {exact: false});
              },
            },
          );
        }
      }
    }

    const {name, rules} = data.inputConfigs[0];
    if (!rules) {
      const question = name + '_visible';
      const answer = watch(question);
      const ser = serializeDatingInput(answer, 'boolean');
      if (answersMap[question] === ser) return;
      await answerQuestion.mutate({question, answer: ser});
    }
  };

  const bodDisclose = useDisclose();

  const progress = useMemo(() => (100 * (stage + 1)) / stagesLen, [stage]);

  const data = useMemo(() => metaData[stage], [stage]);

  const needKeyboard = !!data.inputConfigs.find(
    ({type}) => type === 'text' || type === 'textarea' || type === 'questions',
  );

  const isRequired = useMemo(
    () => !!data.inputConfigs.find(({rules}) => !!rules),
    [data],
  );

  const hasError = ({name, rules}: IDatingInput): boolean => {
    if (!rules) return false;
    return !!errors[name];
  };

  const calcError = () => data.inputConfigs.some(hasError);

  const moveNext = async (checkBOD: boolean = true) => {
    const moveOn = async () => {
      if (data.inputConfigs[0].name === 'dob' && checkBOD && valueChanged()) {
        bodDisclose.onOpen();
      } else if (!calcError()) {
        await answerToQuestion(data);
        skipNext();
      }
    };

    handleSubmit(moveOn, async e => {
      const hasError = ({name, rules}: IDatingInput): boolean => {
        if (!rules) return false;
        return !!e[name];
      };
      const error = data.inputConfigs.some(hasError);
      if (!error) await moveOn();
    })();
  };

  const skipNext = async () => {
    const canMoveNext = stage < stagesLen - 1;

    if (canMoveNext) {
      setStage(stage + 1);
    } else {
      navigateWithName('DatingHome');
    }
  };

  const canMoveBack = stage > 0;
  const moveBack = () => setStage(stage - 1);

  useEffect(() => {
    for (const item of answers) {
      setValue(
        item.question,
        deserializeDatingInput(item.answer, allTypes[item.question]),
      );
    }
  }, [answers]);

  useEffect(() => {
    setValue('fullName', currentUser?.fullName ?? '');
  }, [currentUser]);

  const loadingAnswers = getAnswers.isLoading && !getAnswers.isFetched;

  const [navigated, setNavigated] = useState(notMain);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!navigated && !loadingAnswers) {
      setNavigated(true);

      if (Object.keys(answersMap).length !== 0) {
        navigateWithName('DatingHome');
      } else setTimeout(() => setLoaded(true), 1000);
    }
  }, [loadingAnswers]);

  return {
    data,
    progress,

    error: calcError(),
    moveNext,

    canMoveBack,
    moveBack,

    needKeyboard,

    control,
    formState: form.formState,

    isRequired,

    skipNext,

    bodDisclose,

    watch,

    loadingAnswers: !loaded,
    loadingSaveQuestion: answerQuestion.isLoading && !answerQuestion.error,

    answersMap,

    answerToQuestion,
  };
}
