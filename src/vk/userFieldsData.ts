import {api} from "./api"

export const userFieldsData = async (id) => {

	const fieldsData = await api.enqueue("users.get", {user_ids: id, v: 5.56, fields: [
			"sex", "bdate", "city", "country", "photo_max", "photo_max_orig", "photo_50",
			"online", "domain", "has_mobile", "contacts", "education", "universities",
			"schools", "activity", "last_seen", "relation", "counters", "nickname", "relatives",
			"interests", "movies", "tv", "books", "games", "about", "connections", "career",
			"maiden_name", "military", "occupation", "personal", "quotes", "screen_name", "site", "home_town"
		].join(',')
	});

	return fieldsData[0];
};