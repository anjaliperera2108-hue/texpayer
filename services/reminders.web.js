export const reminderDelaySeconds = 5;

/**
 * @param {{ registration: string, renewalDate: string }} _record
 * @returns {Promise<'scheduled' | 'denied' | 'unsupported'>}
 */
export async function scheduleTestReminder(_record) {
  return 'unsupported';
}
