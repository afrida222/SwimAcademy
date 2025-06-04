import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Bookmark, Discover, Profile } from './src/screens';
import BookmarkDetail from './src/screens/BookmarkDetail';
import AddBookmarkForm from './src/screens/AddBookmarkForm';
import EditBookmarkForm from './src/screens/EditBookmarkForm';
import { Home as HomeIcon, Archive, SearchNormal, User } from 'iconsax-react-native';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/config/toastConfig';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Komponen untuk Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4682B4',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon size={size} color={color} variant="Bold" />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          tabBarLabel: 'Bookmark',
          tabBarIcon: ({ color, size }) => (
            <Archive size={size} color={color} variant="Bold" />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color, size }) => (
            <SearchNormal size={size} color={color} variant="Bold" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} variant="Bold" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Komponen Utama App
export default function App() {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AddBookmarkForm" 
          component={AddBookmarkForm} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="EditBookmarkForm" 
          component={EditBookmarkForm} 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Bookmark" component={Bookmark} />
        <Stack.Screen name="BookmarkDetail" component={BookmarkDetail} />
        {/* Tambahkan screen lain jika dibutuhkan di sini */}
      </Stack.Navigator>
    </NavigationContainer>
    <Toast config={toastConfig} />
    </>
  );
}