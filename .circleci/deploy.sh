git config user.name "$USER_NAME"
git config user.email "$USER_EMAIL"

git checkout master
git pull origin master --allow-unrelated-histories

find . -maxdepth 1 ! -name '_site' ! -name '.git' ! -name '.gitignore' -exec rm -rf {} \;
mv _site/* .
rm -R _site/

git add -fA
git commit --allow-empty -m "$(git log jekyll -1 --pretty=%B)"
git push -f origin master

echo "deployed successfully"