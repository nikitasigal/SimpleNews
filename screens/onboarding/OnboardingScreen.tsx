import React, {useRef, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import OnboardingItem, {OnboardingContent} from './OnboardingItem';

function OnboardingScreen({setFinished}) {
  const data: OnboardingContent[] = [
    {
      title: 'Welcome to SimpleNews!',
      subtitle: 'The best place to get your news',
      image: require('../../assets/images/newspaper.png'),
    },
    {
      title: "See what's important.",
      subtitle: 'Intersting articles from reliable sources',
      image: require('../../assets/images/campaign.png'),
    },
    {
      title: 'Stay in touch.',
      subtitle: '24/7 coverage',
      image: require('../../assets/images/notification.png'),
    },
  ];
  const [index, setIndex] = useState(0);
  const viewableItemsChanged = useRef(({viewableItems}) =>
    setIndex(viewableItems[0].index),
  ).current;

  const flatListRef = useRef<FlatList>(null);
  const advancePage = () => {
    if (index + 1 < data.length) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: index + 1,
      });
    } else {
      setFinished(true);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <OnboardingItem content={item} advance={advancePage} />
        )}
        ref={flatListRef}
        scrollEnabled={false}
        pagingEnabled
        horizontal
        onViewableItemsChanged={viewableItemsChanged}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default OnboardingScreen;
