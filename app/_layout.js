import { Poppins_400Regular } from '@expo-google-fonts/poppins/400Regular';
import { Poppins_500Medium } from '@expo-google-fonts/poppins/500Medium';
import { Poppins_600SemiBold } from '@expo-google-fonts/poppins/600SemiBold';
import { Poppins_700Bold } from '@expo-google-fonts/poppins/700Bold';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { color } from '../components/theme';
import { QuickTaxProvider } from '../state/QuickTaxContext';

export const unstable_settings = { initialRouteName: '(tabs)' };

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold,
    ...Ionicons.font,
  });

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: color.canvas }}>
        <Text style={{ color: color.ink }}>Loading QuickTax…</Text>
      </View>
    );
  }

  return (
    <QuickTaxProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: color.canvas } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="list" />
      </Stack>
    </QuickTaxProvider>
  );
}
