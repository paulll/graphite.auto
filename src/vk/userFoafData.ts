import parseXml from "node-xml2js-promise";
import fetch from "node-fetch"

export const userFoafData = async (id) => {
	const request = await fetch(`https://vk.com/foaf.php?id=${id}`);
	const body = await request.textConverted();
	const data = (await parseXml(body))['rdf:RDF']['foaf:Person'][0];

	return {
		registered: data['ya:created'][0]['$']['dc:date'],
		modified: data['ya:modified'][0]['$']['dc:date'],
		friendsCount: data['ya:friendsCount'][0],
		subscribersCount: data['ya:subscribersCount'][0],
		subscribedToCount: data['ya:subscribedToCount'][0],
		home_town: data['ya:locationOfBirth'][0]['$']['ya:city'],
		city: {title: data['ya:location'][0]['$']['ya:city']}
	}
};
