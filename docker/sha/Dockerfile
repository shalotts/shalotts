FROM debian:11.6-slim as builder

WORKDIR /app

RUN apt update
RUN apt install curl unzip -y

RUN curl https://bun.sh/install | bash

COPY . .

RUN /root/.bun/bin/bun install --production
RUN /root/.bun/bin/bun run build

# ? -------------------------
FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=builder /root/.bun/bin/bun bun
COPY --from=builder /app/ .

ENV NODE_ENV production
EXPOSE 3000/tcp
#CMD ["ls" ]