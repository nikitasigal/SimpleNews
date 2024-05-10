import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  GestureResponderEvent,
} from 'react-native';

export interface OnboardingContent {
  title: string;
  subtitle: string;
  image: NodeRequire;
}

type OnboardingItemProps = {
  content: OnboardingContent;
  advance: () => void;
};

function OnboardingItem({content, advance}: OnboardingItemProps) {
  const {width} = useWindowDimensions();

  const onTouchEvent = (e: GestureResponderEvent) => {
    if (e.nativeEvent.pageX / width > 0.65) {
      advance();
    }
  };

  return (
    <View style={[styles.container, {width}]} onTouchStart={onTouchEvent}>
      <Image source={content.image} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.subtitle}>{content.subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    flex: 0.8,
  },
  textContainer: {
    flex: 0.2,
    gap: 8,
  },
  title: {
    fontFamily: 'Futura Condensed Bold',
    fontSize: 36,
    color: 'black',
  },
  subtitle: {
    fontFamily: 'Futura',
    fontSize: 20,
    color: 'gray',
  },
});

export default OnboardingItem;
