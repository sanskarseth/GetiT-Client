import React, { useEffect } from 'react';
import {
	View,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import colors from '../config/colors';
import ContactSellerForm from '../components/ContactSellerForm';
import ListItem from '../components/lists/ListItem';
import Text from '../components/Text';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import userApi from '../api/user';

function ListingDetailsScreen({ route }) {
	const listing = route.params;
	const users = useApi(userApi.getUser);

	useEffect(() => {
		users.request();
	}, []);

	const getUser = (id) => {
		// console.log(id);
		const user = users.data.find((x) => x._id === id);
		// console.log(user);

		if (user == undefined) return 'Seller';
		return user.name;
	};

	return (
		<KeyboardAvoidingView
			behavior="position"
			keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
		>
			<Image
				style={styles.image}
				preview={{ uri: listing.images[0].thumbnailUrl }}
				tint="light"
				uri={listing.images[0].url}
			/>
			<View style={styles.detailsContainer}>
				<Text style={styles.title}>{listing.title}</Text>
				<Text style={styles.price}>₹{listing.price}</Text>
				<View style={styles.userContainer}>
					<ListItem
						image={require('../assets/user.jpg')}
						title={getUser(listing.userId)}
						// subTitle="5 Listings"
					/>
				</View>
				<ContactSellerForm listing={listing} />
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	detailsContainer: {
		padding: 20,
	},
	image: {
		width: '100%',
		height: 300,
	},
	price: {
		color: colors.secondary,
		fontWeight: 'bold',
		fontSize: 20,
		marginVertical: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: '500',
	},
	userContainer: {
		marginVertical: 40,
	},
});

export default ListingDetailsScreen;
