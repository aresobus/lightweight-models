

cd demo
rm -rf dist
yarn build
gsutil -m rm -r gs://lightweight-models/demos/handpose/*
gsutil -m cp -Z -r dist/ gs://lightweight-models/demos/handpose
