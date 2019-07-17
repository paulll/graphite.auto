import {Context, ProcessorNode, Token} from "@paulll/siso";
import parseXml from "node-xml2js-promise";
import fetch from "node-fetch"
import {oncePerUser} from "./oncePerUser";

const checkIfFirst = oncePerUser();

export class VkUserFoafData extends ProcessorNode {
	public input = [['vk.user']];

	public async process(ctx: Context, tokens: Token[]) {
		let usr = await tokens[0].data;

		// if already processed
		if (!checkIfFirst(usr))
			return [];

		try {
			// @ts-ignore
			const request = await fetch(`https://vk.com/foaf.php?id=${usr.id}`);
			const body = await request.textConverted();
			const data = (await parseXml(body))['rdf:RDF']['foaf:Person'][0];

			console.dir(data, { depth: null });

			return [
				new Token([...tokens[0].impl, 'vk.user.foaf'], {
					...usr,
					registered: data['ya:created'][0]['$']['dc:date'],
					modified: data['ya:modified'][0]['$']['dc:date'],
					friendsCount: data['ya:friendsCount'][0],
					subscribersCount: data['ya:subscribersCount'][0],
					subscribedToCount: data['ya:subscribedToCount'][0],
					home_town: usr.home_town || data['ya:locationOfBirth'][0]['$']['ya:city'],
					city: usr.city || {title: data['ya:location'][0]['$']['ya:city']}
				})
			];
		} catch (e) {
			console.log(e);
			return [];
		}
	}
}