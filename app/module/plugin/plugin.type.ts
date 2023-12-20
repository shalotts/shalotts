import { FastifyInstance } from 'fastify';

export type TPlugin = (app: FastifyInstance<any>, options: any, next: () => void) => void;