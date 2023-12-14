# shalotts

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout shalotts.key -out shalotts.cert
```