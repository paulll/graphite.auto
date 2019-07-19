import {Token, Executor} from "@paulll/siso";
import {API} from "@paulll/vklib";

// core nodes
import {ErrorReporter} from "./ErrorReporter";

// vk.com related nodes
import {VkStringAsUser} from "./vk/StringAsUser";
import {VkUserMainData} from "./vk/UserMainData";
import {VkUserFoafData} from "./vk/UserFoafData";
import {VkUserAvatars} from "./vk/UserAvatars";
import {VkUserWall} from "./vk/UserWall";

const executor = new Executor();

executor.addNode(new ErrorReporter());
executor.addNode(new VkStringAsUser());
executor.addNode(new VkUserMainData());
executor.addNode(new VkUserFoafData());
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
	console.dir(token, { depth: null });
});