import {ProcessorNode, Token, Executor, Context} from "@paulll/siso";
import {API} from "@paulll/vklib";

import {StringAsVkUser} from "./StringAsVkUser";
import {VkUserMainData} from "./VkUserMainData";
import {VkUserFoafData} from "./VkUserFoafData";
import {ErrorReporter} from "./ErrorReporter";
import {VkUserAvatars} from "./VkUserAvatars";
import {VkUserWall} from "./VkUserWall";

const executor = new Executor();

executor.addNode(new StringAsVkUser());
executor.addNode(new VkUserMainData());
executor.addNode(new VkUserFoafData());
executor.addNode(new ErrorReporter());
executor.addNode(new VkUserAvatars());
executor.addNode(new VkUserWall());

const ctx = executor.createContext({vkApi: new API({
		service_token: "c8dbb40ac8dbb40ac8dbb40a64c8ebf155cc8dbc8dbb40a92df9d61ae3e1068cf1fa8e9",
		access_token: false
})});

(async () => {
	await ctx.run([
		new Token(["string"], "vk: 281843929", 1),
	]);
})();

ctx.on("newToken", async (token: Token) => {
	//console.log(token);
	console.dir(token, { depth: null });
});