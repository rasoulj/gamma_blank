import React, {useLayoutEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import ItemSearchModal from './Modals/ItemSearchModal';
import SearchBar from './SearchBar';
import SortBy from './SortBy';
import {useGetCategories} from './hook';
import Tags from '~/components/atoms/Tags';
import useTrackedStates from './useStates';
import RecentSearch from './RecentSearch';
import useHeader from '~/components/elemental/hooks/use_header';
import EducationResult from './EducationResult';

const ItemSearch = ({children, entity}) => {
  const setFilters = useTrackedStates(state => state?.setFilters);
  const filters: any = useTrackedStates(state => state?.filters);
  const searchQuery = useTrackedStates(state => state?.searchQuery);
  const setSearchQuery = useTrackedStates(state => state?.setSearchQuery);

  const categoryType = {
    Product: 'productCategories',
    Post: 'postCategories',
    Event: 'eventCategories',
    Service: 'serviceCategories',
    Content: 'contentCategories',
    Course: 'educationCategories',
  };

  const {} = useHeader({hidden: true});
  useLayoutEffect(() => {
    return () => {
      setFilters({});
      setSearchQuery(null);
    };
  }, []);
  const {data, isLoading}: any = useGetCategories({
    key: categoryType[entity],
  });

  const categories = useMemo(() => {
    return data
      ? entity === 'Course'
        ? JSON?.parse(data?.staticConfig_getStaticConfig?.result?.value)?.map(
            item => item?.name,
          )
        : JSON?.parse(data?.staticConfig_getStaticConfig?.result?.value)
      : [];
  }, [data]);

  return (
    <>
      <SearchBar entity={entity} />
      {searchQuery ? (
        <>
          {filters?.haveProduct && entity !== 'Course' && (
            <>
              <Tags
                tags={filters?.availbleCategories || categories}
                selectedTags={filters?.category ? filters?.category : 'All'}
                setSelectedTags={item => [
                  item === 'All'
                    ? setFilters({...filters, category: null})
                    : setFilters({...filters, category: item}),
                ]}
              />
              {entity !== 'Course' && <SortBy />}
            </>
          )}
          <View style={styles.childrenView}>
            {entity === 'Course' ? <EducationResult /> : children}
          </View>
          <ItemSearchModal entity={entity} />
        </>
      ) : (
        <RecentSearch entity={entity} />
      )}
    </>
  );
};

export default ItemSearch;

const styles = StyleSheet.create({
  childrenView: {zIndex: 2, flex: 1},
});
