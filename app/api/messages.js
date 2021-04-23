import client from './client';
const endpoint = '/messages';

const get = () => client.get(endpoint);

const send = (message, listingId) =>
	client.post(endpoint, {
		message,
		listingId,
	});

const deletem = (id) => {
	// console.log('heyy');
	client.delete(`${endpoint}/${id}`);
};

export default {
	send,
	get,
	deletem,
};
