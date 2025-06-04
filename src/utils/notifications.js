import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

export const showSuccessNotification = (message, subtitle = '') => {
  Toast.show({
    type: 'success',
    text1: message,
    text2: subtitle,
    visibilityTime: 3000,
    autoHide: true,
    position: 'top',
  });
};

export const showErrorNotification = (message, subtitle = '') => {
  Toast.show({
    type: 'error',
    text1: message,
    text2: subtitle,
    visibilityTime: 4000,
    autoHide: true,
    position: 'top',
  });
};

export const showConfirmationDialog = (title, message, onConfirm) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: onConfirm,
        style: 'destructive',
      },
    ],
    { cancelable: true }
  );
};