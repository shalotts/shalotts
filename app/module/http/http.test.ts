import { build } from '~/app/module/helper/helper.build.ts';

test("default root route", async () => {
  const app = await build();
  const res = await app.inject({
    url: "/",
  });
  expect(res.json()).toEqual({ root: true });
});