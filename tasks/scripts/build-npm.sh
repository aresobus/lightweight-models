
cd "$(dirname "$0")"

set -e

yarn rimraf ../dist/
mkdir -p ../dist
yarn

yarn build
yarn rollup -c

echo "Stored standalone library at dist/aresobus-tasks(.min).js"
