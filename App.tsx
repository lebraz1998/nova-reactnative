import React from 'react';
import {View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import RouterPage from './src/router';
import {Button, Header, ThemeProvider} from 'react-native-elements';

export default function App() {
  return (
    <SafeAreaView>
      <ThemeProvider>
        <RouterPage />
      </ThemeProvider>
    </SafeAreaView>
  );
}
