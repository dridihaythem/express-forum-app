export const getAge = (birthday) => {
	birthday = new Date(birthday);
	var ageDifMs = Date.now() - birthday.getTime();
	var ageDate = new Date(ageDifMs);
	return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const convertDate = (date, options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) => {
	date = new Date(date);
	return date.toLocaleDateString('en-US', options);
};

export const convertTime = (date) => {
	date = new Date(date);
	return date.toLocaleTimeString('en-US');
};
