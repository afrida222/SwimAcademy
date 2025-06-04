// src/screens/BookmarkDetail.jsx
import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView 
} from 'react-native';
import { ArrowLeft, Edit2 } from 'iconsax-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, fontType } from '../../theme';

const BookmarkDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookmark } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.blueDark()} variant="Linear" />
        </TouchableOpacity>
        <Text style={styles.title}>Detail Jadwal</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditBookmark', { bookmark })}>
          <Edit2 size={24} color={colors.blueDark()} variant="Linear" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Image 
          source={{ uri: bookmark.image || 'https://via.placeholder.com/300' }} 
          style={styles.image} 
        />
        
        <Text style={styles.titleText}>{bookmark.title}</Text>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Pelatih:</Text>
          <Text style={styles.detailValue}>{bookmark.coach}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Tanggal:</Text>
          <Text style={styles.detailValue}>{bookmark.date}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Waktu:</Text>
          <Text style={styles.detailValue}>{bookmark.time}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Lokasi:</Text>
          <Text style={styles.detailValue}>{bookmark.location}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Tingkat:</Text>
          <View style={[
            styles.levelBadge,
            bookmark.level === 'Pemula' && { backgroundColor: colors.blueLight(0.3) },
            bookmark.level === 'Lanjutan' && { backgroundColor: colors.blue(0.2) },
            bookmark.level === 'Expert' && { backgroundColor: colors.blueDark(0.2) },
          ]}>
            <Text style={[
              styles.levelText,
              bookmark.level === 'Pemula' && { color: colors.blueDark() },
              bookmark.level === 'Lanjutan' && { color: colors.blue() },
              bookmark.level === 'Expert' && { color: colors.white() },
            ]}>
              {bookmark.level}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey(0.2),
  },
  title: {
    fontSize: 20,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.blueDark(),
  },
  content: {
    padding: 24,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  titleText: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.blueDark(),
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    width: 80,
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.blueDark(),
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.8),
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelText: {
    fontSize: 12,
    fontFamily: fontType['Pjs-SemiBold'],
  },
});

export default BookmarkDetail;