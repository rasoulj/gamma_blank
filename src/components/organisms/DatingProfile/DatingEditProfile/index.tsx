import React, {useEffect, useState} from 'react';
import {
  Button,
  CustomActionSheet,
  EyeIconSet,
  HStack,
  Layer,
  Pressable,
  ScrollView,
  Typography,
  VStack,
  deviceHeight,
  getColor,
  isDark,
  useDisclose,
  useIsFocused,
  useNavigate,
} from '~/components';
import useHeader from '~/components/elemental/hooks/use_header';
import {DatingSetupInput, ProgressBar} from '../../DatingSetup/views';
import {useDatingSetup} from '../../DatingSetup/hooks/dating.hook';
import {
  calcDatingSetupProgress,
  calcPercent,
  findAnswerOption,
  findDatingConfigByName,
  findDatingInputByName,
  getDatingUserFromAnswersMap,
} from '../../DatingHome/hooks/DatingHome.hook';
import {BackHandler, StyleSheet} from 'react-native';
import {SetupNames} from '~/data/model';
import {IDatingSetupStageData} from '../../DatingSetup/types';
import {Item} from '../../DatingHome/views/DatingUserMoreInfo';
import {useQueryClient} from 'react-query';
import {AgeConfirmBottomSheet} from '../../DatingSetup/views/DatingSetupInput/AgeConfirmBottomSheet';
import {VisibleOnProfile} from '../../DatingSetup/views/VisibleOnProfile';
import useAuthStore from '~/stores/authStore';
import {MenuItem} from '~/components/atoms/MenuItem';
import {ChevronIcon} from '~/assets/icons/dating';

function InterestedIn({
  list,
  interestMeta,
}: {
  list: number[];
  interestMeta: IDatingSetupStageData;
}): JSX.Element {
  const all = (interestMeta?.inputConfigs[0]?.options ?? []).filter(p =>
    list.includes(p.value),
  );
  return (
    <HStack flex={1} flexWrap="wrap" py={4}>
      {all?.map((p, i) => (
        <Item item={p.title} icon={null} key={i} />
      ))}
    </HStack>
  );
}

function HeaderMenuItem({onPress, title, isOpen}) {
  return (
    <Pressable onPress={onPress}>
      <Layer style={{...styles.item, borderBottomWidth: isOpen ? 0 : 0.5}}>
        <VStack>
          <Typography
            color="gray.600"
            fontSize="xl"
            lineHeight={26}
            fontWeight="600">
            {title}
          </Typography>
        </VStack>
        <ChevronIcon style={!isOpen && {transform: [{rotate: '270deg'}]}} />
      </Layer>
    </Pressable>
  );
}

function MenuGroup({title, children}) {
  const dis = useDisclose(true);

  return (
    <VStack w="100%">
      <HeaderMenuItem
        title={title}
        onPress={dis.onToggle}
        isOpen={dis.isOpen}
      />
      {dis.isOpen && children}
    </VStack>
  );
}

function LinearProgress({percent}: {percent: number}): JSX.Element {
  const progress = calcPercent(percent);

  return (
    <VStack w="100%" alignItems="center">
      <Typography fontWeight="500" fontSize="sm">
        {progress}% complete
      </Typography>
      <VStack h={10} w="50%">
        <ProgressBar
          percent={progress}
          color={getColor({color: 'primary.500'})}
          bg={getColor({color: 'primary.200'})}
        />
      </VStack>
    </VStack>
  );
}

interface EditFunc {
  (config: IDatingSetupStageData): void;
}

function SetupMenuItem({
  item,
  map,
  postfix = '',
  doEdit,
}: {
  item: IDatingSetupStageData;
  map: any;
  postfix?: string;
  doEdit: EditFunc;
}): JSX.Element {
  const ans = findAnswerOption(item.inputConfigs[0].name, map);

  return (
    <MenuItem
      title={item.shortTitle ?? item.title}
      subTitle={ans + postfix}
      onPress={() => doEdit(item)}
    />
  );
}

function cloneDatingConfig(name: string): IDatingSetupStageData {
  return JSON.parse(
    JSON.stringify(findDatingConfigByName(name)),
  ) as IDatingSetupStageData;
}

