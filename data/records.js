// Fictional vehicle records with realistic Sri Lankan plates, dates and LKR amounts.
/** @typedef {keyof typeof import('@expo/vector-icons/Ionicons').default.glyphMap} IconName */
/** @type {{ id: string, label: string, icon: IconName }[]} */
export const statuses = [
  { id: 'all', label: 'All statuses', icon: 'list-outline' },
  { id: 'due', label: 'Due soon', icon: 'time-outline' },
  { id: 'valid', label: 'Valid', icon: 'checkmark-circle-outline' },
  { id: 'expired', label: 'Expired', icon: 'alert-circle-outline' },
];

/**
 * @typedef {Object} VehicleRecord
 * @property {string} id
 * @property {string} registration
 * @property {string} makeModel
 * @property {string} category
 * @property {IconName} icon
 * @property {string} fuel
 * @property {string} centre
 * @property {string} testedOn
 * @property {string} renewalDate
 * @property {string} result
 * @property {'due' | 'valid' | 'expired'} status
 * @property {number} baseFee
 * @property {number} lateFee
 */
/** @type {VehicleRecord[]} */
export const records = [
  {
    id: 'QT-24081', registration: 'WP CAA-4821', makeModel: 'Toyota Axio',
    category: 'Motor car', icon: 'car-sport-outline', fuel: 'Petrol hybrid',
    centre: 'Colombo 05', testedOn: '2025-11-24', renewalDate: '2026-11-24',
    result: 'Passed', status: 'due', baseFee: 1850, lateFee: 0,
  },
  {
    id: 'QT-24103', registration: 'SP CAB-7316', makeModel: 'Suzuki Wagon R',
    category: 'Motor car', icon: 'car-outline', fuel: 'Petrol',
    centre: 'Matara', testedOn: '2026-02-08', renewalDate: '2027-02-08',
    result: 'Passed', status: 'valid', baseFee: 1750, lateFee: 0,
  },
  {
    id: 'QT-24042', registration: 'WP BGC-2059', makeModel: 'Honda Dio',
    category: 'Motorcycle', icon: 'bicycle-outline', fuel: 'Petrol',
    centre: 'Nugegoda', testedOn: '2025-11-05', renewalDate: '2026-11-05',
    result: 'Passed', status: 'expired', baseFee: 950, lateFee: 350,
  },
  {
    id: 'QT-24089', registration: 'CP DAB-6642', makeModel: 'Bajaj RE',
    category: 'Three-wheeler', icon: 'car-outline', fuel: 'Petrol',
    centre: 'Kandy', testedOn: '2025-11-28', renewalDate: '2026-11-28',
    result: 'Passed', status: 'due', baseFee: 1150, lateFee: 0,
  },
  {
    id: 'QT-24217', registration: 'WP PH-9074', makeModel: 'Nissan Caravan',
    category: 'Light van', icon: 'bus-outline', fuel: 'Diesel',
    centre: 'Maharagama', testedOn: '2026-04-17', renewalDate: '2027-04-17',
    result: 'Passed', status: 'valid', baseFee: 2400, lateFee: 0,
  },
  {
    id: 'QT-24035', registration: 'NP CAT-3286', makeModel: 'Toyota Vitz',
    category: 'Motor car', icon: 'car-outline', fuel: 'Petrol',
    centre: 'Jaffna', testedOn: '2025-10-30', renewalDate: '2026-10-30',
    result: 'Passed', status: 'expired', baseFee: 1750, lateFee: 650,
  },
];

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
});
const amountFormatter = new Intl.NumberFormat('en-LK');

/** @param {string} value */
export function formatDate(value) {
  return dateFormatter.format(new Date(value));
}

/** @param {number} amount */
export function formatAmount(amount) {
  return `LKR ${amountFormatter.format(amount)}`;
}
