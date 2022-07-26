	const filterFree = (data) => {
		let result = data.isFree;
		return result;
	};
	const filter1 = (data) => {
		let result = data.eventType.id === 1;
		return result;
	};
	const filter2 = (data) => {
		let result = data.eventType.id === 2;
		return result;
	};
	const filter3 = (data) => {
		let result = data.eventType.id === 3;
		return result;
	};
	const filter4 = (data) => {
		let result = data.eventType.id === 4;
		return result;
	};
	const filter5 = (data) => {
		let result = data.eventType.id === 5;
		return result;
	};
	const filter6 = (data) => {
		let result = data.eventType.id === 6;
		return result;
	};
	const filter7 = (data) => {
		let result = data.eventType.id === 7;
		return result;
	};

	export {filterFree, filter1, filter2, filter3, filter4, filter5, filter6, filter7}