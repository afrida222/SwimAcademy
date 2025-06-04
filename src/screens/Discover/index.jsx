import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SearchNormal, Filter, ArrowRight, Profile, Location } from 'iconsax-react-native';
import { fontType, colors } from '../../theme';
import { trainingSchedule, categories } from '../../data';

const Discover = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [searchText, setSearchText] = useState('');

  const filteredData = trainingSchedule.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.coach.toLowerCase().includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === 1 || item.categoryId === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Temukan Kelas</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchNormal size={20} color={colors.grey(0.6)} variant="Linear" />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari kelas atau pelatih..."
            placeholderTextColor={colors.grey(0.6)}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.white()} variant="Linear" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Kategori</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                selectedCategory === category.id && styles.categoryItemSelected
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextSelected,
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recommended Classes */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Rekomendasi Kelas</Text>
          <TouchableOpacity style={styles.seeAll}>
            <Text style={styles.seeAllText}>Lihat Semua</Text>
            <ArrowRight size={16} color={colors.blue()} variant="Linear" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredData.slice(0, 3)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.classCard}>
              <Image source={{ uri: item.image }} style={styles.classImage} />
              <View style={styles.classContent}>
                <Text style={styles.classTitle}>{item.title}</Text>
                <View style={styles.classInfo}>
                  <Profile size={14} color={colors.blue()} variant="Linear" />
                  <Text style={styles.classText}>{item.coach}</Text>
                </View>
                <View style={styles.classInfo}>
                  <Location size={14} color={colors.blue()} variant="Linear" />
                  <Text style={styles.classText}>{item.location}</Text>
                </View>
                <View style={[
                  styles.levelBadge,
                  item.level === 'Pemula' ? styles.levelPemula :
                  item.level === 'Lanjutan' ? styles.levelLanjutan :
                  styles.levelMahir
                ]}>
                  <Text style={styles.levelText}>{item.level}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.classList}
        />
      </View>

      {/* All Classes */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Semua Kelas Tersedia</Text>
        <FlatList
          data={filteredData}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.classItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <View style={styles.itemInfo}>
                  <Profile size={14} color={colors.blue()} variant="Linear" />
                  <Text style={styles.itemText}>{item.coach}</Text>
                </View>
                <View style={styles.itemBottom}>
                  <View style={styles.itemLevel}>
                    <Text style={styles.levelText}>{item.level}</Text>
                  </View>
                  <Text style={styles.itemPrice}>Rp 250.000</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.classItems}
        />
      </View>
    </ScrollView>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blueLight(0.1),
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.blueDark(),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white(),
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontType['Pjs-Regular'],
    fontSize: 14,
    marginLeft: 8,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.blueDark(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Bold'],
    marginBottom: 12,
  },
  categories: {
    flexDirection: 'row',
    gap: 10,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.blue(0.3),
    backgroundColor: colors.white(),
  },
  categoryItemSelected: {
    backgroundColor: colors.blue(),
  },
  categoryText: {
    fontFamily: fontType['Pjs-Regular'],
    fontSize: 14,
  },
  categoryTextSelected: {
    color: colors.white(),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  seeAllText: {
    fontFamily: fontType['Pjs-Regular'],
    fontSize: 14,
  },
  classList: {
    gap: 16,
  },
  classCard: {
    width: 240,
    borderRadius: 16,
    backgroundColor: colors.white(),
    marginRight: 16,
    overflow: 'hidden',
  },
  classImage: {
    width: '100%',
    height: 120,
  },
  classContent: {
    padding: 12,
    gap: 6,
  },
  classTitle: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 14,
    marginBottom: 4,
  },
  classInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  classText: {
    fontFamily: fontType['Pjs-Regular'],
    fontSize: 13,
    color: colors.grey(0.8),
  },
  levelBadge: {
    marginTop: 6,
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  levelPemula: {
    backgroundColor: colors.blueLight(0.3),
  },
  levelLanjutan: {
    backgroundColor: colors.blue(0.2),
  },
  levelMahir: {
    backgroundColor: colors.blueDark(0.2),
  },
  levelText: {
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 12,
  },
  classItems: {
    gap: 16,
  },
  classItem: {
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: colors.white(),
    overflow: 'hidden',
    marginBottom: 16,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 14,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  itemBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLevel: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.blueLight(0.3),
  },
  itemPrice: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 14,
  },
});