const genderConfig = cloneDatingConfig(SetupNames.gender);
const whyConfig = findDatingConfigByName(SetupNames.why);
const relationStatusConfig = findDatingConfigByName(SetupNames.relationStatus);
const sexOrientationConfig = findDatingConfigByName(SetupNames.sexOrientation);
const kidsConfig = findDatingConfigByName(SetupNames.kids);
const smokeConfig = findDatingConfigByName(SetupNames.smoke);
const drugConfig = findDatingConfigByName(SetupNames.drug);
const drinkConfig = findDatingConfigByName(SetupNames.drink);
const heightConfig = findDatingConfigByName(SetupNames.height);
const introvertConfig = findDatingConfigByName(SetupNames.introvert);
const petsConfig = findDatingConfigByName(SetupNames.pets);
const educationConfig = findDatingConfigByName(SetupNames.education);
const universityConfig = cloneDatingConfig(SetupNames.university);
const jobConfig = findDatingConfigByName(SetupNames.jobTitle);
const interestsConfig = findDatingConfigByName(SetupNames.interests);
const moreQuestionsConfig = findDatingConfigByName(SetupNames.moreQuestions);
const bioConfig = findDatingConfigByName(SetupNames.bio);
const dobConfig = cloneDatingConfig(SetupNames.dob);
const fullNameConfig = findDatingConfigByName(SetupNames.fullName);
const newQuestionConfig = cloneDatingConfig(SetupNames.moreQuestions);

genderConfig.inputConfigs[0].title = 'Gender';
dobConfig.inputConfigs[0].view = 'menu';
universityConfig.inputConfigs[0].view = 'menu';
universityConfig.inputConfigs[0].title = 'Education';

newQuestionConfig.inputConfigs[0].view = 'menu';
newQuestionConfig.title = 'New Question';

function PreviewIconButton() {
  const {navigateWithName} = useNavigate();

  const onPress = () => navigateWithName('DatingProfilePreview');

  return <EyeIconSet onPress={onPress} />;
}

function EditModal({
  disclose,
  config,
  setupHook,
  onSave,
}: {
  config: IDatingSetupStageData;
  disclose: any;
  setupHook;
  onSave: VoidFunction;
}): JSX.Element {
  const saveIt = async () => {
    await setupHook.answerToQuestion(config);
    disclose.onClose();
  };

  const error = setupHook.formState.errors[config.inputConfigs[0].name];

  return (
    <CustomActionSheet
      style={styles.actionSheet}
      title={config.title}
      onClose={disclose.onClose}
      isVisible={disclose.isOpen}>
      <ScrollView>
        {config.inputConfigs.map((conf, index) => (
          <>
            <DatingSetupInput
              style={styles.p10}
              key={index}
              control={setupHook.control}
              errors={setupHook.formState.errors}
              config={conf}
            />
            <VisibleOnProfile
              control={setupHook.control}
              name={config.inputConfigs[0].name}
              visible={!config.progressText}
            />
          </>
        ))}
        <HStack w="100%" space={2} py={4}>
          <Button
            size="sm"
            variant="outline"
            flex={1}
            onPress={disclose.onClose}>
            Cancel
          </Button>
          <Button
            backgroundColor={error ? 'primary.200' : 'primary.500'}
            disabled={error}
            size="sm"
            isLoading={setupHook.loadingSaveQuestion}
            flex={1}
            onPress={async () => {
              await saveIt();
              onSave();
            }}>
            <Typography color={error ? 'gray.500' : '#fff'}>Apply</Typography>
          </Button>
        </HStack>
      </ScrollView>
    </CustomActionSheet>
  );
}

