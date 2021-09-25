import React from 'react';
import {View} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native';
import DashboardComponent from './pages/dashboard/dashboard';

export default function RouterPage() {
  return (
    <NativeRouter>
      <Route path={'/'} component={DashboardComponent} />
    </NativeRouter>
  );
}
