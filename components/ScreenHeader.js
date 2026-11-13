import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { color, font, shared } from './theme';

export default function ScreenHeader() {
  return (
    <View style={styles.header}>
      <View style={[shared.frame, shared.row, styles.content]}>
        <View style={styles.mark}>
          <Ionicons name="leaf" size={19} color={color.white} />
        </View>
        <Text style={styles.wordmark}>QuickTax</Text>
        <Text style={styles.sample}>Sample records</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: color.white, borderBottomWidth: 1, borderBottomColor: color.line },
  content: { minHeight: 56, gap: 9 },
  mark: {
    width: 32, height: 32, borderRadius: 10, backgroundColor: color.green,
    alignItems: 'center', justifyContent: 'center',
  },
  wordmark: { color: color.deep, fontFamily: font.bold, fontSize: 20, lineHeight: 29 },
  sample: {
    marginLeft: 'auto', color: color.green, fontFamily: font.medium, fontSize: 11,
    backgroundColor: color.mint, paddingVertical: 5, paddingHorizontal: 9, borderRadius: 12,
  },
});
