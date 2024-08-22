import React, {useState, useMemo} from 'react';
import useHeader from '~/components/elemental/hooks/use_header';
import {
  Layout,
  Button,
  HomeIconSet,
  ProfileIconSet,
  NotificationIconSet,
  Input,
  TrashIconSet,
  User2Icon,
  Typography,
  getColor,
} from '~/components';
import {View} from 'react-native';

export default function HeaderScreen() {
  const [number, setNumber] = useState(2);

  // icons and logo should always be memorized.
  const icons = useMemo(
    () => (
      <>
        {number > 0 && <HomeIconSet />}
        {number > 1 && <ProfileIconSet />}
        {number > 2 && <NotificationIconSet />}
      </>
    ),
    [number],
  );

  // logos and icons should always be memorized.
  const logo = useMemo(() => <TrashIconSet />, []);

  const component = useMemo(() => <Header />, []);

  const {title, setTitle} = useHeader({
    icons,
    // // you can remove the logo prop to see the default back icon.
    logo,
    // onBack,
    // // uncomment it if you don't want back icon.
    // hasBack: false,
    title: {children: 'My Component', fontWeight: 'bold', color: 'primary.500'},
    // // uncomment it if you don't want title.
    // hasTitle: false,

    // component,
  });

  return (
    <>
      <Input
        value={title?.children || ''}
        onChange={(value: string) =>
          setTitle(prev => ({...prev, children: value}))
        }
        placeholder="title"
      />
      <Button onPress={() => setNumber(1)}>1 Icon</Button>
      <Button onPress={() => setNumber(2)}>2 Icons</Button>
      <Button onPress={() => setNumber(3)}>3 Icons</Button>
    </>
  );

  function onBack() {
    console.log('on back');

    setNumber(0);
  }
}

function Header() {
  return (
    <View style={{flex: 1, left: 35, flexDirection: 'row', gap: 10}}>
      <User2Icon width={35} height={35} />
      <View
        style={{
          flexDirection: 'column',
          height: 20,
        }}>
        <Typography fontSize="xs">James</Typography>
        <Typography fontSize="xs">Last seen at 02:30am</Typography>
      </View>
    </View>
  );
}
