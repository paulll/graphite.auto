import {Context, ProcessorNode, Token} from "@paulll/siso";
import {oncePerUser} from "./oncePerUser";

const checkIfFirst = oncePerUser();

export class VkUserAvatars extends ProcessorNode {
	public input = [['vk.user']];

	public async process(ctx: Context, tokens: Token[]) {
		let usr = await tokens[0].data;

		// if already processed
		if (!checkIfFirst(usr))
			return [];

		try {
			// @ts-ignore
			const {items} = await ctx.data.vkApi.enqueue("photos.get", {
				owner_id: usr.id,
				album_id: 'profile',
				extended: 1,
				v: 5.76,
				count: 500 // max = 1000, we don't need that much
			});

			return items.map( photo => new Token(['vk.photo', 'vk.photo.avatar', 'vk.object'], photo));
		} catch (e) {
			return [new Token(['error'], e)];
		}
	}
}