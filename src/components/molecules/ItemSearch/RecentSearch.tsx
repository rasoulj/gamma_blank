import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {Fragment} from 'react';
import {
  getColor,
  ArrowRightIconSet,
  Layer,
  Typography,
} from '~/components/elemental';
import useTrackedStates from './useStates';
import {useGetSearchHistory} from './hook';
import useAuthStore from '~/stores/authStore';
import SearchHistoryIcon from '~/assets/icons/CustomIcons/SearchHistory.icon';
import {ProductList} from '~/components/organisms/Product';
import EducationResult from './EducationResult';
import {Divider} from 'native-base';

const RecentSearch = ({entity = 'Product'}: {entity?: string}) => {
  const setSearchQuery = useTrackedStates(state => state?.setSearchQuery);

  const userId = useAuthStore(state => state?.user?.id);
  const {data} = useGetSearchHistory({
    where: {
      userId: {
        eq: userId,
      },
      type: {
        eq: entity,
      },
    },
    order: {
      createdDate: 'DESC',
    },
  });

  const header = () => (
    <View style={styles.container}>
      {data?.pages?.map((i: any, index: number) => (
        <Fragment>
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => setSearchQuery(i?.value)}>
            <Typography style={styles.listItemText}>{i?.value}</Typography>
            <ArrowRightIconSet />
          </TouchableOpacity>

          {index < data?.pages?.length - 1 && (
            <Divider bg={getColor({color: 'gray.300'})} mb="" />
          )}
        </Fragment>
      ))}
    </View>
  );

  return data?.pages?.length > 0 ? (
    entity === 'Course' ? (
      <EducationResult recentSearch={header} />
    ) : (
      <ProductList headerComponent={header} />
    )
  ) : (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Layer style={styles.noHistoryContainer}>
        <SearchHistoryIcon />
        <Typography color={'gray.400'} style={styles.noHistoryText}>
          You have no Search History
        </Typography>
      </Layer>
    </TouchableWithoutFeedback>
  );
};

export default RecentSearch;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    width: '100%',
    backgroundColor: getColor({color: 'background.700'}),
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    alignSelf: 'center',
  },
  noHistoryContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noHistoryText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '500',
  },
});
