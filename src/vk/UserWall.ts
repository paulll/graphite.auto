import {Context, ProcessorNode, Token} from "@paulll/siso";
import {oncePerUser} from "./oncePerUser";

const checkIfFirst = oncePerUser();

export class VkUserWall extends ProcessorNode {
	public input = [['vk.user']];

	public async process(ctx: Context, tokens: Token[]) {
		let usr = await tokens[0].data;

		// if already processed
		if (!checkIfFirst(usr))
			return [];

		try {
			// todo: load more items; needs bypassing VK API limits
			// @ts-ignore
			const posts = await ctx.data.vkApi.fetch("wall.get", {
				owner_id: usr.id,
				v: 5.76,
				count: 100
			}, {limit: 100});
			return posts.map( post => new Token(['vk.post', 'vk.post.user', 'vk.object'], post));
		} catch (e) {
			return [new Token(['error'], e)];
		}
	}
}