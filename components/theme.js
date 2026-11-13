import { StyleSheet } from 'react-native';

export const color = {
  canvas: '#F3F7F2',
  white: '#FFFFFF',
  ink: '#182921',
  secondary: '#4B6054',
  green: '#18593A',
  deep: '#113A2A',
  mint: '#E4F2E5',
  accent: '#2FAB58',
  line: '#DDE8DD',
  heroText: '#D7EBD9',
  amber: '#794708',
  amberWash: '#FFF1D7',
  red: '#972E36',
  redWash: '#FCEBED',
};

export const font = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
};

export const shared = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.canvas },
  frame: { width: '100%', maxWidth: 540, alignSelf: 'center', paddingHorizontal: 18 },
  heading: { color: color.ink, fontFamily: font.bold, fontSize: 21, lineHeight: 29 },
  body: { color: color.secondary, fontFamily: font.regular, fontSize: 13, lineHeight: 20 },
  caption: { color: color.secondary, fontFamily: font.medium, fontSize: 11, lineHeight: 17 },
  pressed: { opacity: 0.7 },
  row: { flexDirection: 'row', alignItems: 'center' },
});
