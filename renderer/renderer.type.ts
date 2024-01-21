import { Unhead } from '@unhead/schema';
import { Component } from '~/app/module/vike/vike.type.ts';

export type PageContext = {
  Page?: Component,
  head?: Unhead
  pageProps?: NonNullable<unknown> | undefined;
  is404?: boolean;
  onBeforeMountApp?: any
};
