import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  ScrollView, 
  StyleSheet, 
  Image, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import { ArrowLeft, Calendar, Clock, Location, AddSquare } from 'iconsax-react-native';
import * as ImagePicker from 'expo-image-picker';
import { addBookmark } from '../../utils/bookmarkStorage';
import { colors, fontType } from '../../theme';
import { showErrorNotification } from '../../utils/notifications';

const AddBookmarkForm = ({ navigation }) => {
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

  // Define fields configuration
  const fields = [
    {
      label: 'Training Title *',
      key: 'title',
      placeholder: 'Enter training title',
    },
    {
      label: 'Coach *',
      key: 'coach',
      placeholder: 'Enter coach name',
    },
    {
      label: 'Date *',
      key: 'date',
      placeholder: 'DD/MM/YYYY',
      icon: <Calendar size={20} color={colors.blue()} />
    },
    {
      label: 'Time *',
      key: 'time',
      placeholder: 'HH:MM AM/PM',
      icon: <Clock size={20} color={colors.blue()} />
    },
    {
      label: 'Location *',
      key: 'location',
      placeholder: 'Enter location',
      icon: <Location size={20} color={colors.blue()} />
    }
  ];

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
        setFormData({ ...formData, image: result.assets[0].uri });
      }
    } catch (error) {
      showErrorNotification('Error', 'Failed to pick image');
      console.error('Image picker error:', error);
    }
  };

  const isValidDate = (date) => /^\d{2}\/\d{2}\/\d{4}$/.test(date);
  const isValidTime = (time) => /^([0-9]{1,2}):([0-9]{2})\s?(AM|PM)$/i.test(time);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const { title, coach, date, time, location } = formData;

    // Validation checks
    if (!title || !coach || !date || !time || !location) {
      showErrorNotification('Error', 'Please fill all required fields');
      return;
    }

    if (!isValidDate(date)) {
      showErrorNotification('Invalid Date', 'Date must be in DD/MM/YYYY format');
      return;
    }

    if (!isValidTime(time)) {
      showErrorNotification('Invalid Time', 'Time must be in HH:MM AM/PM format');
      return;
    }

    setIsSubmitting(true);
    try {
      await addBookmark(formData);
      navigation.goBack();
    } catch (error) {
      console.error('Submit error:', error);
      showErrorNotification('Error', 'Failed to save training schedule');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color={colors.white()} />
          </Pressable>
          <Text style={styles.title}>Add Training Schedule</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable 
            style={styles.imageUpload} 
            onPress={pickImage}
          >
            {formData.image ? (
              <Image 
                source={{ uri: formData.image }} 
                style={styles.imagePreview} 
                resizeMode="cover"
              />
            ) : (
              <>
                <AddSquare size={40} color={colors.blue()} />
                <Text style={styles.imageUploadText}>Add Training Image</Text>
              </>
            )}
          </Pressable>

          {fields.map(({ label, key, placeholder, icon }) => (
            <View key={key} style={styles.fieldContainer}>
              <Text style={styles.label}>{label}</Text>
              <View style={styles.inputWrapper}>
                {icon && <View style={styles.iconContainer}>{icon}</View>}
                <TextInput
                  style={styles.input}
                  placeholder={placeholder}
                  value={formData[key]}
                  onChangeText={(text) => setFormData({ ...formData, [key]: text })}
                />
              </View>
            </View>
          ))}

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Difficulty Level *</Text>
            <View style={styles.levelContainer}>
              {levels.map(level => (
                <Pressable
                  key={level}
                  style={[
                    styles.levelButton,
                    formData.level === level && styles.activeLevelButton(level)
                  ]}
                  onPress={() => setFormData({ ...formData, level })}
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
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Enter training description"
              multiline
              numberOfLines={4}
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
            />
          </View>

          <Pressable 
            style={[styles.submitButton, isSubmitting && styles.submittingButton]} 
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Adding...' : 'Add Schedule'}
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
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
    backgroundColor: colors.blueDark(),
  },
  title: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.white(),
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  imageUpload: {
    height: 30,
    backgroundColor: colors.blueLight(0.1),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
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
    marginTop: 8,
    fontSize: 14,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
    color: colors.blueDark(),
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.blueLight(0.1),
    borderRadius: 8,
    paddingHorizontal: 14,
  },
  iconContainer: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 14,
    color: colors.blueDark(),
    paddingVertical: 12,
    minHeight: 44,
  },
  descriptionInput: {
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 14,
    color: colors.blueDark(),
    backgroundColor: colors.blueLight(0.1),
    borderRadius: 8,
    padding: 14,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  levelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  submitButton: {
    backgroundColor: colors.blueDark(),
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  submittingButton: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontFamily: fontType['Pjs-Bold'],
    color: colors.white(),
    fontSize: 16,
  },
});

export default AddBookmarkForm;