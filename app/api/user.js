import client from './client';

const endpoint = '/user';

const getUser = () => client.get(endpoint);

export default {
	getUser,
};
