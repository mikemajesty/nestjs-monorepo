
  
export ENVIROMENT=prd

export WORKING_DIR=../

git checkout master

NODE_VERSION=$(node -p -e "require('../package.json').version")

NAME=nestjs-monorepo

TAG_NAME=$NAME-$ENVIROMENT-$NODE_VERSION

echo "Creating production tag '${TAG_NAME}'..."

nextVersion=$(npm --no-git-tag-version version patch)
git add $WORKING_DIR/package.json
git add $WORKING_DIR/CHANGELOG.md
git commit -m "feat(release): add production version '${TAG_NAME}'"
git tag -a $TAG_NAME -m "${TAG_NAME}"

git push origin master
git push origin $TAG_NAME && git push

echo 'Finish'