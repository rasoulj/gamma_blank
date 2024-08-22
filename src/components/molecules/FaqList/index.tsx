import {HStack, VStack} from 'native-base';
import React, {useState} from 'react';
import {FlatList, Pressable, StyleSheet} from 'react-native';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Typography,
  getColor,
} from '~/components';

export default function FAQList({data}: {data: any}) {
  const [selectedItem, setSelectedItem] = useState();

  const handleArrowDirection = i => {
    selectedItem == i ? setSelectedItem() : setSelectedItem(i);
  };

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
      renderItem={({item, index}) => (
        <Pressable onPress={() => handleArrowDirection(index)}>
          <VStack
            w="99%"
            alignSelf="center"
            my="4px"
            shadow={'3'}
            p="4"
            bg={getColor({color: 'background.500'})}
            borderRadius="md">
            <HStack alignSelf="center" justifyContent="space-between">
              <Typography
                color={getColor({color: 'gray.800'})}
                fontSize="sm"
                lineHeight={19}
                fontWeight={'500'}
                flex={1}>
                {item?.question}
              </Typography>
              {selectedItem === index ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </HStack>
            {selectedItem === index && (
              <VStack
                width="100%"
                alignSelf="center"
                mt={'16px'}
                py="2"
                bg={getColor({color: 'background.500'})}>
                <Typography
                  color={getColor({color: 'gray.500'})}
                  fontSize="sm"
                  lineHeight={19}
                  fontWeight={'400'}
                  flex={1}>
                  {item?.answer}
                </Typography>
              </VStack>
            )}
          </VStack>
        </Pressable>
      )}
      keyExtractor={(item, index) => index.toString()}
      onEndReachedThreshold={0.9}
      ListEmptyComponent={null}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    marginBottom: 100,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 10,
  },
});
