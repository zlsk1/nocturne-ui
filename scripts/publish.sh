set -e

pnpm i
pnpm gen:version
pnpm update:version

pnpm build

cd dist/nocturne-ui
npm publish --provenance
cd -

echo "Publish completed"
