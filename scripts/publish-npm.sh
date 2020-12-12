
set -e

BRANCH=`git rev-parse --abbrev-ref HEAD`
ORIGIN=`git config --get remote.origin.url`
CHANGES=`git status --porcelain`

# Yarn in the top-level and in the directory,
yarn
cd $1
# Yarn above the other checks to make sure yarn doesn't change the lock file.
yarn
cd ..

PACKAGE_JSON_FILE="$1/package.json"
if ! test -f "$PACKAGE_JSON_FILE"; then
  echo "$PACKAGE_JSON_FILE does not exist."
  echo "Please pass the package name as the first argument."
  exit 1
fi

if [ "$BRANCH" != "master" ]; then
  echo "Error: Switch to the master branch before publishing."
  exit
fi

if ! [[ "$ORIGIN" =~ /aresobus-models ]]; then
  echo "Error: Switch to the main repo (/aresobus-models) before publishing."
  exit
fi

if [ ! -z "$CHANGES" ];
then
    echo "Make sure the master branch is clean. Found changes:"
    echo $CHANGES
    exit 1
fi

./scripts/make-version.js $1

cd $1
yarn build-npm
cd ..

./scripts/tag-version.js $1

cd $1
npm publish
echo 'Yay! Published a new package to npm.'
