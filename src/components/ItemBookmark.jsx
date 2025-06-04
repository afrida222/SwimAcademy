import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import { Receipt21, Clock, Message } from 'iconsax-react-native';
import { fontType, colors } from '../theme';

const truncateTextByWords = (text, maxWords) => {
  const words = text.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + ' ...';
  }
  return text;
};

const ItemBookmark = ({ item, onPress, variant }) => {
  return (
    <TouchableOpacity style={styles.cardItem} onPress={() => {}}>
      <ImageBackground
        style={styles.cardImage}
        source={{ uri: item.image }}
        resizeMode="cover"
        imageStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View style={styles.cardContent}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryLabel}>{item.category}</Text>
          </View>
          <TouchableOpacity onPress={onPress} style={styles.bookmarkIcon}>
            <Receipt21 color={colors.blue(1)} variant={variant} size={22} />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.cardBody}>
        <Text style={styles.blogTitle}>{item.title}</Text>
        <Text style={styles.blogContent}>{truncateTextByWords(item.content, 12)}</Text>

        <View style={styles.cardInfo}>
          <View style={styles.infoItem}>
            <Clock size={14} variant="Linear" color={colors.grey(0.8)} />
            <Text style={styles.infoText}>{item.createdAt}</Text>
          </View>
          <View style={styles.infoItem}>
            <Message size={14} variant="Linear" color={colors.grey(0.8)} />
            <Text style={styles.infoText}>{item.totalComments}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemBookmark;

const styles = StyleSheet.create({
  cardItem: {
    backgroundColor: colors.white(),
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 160,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 12,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-start',
  },
  categoryBadge: {
    backgroundColor: colors.blue(0.9),
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryLabel: {
    fontSize: 10,
    color: colors.white(),
    fontFamily: fontType['Pjs-SemiBold'],
  },
  bookmarkIcon: {
    backgroundColor: colors.white(0.9),
    padding: 6,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.blue(0.3),
  },
  cardBody: {
    padding: 16,
    gap: 10,
  },
  blogTitle: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  blogContent: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.grey(0.8),
    fontFamily: fontType['Pjs-Regular'],
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(0.8),
  },
});
