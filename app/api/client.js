import { create } from 'apisauce';
import cache from '../utility/cache';
import authStorage from '../auth/storage';
import settings from '../config/settings';

const apiClient = create({
	baseURL: settings.apiUrl,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

apiClient.addAsyncRequestTransform(async (request) => {
	try {
		const authToken = await authStorage.getToken();
		if (!authToken) return;
		request.headers['x-auth-token'] = authToken;
	} catch (ex) {
		console.log(ex);
	}
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
	try {
		const response = await get(url, params, axiosConfig);
		if (response.ok) {
			cache.store(url, response.data);
			return response;
		}

		const data = await cache.get(url);
		return data ? { ok: true, data } : response;
	} catch (ex) {
		console.log(ex);
	}
};

export default apiClient;
