import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { AddSquare, ArrowLeft } from 'iconsax-react-native';
import { getBookmarks } from '../../utils/bookmarkStorage';
import { colors, fontType } from '../../theme';
import { showErrorNotification } from '../../utils/notifications';

const Bookmark = ({ navigation }) => {
  const [trainingSchedule, setTrainingSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadBookmarks = async () => {
    try {
      const bookmarks = await getBookmarks();
      setTrainingSchedule(bookmarks ?? []);
    } catch (error) {
      showErrorNotification('Error', 'Failed to load bookmarks');
      console.error("Failed to load bookmarks:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadBookmarks);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadBookmarks();
  };

  const renderBookmarkItem = (item) => (
    <View key={item.id} style={styles.bookmarkItem}>
      <Text style={styles.bookmarkTitle}>{item.title}</Text>
      <Text style={styles.bookmarkDetail}>Coach: {item.coach}</Text>
      <Text style={styles.bookmarkDetail}>Date: {item.date}</Text>
      <Text style={styles.bookmarkDetail}>Time: {item.time}</Text>
      <Text style={styles.bookmarkDetail}>Location: {item.location}</Text>
      <View style={[styles.levelBadge, { 
        backgroundColor: 
          item.level === "Pemula" ? colors.blueLight(0.3) :
          item.level === "Menengah" ? colors.blue(0.2) :
          colors.blueDark(0.2)
      }]}>
        <Text style={styles.levelText}>{item.level}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.blueLight(0.1) }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.blueDark() }]}>
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.white()} variant="Linear" size={24} />
        </Pressable>
        <Text style={[styles.title, { color: colors.white() }]}>My Schedule</Text>
        <Pressable 
          style={styles.addButton} 
          onPress={() => navigation.navigate("AddBookmarkForm")}
        >
          <AddSquare size={24} color={colors.white()} />
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.blue()]}
            tintColor={colors.blue()}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : trainingSchedule.length === 0 ? (
          <Text style={styles.emptyText}>No schedules saved yet</Text>
        ) : (
          trainingSchedule.map(renderBookmarkItem)
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingTop: 10,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontFamily: fontType["Pjs-Bold"],
  },
  bookmarkItem: {
    backgroundColor: colors.white(),
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 16,
    elevation: 2,
  },
  bookmarkTitle: {
    fontSize: 16,
    fontFamily: fontType["Pjs-Bold"],
    color: colors.blueDark(),
    marginBottom: 8,
  },
  bookmarkDetail: {
    fontSize: 14,
    fontFamily: fontType["Pjs-Regular"],
    color: colors.grey(0.8),
    marginBottom: 4,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
  },
  levelText: {
    fontSize: 12,
    fontFamily: fontType["Pjs-SemiBold"],
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: colors.blueDark(),
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 10,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 40,
    color: colors.grey(),
    fontFamily: fontType['Pjs-Medium'],
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: colors.grey(),
    fontFamily: fontType['Pjs-Medium'],
  },
  scrollContent: {
    paddingVertical: 16,
  },
});

export default Bookmark;