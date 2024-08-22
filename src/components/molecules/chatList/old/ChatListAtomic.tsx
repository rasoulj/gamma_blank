import React, {useState} from 'react';
import {Button} from 'native-base';
import {Text, View} from 'react-native';
import {Route, SceneRendererProps} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './ChatListAtomic.styles';
import Search from './list/Search';
import Tab from './list/Tab';
import AllChats from './list/AllChats';
import {ChatProfileProps} from './ChatProfile';
import PersonList from '../PersonList';

export interface ChatListAtomicProps {
  className?: string;
  onSearch: (value: string) => void;
  members: ChatProfileProps[];
  onClickItem: (index: number) => void;
  onClickBack?: () => void;
}

const ChatListAtomic = ({
  className,
  onSearch,
  members,
  onClickItem,
  onClickBack,
}: ChatListAtomicProps) => {
  const [isNew, setIsNew] = useState(false);
  const routes: Route[] = [
    {
      key: 'all',
      title: 'All Chat',
    },
    {
      key: 'group',
      title: 'Group',
    },
    {
      key: 'private',
      title: 'Private',
    },
  ];

  const renderer = (
    props: SceneRendererProps & {
      route: Route;
    },
  ) => {
    const current = routes.find(item => item.key === props.route.key);
    switch (current.key) {
      case routes[0].key:
        return <AllChats members={members} onClick={onClickItem} />;
      case routes[1].key:
        return (
          <View>
            <Text>{routes[1].title}</Text>
          </View>
        );
      case routes[2].key:
        return (
          <View>
            <Text>{routes[2].title}</Text>
          </View>
        );
      default:
        return (
          <View>
            <Text>no one</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.Container}>
      <Search
        onClickSearch={(searchKey: string) => onSearch(searchKey)}
        onClickBack={onClickBack}
      />
      {/* <Tab routes={routes} renderer={renderer} /> */}
      <AllChats members={members} onClick={onClickItem} />
      <Button
        marginTop={5}
        rounded={'full'}
        marginBottom={5}
        padding={3}
        width="90%"
        fontWeight={'extrabold'}
        leftIcon={<Icon name="message-plus-outline" size={20} color="#fff" />}
        onPress={() => setIsNew(true)}>
        <Text style={styles.StyledButton}>New</Text>
      </Button>
    </View>
  );
};

export default ChatListAtomic;
