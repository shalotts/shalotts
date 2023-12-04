import { Context } from 'elysia';

export interface Connected {
	/**
	 * @param middleware - express middleware
	 * @param context - elysia context
	 */
	elysiaConnect: (middleware: any, context: Context) => Promise<any>;
}
export interface ConnectedContext extends Context, Connected {}
