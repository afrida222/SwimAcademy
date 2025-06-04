import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Image } from 'react-native';
import { ArrowLeft, Calendar, Clock, Location, Edit2, Trash } from 'iconsax-react-native';
import * as ImagePicker from 'expo-image-picker';
import { updateBookmark, deleteBookmark, getBookmarks } from '../../utils/bookmarkStorage';
import { colors, fontType } from '../../theme';
import { showErrorNotification, showConfirmationDialog } from '../../utils/notifications';

const EditBookmarkForm = ({ navigation, route }) => {
  const { bookmarkId } = route.params;
  const [formData, setFormData] = useState({
    title: '',
    coach: '',
    date: '',
    time: '',
    location: '',
    level: 'Pemula',
    image: null,
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const levels = ['Pemula', 'Menengah', 'Lanjutan'];

  useEffect(() => {
    const loadBookmark = async () => {
      try {
        const bookmarks = await getBookmarks();
        const bookmarkToEdit = bookmarks.find(item => item.id === bookmarkId);
        if (bookmarkToEdit) {
          setFormData({
            title: bookmarkToEdit.title,
            coach: bookmarkToEdit.coach,
            date: bookmarkToEdit.date,
            time: bookmarkToEdit.time,
            location: bookmarkToEdit.location,
            level: bookmarkToEdit.level || 'Pemula',
            image: bookmarkToEdit.image,
            description: bookmarkToEdit.description || ''
          });
        }
      } catch (error) {
        showErrorNotification('Error', 'Failed to load bookmark');
        console.error('Load bookmark error:', error);
      }
    };
    
    loadBookmark();
  }, [bookmarkId]);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        showErrorNotification('Permission required', 'Please allow access to your photos');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        setFormData({...formData, image: result.assets[0].uri});
      }
    } catch (error) {
      showErrorNotification('Error', 'Failed to pick image');
      console.error('Image picker error:', error);
    }
  };

  const handleUpdate = async () => {
    if (isSubmitting) return;

    if (!formData.title || !formData.coach || !formData.date || 
        !formData.time || !formData.location) {
      showErrorNotification('Error', 'Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await updateBookmark(bookmarkId, formData);
      navigation.goBack();
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    showConfirmationDialog(
      'Delete Schedule',
      'Are you sure you want to delete this training schedule?',
      async () => {
        try {
          await deleteBookmark(bookmarkId);
          navigation.goBack();
        } catch (error) {
          console.error('Delete error:', error);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.white()} />
        </Pressable>
        <Text style={styles.title}>Edit Training Schedule</Text>
        <Pressable onPress={handleDelete}>
          <Trash size={24} color={colors.white()} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Image Upload */}
        <Pressable style={styles.imageUpload} onPress={pickImage}>
          {formData.image ? (
            <Image source={{ uri: formData.image }} style={styles.imagePreview} />
          ) : (
            <>
              <Edit2 size={40} color={colors.blue()} />
              <Text style={styles.imageUploadText}>Change Training Image</Text>
            </>
          )}
        </Pressable>

        {/* Title */}
        <Text style={styles.label}>Training Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter training title"
          value={formData.title}
          onChangeText={(text) => setFormData({...formData, title: text})}
        />

        {/* Coach */}
        <Text style={styles.label}>Coach *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter coach name"
          value={formData.coach}
          onChangeText={(text) => setFormData({...formData, coach: text})}
        />

        {/* Date */}
        <Text style={styles.label}>Date *</Text>
        <View style={styles.inputWithIcon}>
          <Calendar size={20} color={colors.blue()} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="DD/MM/YYYY"
            value={formData.date}
            onChangeText={(text) => setFormData({...formData, date: text})}
          />
        </View>

        {/* Time */}
        <Text style={styles.label}>Time *</Text>
        <View style={styles.inputWithIcon}>
          <Clock size={20} color={colors.blue()} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="HH:MM AM/PM"
            value={formData.time}
            onChangeText={(text) => setFormData({...formData, time: text})}
          />
        </View>

        {/* Location */}
        <Text style={styles.label}>Location *</Text>
        <View style={styles.inputWithIcon}>
          <Location size={20} color={colors.blue()} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Enter location"
            value={formData.location}
            onChangeText={(text) => setFormData({...formData, location: text})}
          />
        </View>

        {/* Level */}
        <Text style={styles.label}>Difficulty Level *</Text>
        <View style={styles.levelContainer}>
          {levels.map(level => (
            <Pressable
              key={level}
              style={[
                styles.levelButton,
                formData.level === level && styles.activeLevelButton(level)
              ]}
              onPress={() => setFormData({...formData, level})}
            >
              <Text style={[
                styles.levelText,
                formData.level === level && styles.activeLevelText(level)
              ]}>
                {level}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Enter training description"
          multiline
          numberOfLines={4}
          value={formData.description}
          onChangeText={(text) => setFormData({...formData, description: text})}
        />

        {/* Submit Button */}
        <Pressable 
          style={[styles.submitButton, isSubmitting && { opacity: 0.7 }]} 
          onPress={handleUpdate}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Updating...' : 'Update Schedule'}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

// Use the same styles as AddBookmarkForm
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
    backgroundColor: colors.blueDark(),
  },
  title: {
    fontSize: 20,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.white(),
  },
  formContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  imageUpload: {
    height: 180,
    backgroundColor: colors.blueLight(0.1),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.blueLight(0.5),
    borderStyle: 'dashed',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  imageUploadText: {
    fontFamily: fontType['Pjs-Medium'],
    color: colors.blue(),
    marginTop: 10,
  },
  label: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
    color: colors.blueDark(),
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.blueLight(0.1),
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.blueDark(),
    fontSize: 14,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.blueLight(0.1),
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  levelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  levelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.blueLight(0.5),
  },
  activeLevelButton: (level) => ({
    backgroundColor: 
      level === 'Pemula' ? colors.blueLight(0.3) : 
      level === 'Menengah' ? colors.blue(0.2) : 
      colors.blueDark(0.2),
    borderColor: 'transparent',
  }),
  levelText: {
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 14,
    color: colors.blueDark(),
  },
  activeLevelText: (level) => ({
    color: 
      level === 'Pemula' ? colors.blueDark() : 
      level === 'Menengah' ? colors.blue() : 
      colors.white(),
  }),
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: colors.blueDark(),
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontFamily: fontType['Pjs-Bold'],
    color: colors.white(),
    fontSize: 16,
  },
});

export default EditBookmarkForm;