import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import messagessApi from '../api/messages';
import userApi from '../api/user';

import Screen from '../components/Screen';
import {
	ListItem,
	ListItemDeleteAction,
	ListItemSeparator,
} from '../components/lists';

function MessagesScreen(props) {
	var messages = useApi(messagessApi.get);
	const users = useApi(userApi.getUser);
	const dmessage = useApi(messagessApi.deletem);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		messages.request();
		users.request();
	}, []);

	const getUser = (id) => {
		const user = users.data.find((x) => x._id === id);
		// console.log(user);

		if (user == undefined) return 'Consumer';
		return user.name;
	};

	const handleDelete = (message) => {
		messages.data = messages.data.filter((m) => m._id !== message._id);
		dmessage.request(message._id);
		messages.request();
	};

	return (
		<Screen>
			<FlatList
				data={messages.data}
				keyExtractor={(message) => message._id.toString()}
				renderItem={({ item }) => (
					<ListItem
						title={getUser(item.fromUserId)}
						subTitle={item.content}
						image={require('../assets/user.jpg')}
						onPress={() => console.log('Message selected', item)}
						// renderRightActions={() => (
						// 	<ListItemDeleteAction onPress={() => handleDelete(item)} />
						// )}
					/>
				)}
				ItemSeparatorComponent={ListItemSeparator}
				refreshing={refreshing}
				onRefresh={() => {
					messages.request();
				}}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({});

export default MessagesScreen;
