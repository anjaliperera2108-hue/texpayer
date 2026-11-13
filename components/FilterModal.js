import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { statuses } from '../data/records';
import { color, font, shared } from './theme';

/** @param {{ initialStatus: string, onApply: (status: string) => void, onClose: () => void }} props */
export default function FilterModal({ initialStatus, onApply, onClose }) {
  const [selected, setSelected] = useState(initialStatus);

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable accessible={false} style={StyleSheet.absoluteFill} onPress={onClose} />
        <SafeAreaView edges={['bottom']} style={styles.sheet}>
          <ScrollView bounces={false} contentContainerStyle={styles.content}>
            <View style={styles.handle} />
            <View style={[shared.row, styles.titleRow]}>
              <Text style={shared.heading} accessibilityRole="header">Filter records</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close filters"
                onPress={onClose}
                style={({ pressed }) => [styles.close, pressed && shared.pressed]}
              >
                <Ionicons name="close" size={22} color={color.ink} />
              </Pressable>
            </View>
            <Text style={[shared.body, styles.description]}>Choose a renewal status.</Text>
            <View accessibilityRole="radiogroup" accessibilityLabel="Renewal status" style={styles.options}>
              {statuses.map((option) => {
                const checked = selected === option.id;
                return (
                  <Pressable
                    key={option.id}
                    accessibilityRole="radio"
                    accessibilityLabel={option.label}
                    aria-checked={checked}
                    onPress={() => setSelected(option.id)}
                    style={({ pressed }) => [
                      shared.row, styles.option, checked && styles.selected, pressed && shared.pressed,
                    ]}
                  >
                    <Ionicons name={option.icon} size={19} color={color.green} />
                    <Text style={styles.label}>{option.label}</Text>
                    <Ionicons
                      name={checked ? 'radio-button-on' : 'radio-button-off'}
                      size={19}
                      color={checked ? color.green : color.secondary}
                    />
                  </Pressable>
                );
              })}
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => onApply(selected)}
              style={({ pressed }) => [styles.apply, pressed && shared.pressed]}
            >
              <Text style={styles.applyText}>Apply filter</Text>
            </Pressable>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#11261CB3' },
  sheet: {
    width: '100%', maxWidth: 540, maxHeight: '87%',
    backgroundColor: color.white, borderTopLeftRadius: 24, borderTopRightRadius: 24,
  },
  content: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 17 },
  handle: { alignSelf: 'center', width: 35, height: 4, borderRadius: 2, backgroundColor: color.line },
  titleRow: { justifyContent: 'space-between', marginTop: 4 },
  close: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  description: { marginTop: -1, marginBottom: 11 },
  options: { gap: 6 },
  option: {
    minHeight: 45, paddingHorizontal: 12, borderWidth: 1, borderColor: color.line,
    borderRadius: 11, gap: 9,
  },
  selected: { backgroundColor: color.mint, borderColor: color.green },
  label: { flex: 1, fontFamily: font.medium, fontSize: 13, color: color.ink },
  apply: {
    minHeight: 46, justifyContent: 'center', alignItems: 'center', marginTop: 13,
    borderRadius: 11, backgroundColor: color.green,
  },
  applyText: { color: color.white, fontFamily: font.semibold, fontSize: 14 },
});
