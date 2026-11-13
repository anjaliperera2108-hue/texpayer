import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, Text, View } from 'react-native';
import { color, font } from './theme';
import vehicleIllustration from '../assets/quicktax-vehicles.png';

/** @param {{ title: string, description: string, favorites?: boolean }} props */
export default function Hero({ title, description, favorites = false }) {
  return (
    <View style={styles.hero}>
      <View style={styles.halo} />
      {favorites ? (
        <View style={styles.heart} accessible={false}>
          <Ionicons name="heart" size={47} color="#B9E2B7" />
        </View>
      ) : (
        <Image
          source={vehicleIllustration}
          resizeMode="contain"
          style={styles.art}
          accessible={false}
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title} accessibilityRole="header">{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 151, justifyContent: 'center', position: 'relative',
    backgroundColor: color.deep, borderRadius: 22, overflow: 'hidden',
  },
  halo: {
    position: 'absolute', right: -44, bottom: -80, width: 250, height: 250,
    borderRadius: 125, backgroundColor: '#1A4934',
  },
  art: { position: 'absolute', right: 6, bottom: 11, width: '42%', height: 122 },
  heart: { position: 'absolute', right: '13%', top: 48 },
  content: { paddingVertical: 18, paddingLeft: 18, width: '57%' },
  title: { color: color.white, fontFamily: font.bold, fontSize: 28, lineHeight: 34 },
  description: {
    color: color.heroText, fontFamily: font.regular, fontSize: 12, lineHeight: 18, marginTop: 6,
  },
});
