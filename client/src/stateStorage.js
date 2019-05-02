// handling persistent redux state
export const loadState = () => {
	try {
		const serialized = localStorage.getItem('state');

		if (serialized === null){
			return undefined;
		}
		return JSON.parse(serialized);
	} catch (err) {
		return undefined;
	}
};

export const saveState = (state) => {
	try {
		const serialized = JSON.stringify(state);
		localStorage.setItem('state', serialized);
	} catch (err) {
		console.log('saveState failed.');
	}
};