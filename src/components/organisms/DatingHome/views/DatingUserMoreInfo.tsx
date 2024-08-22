import React, {useEffect, useState} from 'react';
import {DatingUser, MoreInfo} from '../models/user';
import {
  Box,
  CloseIconSet,
  HStack,
  HeartIconSet,
  Image,
  Typography,
  VStack,
  getColor,
} from '~/components/elemental';
import {Pressable, StyleSheet} from 'react-native';
import {Circle, useDisclose} from 'native-base';
import {createThumbnailVideo} from '~/utils/createThumbnailVideo';
import {IDatingSetupStageData} from '../../DatingSetup/types';
import ReportListModal from '~/components/molecules/ReportModal';
import {findDatingConfigByName} from '../hooks/DatingHome.hook';
import {isVideo} from '~/utils/isVideo';

type UserProps = {
  noLike?: Boolean;
  user: DatingUser;
  onLike: VoidFunction;
  onDislike: VoidFunction;
};

function AboutMe({user}: UserProps): JSX.Element {
  return (
    <>
      <Title>About me</Title>
      <Typography
        fontSize="sm"
        lineHeight={19}
        color="gray.500"
        fontWeight={400}>
        {user?.about}
      </Typography>
    </>
  );
}

export function Item({
  item,
  icon,
  selected,
}: {
  item: string;
  icon?: boolean;
  selected?: boolean;
}): JSX.Element {
  if (item?.length === 0) return null;

  return (
    <HStack
      marginRight={'2'}
      marginBottom={'2'}
      borderColor={selected ? 'primary.500' : 'gray.300'}
      borderRadius={'3'}
      borderWidth={'1'}
      paddingX={'6'}
      paddingY={'2'}
      backgroundColor={selected ? 'primary.100' : 'gray.50'}>
      {!!icon && (
        <HeartIconSet
          width={24}
          height={24}
          fill={getColor({color: 'primary.500'})}
          color={getColor({color: 'primary.500'})}
        />
      )}
      <Typography ml={2} color={'gray.800'}>
        {item}
      </Typography>
    </HStack>
  );
}

function Title({children}): JSX.Element {
  return (
    <Typography
      py={4}
      color="gray.800"
      fontWeight={600}
      fontSize="xl"
      lineHeight={'2xl'}>
      {children}
    </Typography>
  );
}

function MyBasics({title, list}: {title: string; list: string[]}): JSX.Element {
  return (
    <>
      <Title>{title}</Title>
      <HStack flex={1} flexWrap="wrap">
        {list?.map((p, i) => (
          <Item item={p} icon key={i} />
        ))}
      </HStack>
    </>
  );
}

function MoreImage({url}: {url: string}): JSX.Element {
  const [uri, setUri] = useState(url);

  useEffect(() => {
    if (!isVideo(url)) {
      setUri(url);
    } else {
      createThumbnailVideo(url).then(thumb => {
        setUri(thumb);
      });
    }
  }, [url]);

  return (
    <Box style={styles.imageBox}>
      <Typography></Typography>
      <Image style={styles.image} source={{uri}} />
    </Box>
  );
}

function InterestedIn({
  title,
  list,
  interestMeta,
}: {
  title: string;
  list: number[];
  interestMeta: IDatingSetupStageData;
}): JSX.Element {
  const all = interestMeta?.inputConfigs[0]?.options ?? [];
  return (
    <>
      <Title>{title}</Title>
      <HStack flex={1} flexWrap="wrap">
        {all?.map((p, i) => (
          <Item
            item={p.title}
            selected={list?.includes(p.value)}
            icon={null}
            key={i}
          />
        ))}
      </HStack>
    </>
  );
}

function TermDef({t}: {t: MoreInfo}): JSX.Element {
  return (
    <>
      <Typography
        lineHeight={22}
        fontWeight={600}
        fontSize="md"
        color="gray.800">
        {t.term}
      </Typography>
      <Typography lineHeight={10} />
      <Typography
        lineHeight={28}
        fontWeight={700}
        fontSize="2xl"
        color="gray.800">
        {t.def}
      </Typography>
      <Typography lineHeight={24} />
    </>
  );
}

function LikeBox(props: UserProps): JSX.Element {
  return (
    <HStack
      justifyContent="space-evenly"
      alignItems="center"
      my={6}
      flex={1}
      backgroundColor="primary.100"
      h={32}
      borderRadius={15}>
      <Box />
      <Pressable onPress={props.onDislike}>
        <Circle
          borderWidth={4}
          borderColor={getColor({color: 'primary.500'})}
          size="md"
          backgroundColor={getColor({color: 'primary.100'})}>
          <CloseIconSet
            width={40}
            height={40}
            fill={getColor({color: 'primary.500'})}
            color={getColor({color: 'primary.500'})}
          />
        </Circle>
      </Pressable>

      <Pressable onPress={props.onLike}>
        <Circle
          borderWidth={4}
          borderColor={getColor({color: 'primary.500'})}
          size="md"
          backgroundColor={getColor({color: 'primary.500'})}>
          <HeartIconSet width={24} height={24} fill={'#fff'} color="#fff" />
        </Circle>
      </Pressable>

      <Box />
    </HStack>
  );
}

function HideReport({user}: {user: DatingUser}): JSX.Element {
  const {onClose, onOpen, isOpen} = useDisclose();

  return (
    <Pressable onPress={onOpen}>
      <HStack justifyContent="center" marginTop={2} marginBottom={5}>
        <Typography fontSize="md" fontWeight={600} color="secondary.500">
          Hide & Report
        </Typography>
      </HStack>
      <ReportListModal
        targetEntityName="user"
        item={user}
        isVisible={isOpen}
        onClose={onClose}
      />
    </Pressable>
  );
}

export function DatingUserMoreInfo({
  user,
  onLike,
  onDislike,
  noLike,
}: UserProps): JSX.Element {
  return (
    <VStack>
      {user?.about?.length > 0 && (
        <AboutMe user={user} onLike={onLike} onDislike={onDislike} />
      )}
      <MyBasics title="My Basics" list={user?.basics ?? []} />
      <MyBasics title="More About Me" list={user?.moreAbout ?? []} />
      <Box size={4} />

      {(user?.avatar ?? []).map(
        (url, index) =>
          url !== '' && index !== 0 && <MoreImage key={index} url={url} />,
      )}

      <InterestedIn
        title="I’m interested in"
        list={user?.interestedIn ?? []}
        interestMeta={findDatingConfigByName('interests')}
      />
      <Title>More About Me</Title>
      {user?.moreInfo?.map((t, i) => (
        <TermDef t={t} key={i} />
      ))}

      {!noLike && <LikeBox onLike={onLike} onDislike={onDislike} user={user} />}

      {!noLike && <HideReport user={user} />}
    </VStack>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    marginTop: 8,
    width: '100%',
    height: 600,
    borderRadius: 25,
    overflow: 'hidden',
    position: 'relative',
  },

  image: {
    height: '100%',
    borderRadius: 10,
  },
});
