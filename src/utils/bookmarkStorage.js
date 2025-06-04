import AsyncStorage from '@react-native-async-storage/async-storage';
import { showSuccessNotification, showErrorNotification } from './notifications';

const BOOKMARKS_KEY = 'user_bookmarks';

export const getBookmarks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    showErrorNotification('Error', 'Failed to load bookmarks');
    console.error('Failed to fetch bookmarks', e);
    return [];
  }
};

export const saveBookmarks = async (bookmarks) => {
  try {
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  } catch (e) {
    showErrorNotification('Error', 'Failed to save bookmarks');
    console.error('Failed to save bookmarks', e);
  }
};

export const addBookmark = async (bookmark) => {
  try {
    const bookmarks = await getBookmarks();
    const newBookmark = {
      ...bookmark,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    await saveBookmarks([...bookmarks, newBookmark]);
    showSuccessNotification('Success', 'Bookmark added successfully');
    return newBookmark;
  } catch (e) {
    showErrorNotification('Error', 'Failed to add bookmark');
    console.error('Failed to add bookmark', e);
    throw e;
  }
};

export const updateBookmark = async (id, updatedData) => {
  try {
    const bookmarks = await getBookmarks();
    const updatedBookmarks = bookmarks.map(item => 
      item.id === id ? {...item, ...updatedData, updatedAt: new Date().toISOString()} : item
    );
    await saveBookmarks(updatedBookmarks);
    showSuccessNotification('Success', 'Bookmark updated successfully');
    return updatedBookmarks.find(item => item.id === id);
  } catch (e) {
    showErrorNotification('Error', 'Failed to update bookmark');
    console.error('Failed to update bookmark', e);
    throw e;
  }
};

export const deleteBookmark = async (id) => {
  try {
    const bookmarks = await getBookmarks();
    const updatedBookmarks = bookmarks.filter(item => item.id !== id);
    await saveBookmarks(updatedBookmarks);
    showSuccessNotification('Success', 'Bookmark deleted successfully');
  } catch (e) {
    showErrorNotification('Error', 'Failed to delete bookmark');
    console.error('Failed to delete bookmark', e);
    throw e;
  }
};

export const clearAllBookmarks = async () => {
  try {
    await AsyncStorage.removeItem(BOOKMARKS_KEY);
    showSuccessNotification('Success', 'All bookmarks cleared');
  } catch (e) {
    showErrorNotification('Error', 'Failed to clear bookmarks');
    console.error('Failed to clear bookmarks', e);
    throw e;
  }
};