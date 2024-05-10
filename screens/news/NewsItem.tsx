import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';

export interface Article {
  source: {
    id: null | string;
    name: string;
  };
  author: string;
  title: string;
  description: null | string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

function timeSince(dateString: string): string {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(dateString).getTime()) / 1000,
  );
  let interval = seconds;

  if (seconds < 60) {
    return `${seconds}s`;
  }

  interval = Math.floor(seconds / 60);
  if (interval < 60) {
    return `${interval}m`;
  }

  interval = Math.floor(interval / 60);
  if (interval < 24) {
    return `${interval}h`;
  }

  interval = Math.floor(interval / 24);
  return `${interval}d`;
}

function NewsItem(item: Article) {
  getShadowProps();

  return (
    <View style={[styles.container, styles.shadow]}>
      <View style={styles.newsRow}>
        {item.urlToImage && (
          <Image source={{uri: item.urlToImage}} style={styles.image} />
        )}
        <Text style={styles.title} numberOfLines={4}>
          {item.title}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailsRow}>
        <Text style={styles.detail} numberOfLines={1}>
          {timeSince(item.publishedAt)}
        </Text>
        <Text style={styles.detail} numberOfLines={1}>
          {item.source.name}
        </Text>
      </View>
    </View>
  );
}

function getShadowProps() {
  if (Platform.OS === 'ios') {
    styles.shadow = {
      shadowRadius: 8,
      shadowOpacity: 0.15,
      shadowOffset: {
        width: 2,
        height: 2,
      },
    };
  } else if (Platform.OS === 'android') {
    styles.shadow = {
      elevation: 4,
    };
  }
}

const styles = StyleSheet.create({
  shadow: {},
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  newsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  title: {
    flex: 1,
    fontFamily: 'Futura Condensed Medium',
    fontSize: 24,
  },
  image: {
    width: 120,
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: 'whitesmoke',
  },

  divider: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },

  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: 'gray',
    minWidth: 'auto',
  },
});

export default NewsItem;
