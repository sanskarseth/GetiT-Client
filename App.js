import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import { PermissionsAndroid } from 'react-native';

import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';
import OfflineNotice from './app/components/OfflineNotice';
import AuthNavigator from './app/navigation/AuthNavigator';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';
import { navigationRef } from './app/navigation/rootNavigation';

export default function App() {
	const [user, setUser] = useState();
	const [isReady, setIsReady] = useState(false);

	const askStorage = async () => {
		try {
			const granted = await PermissionsAndroid.requestMultiple([
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
			]);
		} catch (err) {
			console.warn(err);
		}
		const readGranted = await PermissionsAndroid.check(
			PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
		);
		const writeGranted = await PermissionsAndroid.check(
			PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
		);
		if (!readGranted || !writeGranted) {
			console.log('Read and write permissions have not been granted');
			return;
		}
	};

	useEffect(() => {
		askStorage();
	}, []);

	const restoreUser = async () => {
		try {
			const user = await authStorage.getUser();
			if (user) setUser(user);
		} catch (ex) {
			console.log(ex);
		}
	};

	if (!isReady)
		return (
			<AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
		);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			<OfflineNotice />
			<NavigationContainer ref={navigationRef} theme={navigationTheme}>
				{user ? <AppNavigator /> : <AuthNavigator />}
			</NavigationContainer>
		</AuthContext.Provider>
	);
}
