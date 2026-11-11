# cloudtak-plugin-__SLUG__

__DESCRIPTION__

A [CloudTAK](https://github.com/dfpc-coe/CloudTAK) web plugin. CloudTAK plugins are compiled
into the web app at build time; there is no runtime upload.

Built and tested against CloudTAK __CLOUDTAK_VERSION__.

## Install (operator)

**Docker build:** pass the repo URL in the `WEB_PLUGINS` build argument when building the
CloudTAK image. Several plugins are space or comma separated.

```bash
docker compose build --build-arg WEB_PLUGINS="https://github.com/__OWNER__/cloudtak-plugin-__SLUG__.git" api
docker compose up -d
```

**Manual:** clone into the web app's plugins directory, then rebuild CloudTAK the way your
deployment does.

```bash
cd <CloudTAK>/app/plugins
git clone https://github.com/__OWNER__/cloudtak-plugin-__SLUG__.git __SLUG__
```

## Development

```bash
npm install
ln -s "$PWD" <CloudTAK>/app/plugins/__SLUG__
# then start the CloudTAK web dev server and restart it once so the new plugin is picked up
npm run typecheck
npm test
```

## Design

See `docs/DESIGN.md` and `docs/decisions/`.
