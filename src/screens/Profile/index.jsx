import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Setting2 } from 'iconsax-react-native';
import React from 'react';
import { ProfileData, BlogList } from '../../data';
import { ItemSmall } from '../../components';
import { fontType, colors } from '../../theme';

const formatNumber = number => {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return number.toString();
};

const data = BlogList.slice(5);

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Setting2 color={colors.white()} variant="Linear" size={24} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePic}
            source={{ uri: ProfileData.profilePict }}
            resizeMode="cover"
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{ProfileData.name}</Text>
            <Text style={styles.profileInfoText}>Member since {ProfileData.createdAt}</Text>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statsItem}>
              <Text style={styles.statsSum}>{ProfileData.blogPosted}</Text>
              <Text style={styles.statsTag}>Posted</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={styles.statsSum}>{formatNumber(ProfileData.following)}</Text>
              <Text style={styles.statsTag}>Following</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={styles.statsSum}>{formatNumber(ProfileData.follower)}</Text>
              <Text style={styles.statsTag}>Followers</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.buttonEdit}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.blogListContainer}>
          {data.map((item, index) => (
            <ItemSmall item={item} key={index} />
          ))}
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
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: colors.blue(),
  },
  contentContainer: {
    paddingBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 20,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    marginBottom: 5,
  },
  profileInfoText: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 20,
  },
  statsItem: {
    alignItems: 'center',
  },
  statsSum: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  statsTag: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(),
  },
  buttonEdit: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: colors.blue(),
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.white(),
  },
  blogListContainer: {
    paddingHorizontal: 24,
    gap: 10,
  },
});

export default Profile;