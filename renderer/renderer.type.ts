import { Component } from '~/app/module/vike/vike.type.ts';
import { Config } from 'vike/types';
import { Unhead } from '@unhead/schema';
import { vikeHook, vikeHookAsync } from '~/renderer/+config.ts';

export type PageContext = {
  Page?: Component,
  pageProps?: NonNullable<unknown> | undefined;
  is404?: boolean;
};

export type f3VRendererConfig = Config & {
  head: Unhead<object>
  onBeforeMountApp?: vikeHook | vikeHookAsync;
  onCreateApp?: vikeHook | vikeHookAsync;
}