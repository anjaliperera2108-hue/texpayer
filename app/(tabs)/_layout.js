import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { color, font } from '../../components/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: color.canvas },
        tabBarActiveTintColor: color.green,
        tabBarInactiveTintColor: color.secondary,
        tabBarStyle: { backgroundColor: color.white, borderTopColor: color.line },
        tabBarLabelStyle: { fontFamily: font.semibold, fontSize: 11, lineHeight: 15 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Vehicles',
          tabBarAccessibilityLabel: 'Vehicles',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'car' : 'car-outline'} color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarAccessibilityLabel: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'heart' : 'heart-outline'} color={color} size={22} />
          ),
        }}
      />
    </Tabs>
  );
}
