import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilterModal from '../../components/FilterModal';
import Hero from '../../components/Hero';
import RecordCard from '../../components/RecordCard';
import ScreenHeader from '../../components/ScreenHeader';
import { color, font, shared } from '../../components/theme';
import { records, statuses } from '../../data/records';
import { useQuickTax } from '../../state/QuickTaxContext';

function RecordSeparator() {
  return <View style={styles.separator} />;
}

export default function VehiclesScreen() {
  const [status, setStatus] = useState('all');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { foregroundReturns } = useQuickTax();
  const displayedRecords = status === 'all' ? records : records.filter((record) => record.status === status);
  const statusLabel = statuses.find((option) => option.id === status)?.label;

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={shared.screen}>
      <ScreenHeader />
      <FlatList
        data={displayedRecords}
        keyExtractor={(record) => record.id}
        renderItem={({ item }) => <RecordCard record={item} />}
        ItemSeparatorComponent={RecordSeparator}
        contentContainerStyle={[shared.frame, styles.list]}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Hero title="Vehicle records" description="Track emissions tests and renewal dates." />
            <View style={[shared.row, styles.activity]} accessibilityLiveRegion="polite">
              <View style={styles.activityIcon}>
                <Ionicons name="pulse-outline" size={19} color={color.green} />
              </View>
              <Text style={styles.activityTitle}>Foreground returns</Text>
              <Text style={styles.counter}>{foregroundReturns}</Text>
            </View>
            <View style={[shared.row, styles.section]}>
              <View style={styles.sectionCopy}>
                <Text style={shared.heading} accessibilityRole="header">Emissions records</Text>
                <Text style={shared.caption} accessibilityLiveRegion="polite">
                  {displayedRecords.length} {displayedRecords.length === 1 ? 'vehicle' : 'vehicles'} · {statusLabel}
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Filter records"
                onPress={() => setFiltersOpen(true)}
                style={({ pressed }) => [shared.row, styles.filter, pressed && shared.pressed]}
              >
                <Ionicons name="options-outline" size={18} color={color.green} />
                <Text style={styles.filterText}>Filter</Text>
              </Pressable>
            </View>
          </View>
        }
      />
      {filtersOpen && (
        <FilterModal
          initialStatus={status}
          onClose={() => setFiltersOpen(false)}
          onApply={(selection) => {
            setStatus(selection);
            setFiltersOpen(false);
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: { paddingTop: 14, paddingBottom: 18 },
  listHeader: { gap: 11, paddingBottom: 10 },
  activity: {
    gap: 8, paddingVertical: 7, paddingHorizontal: 9,
    backgroundColor: color.white, borderWidth: 1, borderColor: color.line, borderRadius: 13,
  },
  activityIcon: {
    width: 31, height: 31, backgroundColor: color.mint, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
  },
  activityTitle: { flex: 1, color: color.ink, fontFamily: font.medium, fontSize: 12 },
  counter: {
    minWidth: 28, textAlign: 'center', color: color.green, backgroundColor: color.mint,
    borderRadius: 8, paddingHorizontal: 5, paddingVertical: 3, fontFamily: font.semibold, fontSize: 13,
  },
  section: { justifyContent: 'space-between', gap: 5 },
  sectionCopy: { flex: 1 },
  filter: {
    minHeight: 44, gap: 5, borderRadius: 11, borderWidth: 1, borderColor: color.line,
    backgroundColor: color.white, paddingHorizontal: 10,
  },
  filterText: { color: color.green, fontFamily: font.semibold, fontSize: 12 },
  separator: { height: 8 },
});
