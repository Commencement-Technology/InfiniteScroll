import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useGetPostsQuery} from '../store/postSlice/postSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fetchImages} from '../utils/helper';

const InfiniteScrollList = () => {
  const padding = useSafeAreaInsets();

  const [page, setPage] = useState(1);

  const {data, error, isFetching} = useGetPostsQuery(page);

  const loadMore = useCallback(() => {
    if (!isFetching) {
      setPage(prev => prev + 1);
    }
  }, [isFetching]);

  if (isFetching && page === 1)
    return <ActivityIndicator style={styles.loader} size="large" />;

  if (error)
    return (
      <Text style={styles.error}>
        Error:{' '}
        {error && 'message' in error ? error.message : 'Something went wrong'}
      </Text>
    );

  const renderItem = (item: any, index: number) => (
    <View style={styles.photoContainer}>
      <Image source={{uri: fetchImages(index)}} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View
      style={{
        paddingTop: padding.top,
        // paddingBottom: padding.bottom,
        paddingLeft: 12,
        paddingRight: 12,
        flex: 1,
      }}>
      <FlatList
        data={data || []}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => renderItem(item, index)}
        onEndReached={loadMore}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  photoContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
    flexShrink: 1,
  },
});

export default InfiniteScrollList;
