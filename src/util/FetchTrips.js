
const FetchData = {
	getData: (url) => {
		if (url) {
			const headers = {'content-type': 'application/json'};
			return fetch(url,{headers:headers})
			.then(response => {
				if (response.ok) {
					return response.json();
				}
					throw new Error('Request failed!');
			}, networkError => console.log(networkError.message))
		}
	}
};

export default FetchData;
