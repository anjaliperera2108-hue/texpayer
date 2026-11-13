import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { formatDate, statuses } from '../data/records';
import { useQuickTax } from '../state/QuickTaxContext';
import { color, font, shared } from './theme';

const statusColors = {
  due: { backgroundColor: color.amberWash, color: color.amber },
  valid: { backgroundColor: color.mint, color: color.green },
  expired: { backgroundColor: color.redWash, color: color.red },
};

/** @param {{ status: string }} props */
export function StatusPill({ status }) {
  const palette = statusColors[status];
  const label = statuses.find((option) => option.id === status)?.label;
  return (
    <View style={[shared.row, styles.pill, { backgroundColor: palette.backgroundColor }]}>
      <View style={[styles.dot, { backgroundColor: palette.color }]} />
      <Text style={[styles.statusText, { color: palette.color }]}>{label}</Text>
    </View>
  );
}

/** @param {{ record: (typeof import('../data/records').records)[number] }} props */
export default function RecordCard({ record }) {
  const { favoriteIds, toggleFavorite } = useQuickTax();
  const isFavorite = favoriteIds.has(record.id);

  return (
    <View style={styles.card}>
      <View style={shared.row}>
        <Link href={{ pathname: '/list/[id]', params: { id: record.id } }} asChild>
          <Pressable
            accessibilityRole="link"
            accessibilityLabel={`Open ${record.makeModel} record`}
            style={styles.open}
          >
            <View style={styles.icon}>
              <Ionicons name={record.icon} size={22} color={color.green} />
            </View>
            <View style={styles.names}>
              <Text style={styles.title}>{record.makeModel}</Text>
              <Text style={shared.caption}>{record.registration} · {record.category}</Text>
            </View>
          </Pressable>
        </Link>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${isFavorite ? 'Remove' : 'Save'} ${record.makeModel} ${isFavorite ? 'from' : 'to'} favorites`}
          accessibilityState={{ selected: isFavorite }}
          style={({ pressed }) => [styles.favorite, pressed && shared.pressed]}
          onPress={() => toggleFavorite(record.id)}
        >
          <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={22} color={color.green} />
        </Pressable>
      </View>
      <View style={[shared.row, styles.footer]}>
        <StatusPill status={record.status} />
        <View style={[shared.row, styles.date]}>
          <Ionicons name="calendar-outline" size={14} color={color.secondary} />
          <Text style={shared.caption}>{formatDate(record.renewalDate)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15, borderWidth: 1, borderColor: color.line, backgroundColor: color.white,
    paddingHorizontal: 12, paddingTop: 8, paddingBottom: 9,
  },
  open: { flex: 1, flexDirection: 'row', alignItems: 'center', minHeight: 47, gap: 10 },
  icon: {
    width: 38, height: 38, borderRadius: 11, backgroundColor: color.mint,
    alignItems: 'center', justifyContent: 'center',
  },
  names: { flex: 1 },
  title: { color: color.ink, fontFamily: font.semibold, fontSize: 15, lineHeight: 22 },
  favorite: { width: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  footer: {
    justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, paddingTop: 7, marginTop: 4,
    borderTopWidth: 1, borderTopColor: color.line,
  },
  pill: { alignSelf: 'flex-start', gap: 5, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 11 },
  dot: { width: 5, height: 5, borderRadius: 3 },
  statusText: { fontFamily: font.semibold, fontSize: 10, lineHeight: 15 },
  date: { gap: 5 },
});
