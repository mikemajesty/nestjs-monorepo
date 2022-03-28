
  
export ENVIROMENT=prd

export WORKING_DIR=../

git checkout main

NODE_VERSION=$(node -p -e "require('../package.json').version")
NAME=$(node -p -e "require('../package.json').name")

TAG_NAME=$NAME-$ENVIROMENT-v$NODE_VERSION

echo "Creating production tag '${TAG_NAME}'..."

git add $WORKING_DIR/CHANGELOG.md
git commit -m "feat(release): add production version '${TAG_NAME}'"
git tag -a $TAG_NAME -m "${TAG_NAME}"

git push origin main
git push origin $TAG_NAME && git push

echo 'Finish'
