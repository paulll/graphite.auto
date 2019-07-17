import {Context, ProcessorNode, Token} from "@paulll/siso";

export class ErrorReporter extends ProcessorNode {
	public input = [['error']];

	public async process(ctx: Context, tokens: Token[]) {
		console.dir(await tokens[0].data, {depth: null});
		return [];
	}
}