import api from 'utils/api';

export const editTTLockAccount = async (TTLockUserName, Password, HomeStayID) => {
	try {
		const formData = new FormData();
		formData.append('TTLockUserName', TTLockUserName);
		formData.append('Password', Password);
		formData.append('HomeStayID', HomeStayID);

		const response = await api.put('/ttlock/edit-ttlock-account', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	} catch (error) {
		throw new Error('Failed to edit TTLock account');
	}
};
