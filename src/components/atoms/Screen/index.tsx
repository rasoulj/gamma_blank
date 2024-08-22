import React, {FC, PropsWithChildren} from 'react';
import LoadIndicator from '../LoadIndicator';
import theme from '~/theme';
import {SafeAreaView, StyleSheet} from 'react-native';
import {isIOS} from '~/utils/methods';
import {getColor} from '../../elemental/helper';
import {View} from 'native-base';
import {Platform, NativeModules} from 'react-native';
import VideoCallModal from '../../molecules/VideoCallModal';
import useLiveStreamStore from '~/stores/LiveStreamStore';
import MatchAcceptedModal from '../../organisms/Matching/MatchAcceptedModal';
import AppointmentModal, {
  NotNowModal,
} from '~/components/organisms/Matching/AppointmentModal';

const {StatusBarManager} = NativeModules;
export const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

const Screen: FC<PropsWithChildren<any>> = ({
  children,
  isLoading,
  fullScreen,
  ...props
}) => {
  const Container = isIOS && !fullScreen ? SafeAreaView : View;
  const {haveCall} = useLiveStreamStore();

  return (
    <>
      {isLoading ? (
        <LoadIndicator />
      ) : (
        <>
          {haveCall && haveCall.showModal && <VideoCallModal />}
          <Container style={[styles.container, props?.style]}>
            {children}
          </Container>
          <MatchAcceptedModal />
          <AppointmentModal />
          <NotNowModal />
        </>
      )}
    </>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : STATUSBAR_HEIGHT,
    backgroundColor: getColor({
      theme,
      color: 'background.500',
    }),
  },
});
