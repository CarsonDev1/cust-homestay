import axios from 'axios';

const api = axios.create({
	baseURL: 'https://sondc1234-001-site1.anytempurl.com/api',
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor: Attach access token if available
api.interceptors.request.use((config) => {
	const token = sessionStorage.getItem('accessToken');
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	return config;
});

// Response interceptor: Handle 401 errors and refresh token
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		console.log('Error in interceptor:', error.response?.status); // Debugging line
		const originalRequest = error.config;

		if (error.response?.status === 500 && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = localStorage.getItem('refreshToken');

			if (refreshToken) {
				try {
					// Call the refresh token endpoint with PUT method
					const response = await axios.put(
						'https://sondc1234-001-site1.anytempurl.com/api/Auth/access-token',
						{ refreshToken },
						{
							headers: {
								'Content-Type': 'application/json',
							},
						}
					);

					const { accessToken } = response.data;
					localStorage.setItem('accessToken', accessToken);
					originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

					// Retry the original request with the new access token
					return api(originalRequest);
				} catch (refreshError) {
					console.error('Failed to refresh token:', refreshError);
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
					window.location.href = '/login'; // Redirect to login on failure
				}
			}
		}

		return Promise.reject(error);
	}
);

export default api;
