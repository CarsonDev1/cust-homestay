export const createPost = async (userId, postData) => {
	const url = 'https://sondc1234-001-site1.anytempurl.com/api/Post/create';

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json',
				'X-User-Id': userId,
			},
			body: JSON.stringify(postData),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error creating post:', error);
		return null;
	}
};
