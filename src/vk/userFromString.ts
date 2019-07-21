export const userFromString = async (str) => {
	if (!str.includes('vk'))
		return false;

	if (str.includes('vk.com/'))
		str = str.slice(str.indexOf('vk.com/') + 'vk.com/'.length);
	if (str.startsWith('vk:'))
		str = str.slice(3);
	if (str.startsWith('id') && !isNaN(str.slice(2)))
		str = str.slice(2);

	return str;
};