import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Receipt21 } from 'iconsax-react-native';
import { colors, fontType } from '../theme';

const ItemHorizontal = ({ item, variant, onPress }) => {
  return (
    <View style={styles.cardItem}>
      <ImageBackground
        style={styles.cardImage}
        source={{ uri: item.image }}
        resizeMode="cover"
        imageStyle={{ borderRadius: 20 }}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.cardText}>{item.createdAt}</Text>
          </View>
          <TouchableOpacity onPress={onPress} style={styles.cardIcon}>
            <Receipt21 color={colors.white()} variant={variant} size={20} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = (item, bookmark, toggleBookmark) => {
  const variant = bookmark.includes(item.id) ? 'Bold' : 'Linear';
  return (
    <ItemHorizontal
      item={item}
      variant={variant}
      onPress={() => toggleBookmark(item.id)}
    />
  );
};

const ListHorizontal = ({ data }) => {
  const [bookmark, setBookmark] = useState([]);

  const toggleBookmark = (itemId) => {
    if (bookmark.includes(itemId)) {
      setBookmark(bookmark.filter((id) => id !== itemId));
    } else {
      setBookmark([...bookmark, itemId]);
    }
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => renderItem(item, bookmark, toggleBookmark)}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={styles.contentContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default ListHorizontal;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 24,
  },
  separator: {
    width: 15,
  },
  cardItem: {
    width: 280,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.blue(0.08),
  },
  cardImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cardInfo: {
    justifyContent: 'flex-end',
    gap: 6,
    maxWidth: '70%',
  },
  cardTitle: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 15,
    color: colors.white(),
  },
  cardText: {
    fontSize: 11,
    color: colors.white(0.8),
    fontFamily: fontType['Pjs-Medium'],
  },
  cardIcon: {
    backgroundColor: colors.white(0.25),
    padding: 6,
    borderColor: colors.white(0.7),
    borderWidth: 1,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
});
