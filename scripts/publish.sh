set -e

pnpm i
pnpm gen:version
pnpm update:version

pnpm build

cd dist/nocturne-ui
npm publish --provenance --access public
cd -

echo "Publish completed"
