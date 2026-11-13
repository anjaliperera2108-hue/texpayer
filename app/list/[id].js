import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusPill } from '../../components/RecordCard';
import { color, font, shared } from '../../components/theme';
import { formatAmount, formatDate, records } from '../../data/records';
import { reminderDelaySeconds, scheduleTestReminder } from '../../services/reminders';
import { useQuickTax } from '../../state/QuickTaxContext';

const reminderMessages = {
  scheduled: `Test reminder scheduled for about ${reminderDelaySeconds} seconds from now.`,
  denied: 'Notifications are disabled. Allow notifications in device settings, then try again.',
  unsupported: 'Local reminders are available in the Android and iOS app.',
  failed: 'The reminder could not be scheduled. Please try again.',
};

/** @param {{ label: string, value: string, total?: boolean }} props */
function Fact({ label, value, total = false }) {
  return (
    <View style={[shared.row, styles.fact, total && styles.total]}>
      <Text style={[shared.body, styles.factLabel, total && styles.totalText]}>{label}</Text>
      <Text style={[styles.factValue, total && styles.totalText]}>{value}</Text>
    </View>
  );
}

export default function RecordDetailsScreen() {
  const { id } = useLocalSearchParams();
  const record = records.find((item) => item.id === id);
  const { favoriteIds, toggleFavorite } = useQuickTax();
  const [isScheduling, setIsScheduling] = useState(false);
  const [reminderStatus, setReminderStatus] = useState('');

  if (!record) {
    return (
      <SafeAreaView edges={['left', 'right', 'bottom']} style={shared.screen}>
        <View style={[shared.frame, styles.content]}>
          <Text accessibilityRole="header" style={shared.heading}>Record unavailable</Text>
          <Text style={shared.body}>This reference does not match a sample vehicle record.</Text>
          <Link href="/" replace style={styles.notFoundLink}>Browse vehicles</Link>
        </View>
      </SafeAreaView>
    );
  }

  const isFavorite = favoriteIds.has(record.id);

  async function sendReminder() {
    setIsScheduling(true);
    setReminderStatus('');

    try {
      setReminderStatus(await scheduleTestReminder(record));
    } catch {
      setReminderStatus('failed');
    } finally {
      setIsScheduling(false);
    }
  }

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={shared.screen}>
      <ScrollView contentContainerStyle={[shared.frame, styles.content]}>
        <View style={styles.hero}>
          <View style={[shared.row, styles.heroTop]}>
            <View style={styles.heroIcon}>
              <Ionicons name={record.icon} size={26} color={color.white} />
            </View>
            <StatusPill status={record.status} />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
              accessibilityState={{ selected: isFavorite }}
              onPress={() => toggleFavorite(record.id)}
              style={({ pressed }) => [styles.favorite, pressed && shared.pressed]}
            >
              <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={23} color={color.white} />
            </Pressable>
          </View>
          <Text style={styles.vehicle} accessibilityRole="header">{record.makeModel}</Text>
          <Text style={styles.registration}>{record.registration} · {record.category}</Text>
        </View>

        <View style={styles.panel}>
          <View style={[shared.row, styles.panelHeading]}>
            <Ionicons name="document-text-outline" size={19} color={color.green} />
            <Text accessibilityRole="header" style={styles.heading}>Emissions test</Text>
          </View>
          <Fact label="Reference" value={record.id} />
          <Fact label="Fuel type" value={record.fuel} />
          <Fact label="Test centre" value={record.centre} />
          <Fact label="Last tested" value={formatDate(record.testedOn)} />
          <Fact label="Test result" value={record.result} />
          <Fact label="Renewal date" value={formatDate(record.renewalDate)} total />
        </View>

        <View style={styles.panel}>
          <View style={[shared.row, styles.panelHeading]}>
            <Ionicons name="wallet-outline" size={19} color={color.green} />
            <Text accessibilityRole="header" style={styles.heading}>Sample renewal costs</Text>
          </View>
          <Fact label="Base fee" value={formatAmount(record.baseFee)} />
          <Fact label="Late fee" value={formatAmount(record.lateFee)} />
          <Fact label="Estimated total" value={formatAmount(record.baseFee + record.lateFee)} total />
        </View>

        <View style={styles.panel}>
          <View style={[shared.row, styles.panelHeading]}>
            <Ionicons name="notifications-outline" size={19} color={color.green} />
            <Text accessibilityRole="header" style={styles.heading}>Renewal reminder</Text>
          </View>
          <Text style={shared.body}>
            Send a test notification to this device in about {reminderDelaySeconds} seconds.
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isScheduling ? 'Scheduling reminder' : 'Send test reminder'}
            disabled={isScheduling}
            onPress={sendReminder}
            style={({ pressed }) => [
              shared.row, styles.reminder, (pressed || isScheduling) && shared.pressed,
            ]}
          >
            {isScheduling ? (
              <ActivityIndicator size="small" color={color.white} />
            ) : (
              <Ionicons name="notifications-outline" size={17} color={color.white} />
            )}
            <Text style={styles.reminderText}>
              {isScheduling ? 'Scheduling…' : 'Send test reminder'}
            </Text>
          </Pressable>
          {!!reminderStatus && (
            <Text accessibilityLiveRegion="polite" style={[shared.body, styles.feedback]}>
              {reminderMessages[reminderStatus]}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { gap: 11, paddingTop: 14, paddingBottom: 20 },
  hero: { padding: 15, borderRadius: 19, backgroundColor: color.deep },
  heroTop: { gap: 9 },
  heroIcon: {
    alignItems: 'center', justifyContent: 'center', width: 43, height: 43, borderRadius: 12,
    backgroundColor: '#285941',
  },
  favorite: {
    marginLeft: 'auto', width: 44, height: 44, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#285941',
  },
  vehicle: { color: color.white, fontFamily: font.bold, fontSize: 26, lineHeight: 34, marginTop: 8 },
  registration: { color: color.heroText, fontFamily: font.medium, fontSize: 13, lineHeight: 20 },
  panel: {
    backgroundColor: color.white, borderWidth: 1, borderColor: color.line,
    borderRadius: 15, paddingHorizontal: 12, paddingVertical: 10,
  },
  panelHeading: { gap: 7, marginBottom: 4 },
  heading: { color: color.ink, fontFamily: font.semibold, fontSize: 15, lineHeight: 23 },
  fact: {
    justifyContent: 'space-between', gap: 10, paddingVertical: 5,
    borderTopWidth: 1, borderTopColor: color.line,
  },
  factLabel: { flexShrink: 1 },
  factValue: {
    color: color.ink, fontFamily: font.medium, fontSize: 12, lineHeight: 19,
    textAlign: 'right', flexShrink: 1,
  },
  total: { paddingHorizontal: 7, backgroundColor: color.mint, borderRadius: 7 },
  totalText: { color: color.green, fontFamily: font.semibold },
  reminder: {
    minHeight: 44, gap: 6, justifyContent: 'center', marginTop: 8,
    backgroundColor: color.green, borderRadius: 9,
  },
  reminderText: { color: color.white, fontFamily: font.semibold, fontSize: 13 },
  feedback: { marginTop: 8, color: color.green },
  notFoundLink: { color: color.green, fontFamily: font.semibold, fontSize: 14, paddingVertical: 10 },
});
