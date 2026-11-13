import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { color, font, shared } from '../../components/theme';

function BackButton() {
  const router = useRouter();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Back to previous screen"
      onPress={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace('/');
        }
      }}
      hitSlop={8}
      style={({ pressed }) => [
        { width: 44, minHeight: 44, justifyContent: 'center', alignItems: 'center' },
        pressed && shared.pressed,
      ]}
    >
      <Ionicons name="chevron-back" size={24} color={color.green} />
    </Pressable>
  );
}

export default function ListStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: color.white },
        headerTintColor: color.ink,
        headerTitleAlign: 'center',
        headerTitleStyle: { fontFamily: font.semibold, fontSize: 16 },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: color.canvas },
      }}
    >
      <Stack.Screen name="[id]" options={{ title: 'Record details', headerLeft: () => <BackButton /> }} />
    </Stack>
  );
}
