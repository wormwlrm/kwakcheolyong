REM build
npm run build

REM navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/wormwlrm/kwakcheolyong.git master:gh-pages

cd ../