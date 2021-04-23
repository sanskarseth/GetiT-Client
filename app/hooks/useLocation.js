import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default useLocation = () => {
	const [location, setLocation] = useState();

	const getLocation = async () => {
		try {
			const { granted } = await Location.requestPermissionsAsync();
			if (!granted) return;
			const {
				coords: { latitude, longitude },
			} = await Location.getLastKnownPositionAsync();
			setLocation({ latitude, longitude });
		} catch (error) {
			alert('Please turn on location!');
			console.log('LOCCC', error);
		}
	};

	useEffect(() => {
		getLocation();
	}, []);

	return location;
};
