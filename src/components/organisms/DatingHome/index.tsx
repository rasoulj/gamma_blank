import React from 'react';
import {Box} from '~/components/elemental';
import {DatingHomeHeader} from './views/DatingHomeHeader';
import {VStack, useDisclose} from 'native-base';
import {StackedDatingUserCard} from './views/StackedDatingUserCard';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import useHeader from '~/components/elemental/hooks/use_header';

function DatingHome(): JSX.Element {
  const filterDisclose = useDisclose(false);
  const {} = useHeader({hidden: true});

  return (
    <VStack flex="1">
      <DatingHomeHeader onPressFilter={filterDisclose.onOpen} />

      <Box flex={1}>
        <GestureHandlerRootView>
          <StackedDatingUserCard filterDisclose={filterDisclose} />
        </GestureHandlerRootView>
      </Box>
    </VStack>
  );
}

export default DatingHome;
