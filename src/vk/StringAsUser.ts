import {Context, ProcessorNode, Token} from "@paulll/siso";

export class VkStringAsUser extends ProcessorNode {
	public input = [['string']];

	public async process(ctx: Context, tokens: Token[]) {
		let str = await tokens[0].data;

		if (!str.includes('vk'))
			return [];

		if (str.includes('vk.com/'))
			str = str.slice(str.indexOf('vk.com/') + 'vk.com/'.length);
		if (str.startsWith('vk:'))
			str = str.slice(3);
		if (str.startsWith('id') && !isNaN(str.slice(2)))
			str = str.slice(2);

		// is not num
		if (isNaN(str)) {
			try {
				// @ts-ignore
				const udata = await ctx.data.vkApi.enqueue("users.get", {user_ids: str, v: 5.56, fields: [
						"sex", "bdate", "city", "country", "photo_max", "photo_max_orig", "photo_50",
						"online", "domain", "has_mobile", "contacts", "education", "universities",
						"schools", "activity", "last_seen", "relation", "counters", "nickname", "relatives",
						"interests", "movies", "tv", "books", "games", "about", "connections", "career",
						"maiden_name", "military", "occupation", "personal", "quotes", "screen_name", "site", "home_town"
					].join(',')
				});

				return [
					new Token(["vk.user", "vk.user.fields"], udata[0])
				];
			} catch (e) {
				return [new Token(['error'], e)];
			}
		}

		return [new Token(["vk.user"], { id: +str })];
	}
}