import {Context, ProcessorNode, Token} from "@paulll/siso";
import {oncePerUser} from "./oncePerUser";

const checkIfFirst = oncePerUser();

export class VkUserMainData extends ProcessorNode {
	public input = [['vk.user']];

	public async process(ctx: Context, tokens: Token[]) {
		let usr = await tokens[0].data;

		// if already processed
		if (!checkIfFirst(usr))
			return [];

		try {
			// @ts-ignore
			const udata = await ctx.data.vkApi.enqueue("users.get", {user_ids: usr.id, v: 5.56, fields: [
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
			return;
		}
	}
}