import { View, Text, StyleSheet } from 'react-native';
import { colors, fontType } from '../theme';

export const toastConfig = {
  success: ({ text1, text2 }) => (
    <View style={styles.successToast}>
      <Text style={styles.successText1}>{text1}</Text>
      {text2 && <Text style={styles.successText2}>{text2}</Text>}
    </View>
  ),
  error: ({ text1, text2 }) => (
    <View style={styles.errorToast}>
      <Text style={styles.errorText1}>{text1}</Text>
      {text2 && <Text style={styles.errorText2}>{text2}</Text>}
    </View>
  ),
};

const styles = StyleSheet.create({
  successToast: {
    width: '90%',
    backgroundColor: colors.green,
    padding: 15,
    borderRadius: 8,
    borderLeftColor: colors.greenDark,
    borderLeftWidth: 6,
  },
  successText1: {
    color: colors.white,
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 14,
  },
  successText2: {
    color: colors.white + 'CC',
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 12,
    marginTop: 4,
  },
  errorToast: {
    width: '90%',
    backgroundColor: colors.red,
    padding: 15,
    borderRadius: 8,
    borderLeftColor: colors.redDark,
    borderLeftWidth: 6,
  },
  errorText1: {
    color: colors.white,
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 14,
  },
  errorText2: {
    color: colors.white + 'CC',
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 12,
    marginTop: 4,
  },
});