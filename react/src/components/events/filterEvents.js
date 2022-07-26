	const filtFree = (data) => {
		let result = data.isFree;
		return result;
	};
	const filtByWork = (data) => {
		let result = data.eventType.id === 1;
		return result;
	};
	const filtByMeetup = (data) => {
		let result = data.eventType.id === 2;
		return result;
	};
	const filtByCareer = (data) => {
		let result = data.eventType.id === 3;
		return result;
	};
	const filtByDisc = (data) => {
		let result = data.eventType.id === 4;
		return result;
	};
	const filtByConf = (data) => {
		let result = data.eventType.id === 5;
		return result;
	};
	const filtByConcert = (data) => {
		let result = data.eventType.id === 6;
		return result;
	};
	const filtByFund = (data) => {
		let result = data.eventType.id === 7;
		return result;
	};

	export {filtFree, filtByWork, filtByMeetup, filtByCareer, filtByDisc, filtByConf, filtByConcert, filtByFund}