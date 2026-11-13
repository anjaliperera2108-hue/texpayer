import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Hero from '../../components/Hero';
import RecordCard from '../../components/RecordCard';
import ScreenHeader from '../../components/ScreenHeader';
import { color, font, shared } from '../../components/theme';
import { records } from '../../data/records';
import { useQuickTax } from '../../state/QuickTaxContext';

function RecordSeparator() {
  return <View style={styles.separator} />;
}

export default function FavoritesScreen() {
  const { favoriteIds } = useQuickTax();
  const savedRecords = records.filter((record) => favoriteIds.has(record.id));

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={shared.screen}>
      <ScreenHeader />
      <FlatList
        data={savedRecords}
        keyExtractor={(record) => record.id}
        renderItem={({ item }) => <RecordCard record={item} />}
        ItemSeparatorComponent={RecordSeparator}
        contentContainerStyle={[shared.frame, styles.list]}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Hero title="Favorites" description="Find the vehicles you saved for quick access." favorites />
            <View>
              <Text style={shared.heading} accessibilityRole="header">Saved vehicles</Text>
              <Text style={shared.caption} accessibilityLiveRegion="polite">
                {savedRecords.length} {savedRecords.length === 1 ? 'vehicle' : 'vehicles'} saved
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Ionicons name="heart-outline" size={24} color={color.green} />
            </View>
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={[shared.body, styles.emptyBody]}>
              Tap the heart beside a vehicle to save it here.
            </Text>
            <Link href="/" asChild>
              <Pressable
                accessibilityRole="link"
                style={styles.browse}
              >
                <Text style={styles.browseText}>Browse vehicles</Text>
              </Pressable>
            </Link>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: { paddingTop: 14, paddingBottom: 18 },
  listHeader: { gap: 13, paddingBottom: 10 },
  separator: { height: 8 },
  empty: {
    alignItems: 'center', gap: 7, padding: 18, borderRadius: 15,
    borderWidth: 1, borderColor: color.line, backgroundColor: color.white,
  },
  emptyIcon: {
    width: 43, height: 43, borderRadius: 12, backgroundColor: color.mint,
    alignItems: 'center', justifyContent: 'center',
  },
  emptyTitle: { color: color.ink, fontFamily: font.semibold, fontSize: 15 },
  emptyBody: { textAlign: 'center' },
  browse: { minHeight: 44, paddingHorizontal: 12, justifyContent: 'center' },
  browseText: { color: color.green, fontFamily: font.semibold, fontSize: 13 },
});
