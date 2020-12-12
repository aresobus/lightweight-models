

cd demo
rm -rf dist
yarn build
gsutil -m rm -r gs://aresobus-models/demos/handpose/*
gsutil -m cp -Z -r dist/ gs://aresobus-models/demos/handpose
