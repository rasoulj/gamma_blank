import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  BackIcon,
  HStack,
  Header,
  Typography,
  VStack,
} from '~/components/elemental';
import {ProgressBar} from './ProgressBar';
import {margin} from '../consts';
import {DatingSetupInput} from './DatingSetupInput';
import {useDatingSetup} from '../hooks/dating.hook';
import {ProgressText, VisibleOnProfile} from './VisibleOnProfile';
import {AgeConfirmBottomSheet} from './DatingSetupInput/AgeConfirmBottomSheet';
import {Container} from './Container';
import {ContinueButton} from './ContinueButton';

type SkipButtonProps = {
  visible: boolean;
  onPress: VoidFunction;
  canMoveNext: boolean;
};
function SkipButton({
  visible,
  onPress,
  canMoveNext,
}: SkipButtonProps): JSX.Element {
  return (
    visible && (
      <TouchableOpacity disabled={!canMoveNext} onPress={onPress}>
        <HStack>
          <Typography color="secondary.500" fontSize="lg" fontWeight="600">
            Skip
          </Typography>
          <BackIcon color="secondary.500" style={styles.flipped} />
        </HStack>
      </TouchableOpacity>
    )
  );
}

export function TitleBar({
  title,
  subTitle,
}: {
  title?: string;
  subTitle?: string;
}): JSX.Element {
  return (
    <VStack style={styles.topContainer}>
      <Typography fontSize="2xl" color="gray.800" fontWeight="600">
        {title}
      </Typography>

      {!!subTitle && (
        <Typography
          style={styles.subTitle}
          fontSize="sm"
          fontWeight="400"
          color="gray.400">
          {subTitle}
        </Typography>
      )}
    </VStack>
  );
}

export function DatingBasePage(): JSX.Element {
  const {
    data: {title, subTitle, progressText, inputConfigs},

    isRequired,

    moveNext,

    moveBack,
    canMoveBack,

    progress,

    needKeyboard,

    control,
    formState,

    skipNext,

    error,

    bodDisclose,

    watch,
    loadingAnswers,
    loadingSaveQuestion,
  } = useDatingSetup(false);

  return (
    <Container
      isLoading={loadingAnswers}
      needKeyboard={needKeyboard}
      header={
        <Header onClickBack={canMoveBack && moveBack}>
          <SkipButton
            visible={!isRequired}
            onPress={skipNext}
            canMoveNext={true}
          />
        </Header>
      }
      footer={
        <VStack justifyContent="center">
          <ProgressText text={progressText} />

          <ProgressBar percent={progress} />

          <ContinueButton
            loading={loadingSaveQuestion}
            onPress={() => moveNext(false)}
            disabled={error}
          />
        </VStack>
      }>
      <TitleBar title={title} subTitle={subTitle} />

      <VStack style={styles.childContainer}>
        {(inputConfigs ?? []).map(config => (
          <DatingSetupInput
            style={styles.input}
            errors={formState.errors}
            control={control}
            config={config}
            key={config.name}
          />
        ))}
        <VisibleOnProfile
          control={control}
          name={inputConfigs[0].name}
          visible={!progressText}
        />
      </VStack>

      <AgeConfirmBottomSheet
        onOK={() => moveNext(false)}
        bodDisclose={bodDisclose}
        dob={watch('dob')}
      />
    </Container>
  );
}

export default DatingBasePage;

const styles = StyleSheet.create({
  subTitle: {
    paddingTop: 8,
  },

  mainContainerKeyboard: {
    justifyContent: 'flex-start',
  },

  mainContainer: {
    flexGrow: 1,
  },

  topContainer: {
    marginStart: margin,
    marginTop: 10,
  },

  childContainer: {
    margin,
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'column',
  },

  flipped: {
    transform: [{rotate: '180deg'}],
  },

  input: {
    paddingVertical: 12,
  },
});
