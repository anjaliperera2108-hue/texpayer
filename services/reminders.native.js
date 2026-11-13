import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { formatDate } from '../data/records';

const channelId = 'vehicle-reminders';
export const reminderDelaySeconds = 5;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * @param {{ registration: string, renewalDate: string }} record
 * @returns {Promise<'scheduled' | 'denied' | 'unsupported'>}
 */
export async function scheduleTestReminder(record) {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(channelId, {
      name: 'Vehicle reminders',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  let permission = await Notifications.getPermissionsAsync();
  if (!permission.granted && permission.canAskAgain) {
    permission = await Notifications.requestPermissionsAsync();
  }

  if (!permission.granted) {
    return 'denied';
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'QuickTax test reminder',
      body: `${record.registration} · Sample renewal date: ${formatDate(record.renewalDate)}.`,
      sound: 'default',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: reminderDelaySeconds,
      repeats: false,
      ...(Platform.OS === 'android' ? { channelId } : {}),
    },
  });

  return 'scheduled';
}
