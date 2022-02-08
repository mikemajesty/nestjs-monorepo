
  
export ENVIROMENT=prd

export WORKING_DIR=../

git checkout main

NODE_VERSION=$(node -p -e "require('../package.json').version")

NAME=nestjs-monorepo

TAG_NAME=$NAME-$ENVIROMENT-v$NODE_VERSION-d$(date '+%d-%m-%Y')

echo "Creating production tag '${TAG_NAME}'..."

nextVersion=$(npm --no-git-tag-version version patch)
git add $WORKING_DIR/package.json
git add $WORKING_DIR/CHANGELOG.md
git commit -m "feat(release): add production version '${TAG_NAME}'"
git tag -a $TAG_NAME -m "${TAG_NAME}"

git push origin main
git push origin $TAG_NAME && git push

echo 'Finish'