export function DatingEditProfile() {
  const {navigation} = useNavigate();

  const onBack = () => {
    onUpdateProfilePictures();
    navigation.goBack();
  };

  useHeader({
    title: {children: 'Edit Profile', fontSize: 'lg', fontWeight: 'bold'},
    hasBack: true,
    icons: <PreviewIconButton />,
    onBack: onBack,
  });

  const setupHook = useDatingSetup();

  const auth = useAuthStore();

  const {control, formState, answersMap} = setupHook;

  const datingUser = getDatingUserFromAnswersMap(answersMap, auth);

  const config = findDatingInputByName('profilePictures');

  const progress = calcDatingSetupProgress(datingUser);

  const disclose = useDisclose();

  const queryClient = useQueryClient();

  const [activeConfig, setActiveConfig] =
    useState<IDatingSetupStageData>(genderConfig);

  const addQuestion = () => {
    setActiveConfig(newQuestionConfig);
    disclose.onOpen();
  };

  const doEdit = (config: IDatingSetupStageData) => {
    setActiveConfig(config);
    disclose.onOpen();
  };

  const onSave = async () =>
    await queryClient.invalidateQueries(['getAnswers', datingUser.id]);

  const saveIt = async (config: IDatingSetupStageData) => {
    if (config.inputConfigs[0].name === SetupNames.dob) {
      setupHook.bodDisclose.onOpen();
    } else {
      await setupHook.answerToQuestion(config);
    }
  };

  const onUpdateProfilePictures = () => {
    saveIt({
      title: 'Choose Your Photos & Videos',
      subTitle: 'Upload at least 2 photos to get started',
      inputConfigs: [
        {
          rules: {
            validate: (value: string[]) => {
              const coverPhotoUri = value[0];
              if ((coverPhotoUri ?? '') === '')
                return 'Choose your cover photo';
              return null;
            },
          },
          type: 'profile-pictures',
          name: 'profilePictures',
          defaultValue: [],
          title: '',
        },
      ],
    });
  };

  const isFouced = useIsFocused();
  useEffect(() => {
    if (!isFouced) {
      onUpdateProfilePictures();
    }
  }, [isFouced]);

  useEffect(() => {
    const backAction = () => {
      onBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView w="100%">
      <LinearProgress percent={progress} />
      <VStack w="100%" justifyItems="center" px="4" pb={8}>
        <DatingSetupInput
          errors={formState.errors}
          control={control}
          config={config}
        />
      </VStack>

      <MenuGroup title="Basic info">
        <SetupMenuItem item={fullNameConfig} map={answersMap} doEdit={doEdit} />
        <DatingSetupInput
          onClose={setupHook.bodDisclose.onOpen}
          control={setupHook.control}
          errors={setupHook.formState.errors}
          config={dobConfig.inputConfigs[0]}
        />
        <SetupMenuItem item={genderConfig} map={answersMap} doEdit={doEdit} />
      </MenuGroup>

      <MenuGroup title="About">
        <SetupMenuItem
          item={bioConfig}
          map={{bio: 'Add a bio'}}
          doEdit={doEdit}
        />
      </MenuGroup>

      <MenuGroup title="My Basics">
        <SetupMenuItem item={whyConfig} map={answersMap} doEdit={doEdit} />
        <SetupMenuItem
          item={relationStatusConfig}
          map={answersMap}
          doEdit={doEdit}
        />
        <SetupMenuItem
          item={sexOrientationConfig}
          map={answersMap}
          doEdit={doEdit}
        />
      </MenuGroup>

      <MenuGroup title="More About Me">
        <SetupMenuItem item={kidsConfig} map={answersMap} doEdit={doEdit} />
        <SetupMenuItem item={smokeConfig} map={answersMap} doEdit={doEdit} />
        <SetupMenuItem item={drugConfig} map={answersMap} doEdit={doEdit} />
        <SetupMenuItem item={drinkConfig} map={answersMap} doEdit={doEdit} />
        <SetupMenuItem
          item={heightConfig}
          map={answersMap}
          postfix="cm"
          doEdit={doEdit}
        />

        <SetupMenuItem
          item={introvertConfig}
          map={answersMap}
          doEdit={doEdit}
        />
        <SetupMenuItem item={petsConfig} map={answersMap} doEdit={doEdit} />
        <SetupMenuItem
          item={educationConfig}
          map={answersMap}
          doEdit={doEdit}
        />
      </MenuGroup>

      <MenuGroup title="Get to know me more">
        <DatingSetupInput
          onClose={() => saveIt(universityConfig)}
          control={setupHook.control}
          errors={setupHook.formState.errors}
          config={universityConfig.inputConfigs[0]}
        />
        <SetupMenuItem item={jobConfig} map={answersMap} doEdit={doEdit} />
      </MenuGroup>

      <MenuGroup title="Answer Questions">
        <SetupMenuItem
          item={moreQuestionsConfig}
          map={{moreQuestions: 'Your answer'}}
          doEdit={doEdit}
        />
        <Button variant="outline" onPress={addQuestion}>
          Add New Question
        </Button>
        <SetupMenuItem item={interestsConfig} map={{}} doEdit={doEdit} />
        <InterestedIn
          list={datingUser.interestedIn ?? []}
          interestMeta={interestsConfig}
        />
      </MenuGroup>

      <EditModal
        onSave={onSave}
        setupHook={setupHook}
        disclose={disclose}
        config={activeConfig}
      />

      <AgeConfirmBottomSheet
        onOK={() => saveIt(dobConfig)}
        bodDisclose={setupHook.bodDisclose}
        dob={setupHook.watch('dob')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
    borderBottomColor: isDark()
      ? getColor({color: 'gray.500'})
      : getColor({color: 'gray.300'}),
    borderBottomWidth: 0.5,
  },

  actionSheet: {maxHeight: deviceHeight - 100},

  p10: {paddingVertical: 10},
});
