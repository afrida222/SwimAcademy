import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Notification, SearchNormal } from 'iconsax-react-native';
import * as Animatable from 'react-native-animatable';

import { fontType, colors } from '../../theme';
import { ListHorizontal, ItemSmall } from '../../components';
import { CategoryList, BlogList } from '../../data';

const ItemCategory = ({ item, onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[category.item, { borderColor: color }]}>
        <Text style={{ ...category.title, color }}>{item.categoryName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Separator = () => <View style={categoryListStyle.separator} />;

const FlatListCategory = () => {
  const [selected, setSelected] = useState(1);

  const renderItem = ({ item }) => {
    const color = item.id === selected ? colors.blue() : colors.grey(0.6);
    return (
      <ItemCategory
        item={item}
        onPress={() => setSelected(item.id)}
        color={color}
      />
    );
  };

  return (
    <FlatList
      data={CategoryList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      contentContainerStyle={categoryListStyle.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const ListBlog = () => {
  const horizontalData = BlogList.slice(0, 5);
  const verticalData = BlogList.slice(5);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.listBlog}>
        <Text style={[styles.sectionTitle, styles.sectionTitleSpacing]}>
          Top Swim Classes
        </Text>
        <ListHorizontal data={horizontalData} />

        <Text style={styles.sectionTitle}>Artikel Terbaru</Text>
        <View style={styles.listCard}>
          {verticalData.map((item, index) => (
            <ItemSmall item={item} key={index} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default function Home() {
  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInDown" duration={600} style={styles.header}>
        <Text style={styles.title}>SwimAcademy</Text>
        <Notification color={colors.black()} variant="Linear" size={24} />
      </Animatable.View>

      <Animatable.View animation="fadeIn" delay={200} duration={600} style={searchBar.container}>
        <TextInput style={searchBar.input} placeholder="Cari kelas atau topik..." />
        <View style={searchBar.button}>
          <SearchNormal size={20} color={colors.white()} />
        </View>
      </Animatable.View>

      <Animatable.View animation="slideInLeft" delay={400} duration={600} style={styles.listCategory}>
        <FlatListCategory />
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={600} duration={800} style={{ flex: 1 }}>
        <ListBlog />
      </Animatable.View>
    </View>
  );
}

// Style Utama
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingTop: 10,
    backgroundColor: colors.white(),
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.blue(1),
  },
  listCategory: {
    paddingVertical: 12,
  },
  listBlog: {
    paddingVertical: 12,
    gap: 12,
  },
  listCard: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    paddingHorizontal: 24,
  },
  sectionTitleSpacing: {
    marginTop: 16,
  },
});

// Style Kategori
const category = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1.5,
    alignItems: 'center',
    backgroundColor: colors.grey(0.08),
  },
  title: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
    lineHeight: 18,
  },
});

// Style FlatListCategory
const categoryListStyle = StyleSheet.create({
  separator: {
    width: 10,
  },
  container: {
    paddingHorizontal: 24,
  },
});

// Style SearchBar
const searchBar = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.grey(0.1),
    paddingHorizontal: 16,
    fontFamily: fontType['Pjs-Regular'],
    fontSize: 14,
  },
  button: {
    width: 44,
    height: 44,
    backgroundColor: colors.blue(),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
