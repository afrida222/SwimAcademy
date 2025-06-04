import { StyleSheet, Text, View, Image } from 'react-native';
import { Receipt21, Clock, Message } from 'iconsax-react-native';
import React from 'react';
import { fontType, colors } from '../theme';

const ItemSmall = ({ item }) => {
  return (
    <View style={styles.cardItem}>
      <Image
        style={styles.cardImage}
        source={{ uri: item.image }}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <View style={styles.cardTop}>
          <View style={styles.textContainer}>
            <Text style={styles.cardCategory}>{item.category}</Text>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
          <Receipt21 color={colors.grey(0.6)} variant="Linear" size={20} />
        </View>
        <View style={styles.cardInfo}>
          <Clock size={10} variant="Linear" color={colors.grey(0.6)} />
          <Text style={styles.cardText}>{item.createdAt}</Text>
          <Message size={10} variant="Linear" color={colors.grey(0.6)} />
          <Text style={styles.cardText}>{item.totalComments}</Text>
        </View>
      </View>
    </View>
  );
};

export default ItemSmall;

const styles = StyleSheet.create({
  cardItem: {
    flexDirection: 'row',
    backgroundColor: colors.white(),
    borderRadius: 14,
    elevation: 1,
    shadowColor: colors.black(0.05),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 6,
    marginHorizontal: 24,
  },
  cardImage: {
    width: 90,
    height: 90,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  textContainer: {
    flex: 1,
    gap: 5,
  },
  cardCategory: {
    color: colors.blue(),
    fontSize: 11,
    fontFamily: fontType['Pjs-SemiBold'],
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  cardText: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(0.6),
  },
});
