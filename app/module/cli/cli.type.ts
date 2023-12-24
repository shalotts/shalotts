import { IncomingMessage } from 'node:http';

export interface IPinoMessage {
  level: number;
  time: number;
  pid: number;
  url?: string;
  reqId?: string;
  req?: Request;
  res?: IncomingMessage;
  responseTime?: number;
  msg: string;
}