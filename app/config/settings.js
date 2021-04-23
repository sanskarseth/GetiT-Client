import Constants from 'expo-constants';

const settings = {
	dev: {
		apiUrl: 'http://getitt.herokuapp.com/api',
	},
	staging: {
		apiUrl: 'http://getitt.herokuapp.com/api',
	},
	prod: {
		apiUrl: 'http://getitt.herokuapp.com/api',
	},
};

const getCurrentSettings = () => {
	if (__DEV__) return settings.dev;
	if (Constants.manifest.releaseChannel === 'staging') return settings.staging;
	return settings.prod;
};

export default getCurrentSettings();
