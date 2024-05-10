import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import NewsItem, {Article} from './NewsItem';
import {useInfiniteQuery} from '@tanstack/react-query';
import Config from 'react-native-config';

const Spacer = () => <View style={{height: 12}} />;
const Spinner = () => <ActivityIndicator style={{padding: 32}} />;

function NewsScreen() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['getNews'],
    queryFn: ({pageParam}) =>
      fetch(
        `https://newsapi.org/v2/everything?q=tech&pageSize=20&page=${pageParam}&apiKey=${Config.NEWSAPI_KEY}`,
      )
        .then(res => res.json())
        .then(json => json.articles as Article[])
        .then(articles =>
          articles.filter((item: Article) => item.title !== '[Removed]'),
        ),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  if (status === 'pending') {
    return Spinner();
  }

  if (status === 'error') {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <FlatList
      data={data.pages.flat()}
      renderItem={({item}) => <NewsItem article={item} />}
      ItemSeparatorComponent={() => Spacer()}
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      onEndReached={() => !isFetching && fetchNextPage()}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? Spinner() : null}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
});

export default NewsScreen;
