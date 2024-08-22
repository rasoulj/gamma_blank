import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ArrowBackIcon} from '../../elemental';

const RenderHeader = () => {
  return (
    <Text
      style={{
        color: 'white',
        alignSelf: 'center',
        marginVertical: 15,
        fontSize: 16,
      }}>
      Recent Searches
    </Text>
  );
};

const RecentSearch = ({data, onLoadMore}: {data: any; onLoadMore: any}) => {
  const Item = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        style={{
          borderBottomWidth: 1,
          borderColor: 'white',
          paddingVertical: 10,
          marginVertical: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '700',
          }}>
          {item?.title}
        </Text>
        <ArrowBackIcon
          color="white"
          style={{
            transform: [{rotate: '180deg'}],
          }}
          width={10}
          height={18}
        />
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}: {item: any}) => <Item {...{item}} />;

  return (
    <>
      {data?.pages?.length > 0 ? (
        <FlatList
          style={styles.flex1}
          data={data?.pages || []}
          keyExtractor={(_, index) => `key${index}`}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          // ListHeaderComponent={RenderHeader}
          onEndReachedThreshold={0.9}
          onEndReached={() => onLoadMore?.()}
        />
      ) : (
        <Text style={{textAlign: 'center', marginTop: 20}}>No Result</Text>
      )}
    </>
  );
};

export default RecentSearch;

const styles = StyleSheet.create({
  flex1: {
    marginTop: 20,
    backgroundColor: '#1DE9B6',
    borderRadius: 15,
    flexGrow: 0,
  },
  contentContainerStyle: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingBottom: 40,
  },
});
