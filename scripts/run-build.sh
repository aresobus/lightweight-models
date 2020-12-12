
set -e

DIR=$1
if test -f "$DIR/diff"; then
  gcloud builds submit . --config=$DIR/cloudbuild.yml
fi
