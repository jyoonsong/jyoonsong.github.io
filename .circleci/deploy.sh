# Checkout `master` and remove everything.
git clone https://$GITHUB_TOKEN@github.com/jyoonsong/jyoonsong.github.io.git ../jyoonsong.github.io.master
cd ../jyoonsong.github.io.master
git checkout master
rm -rf *

# Copy generated HTML site from jekyll branch in original repository
cp -R ../project/_site/* .

# Make sure we have the updated .travis.yml file so tests won't run on master.
git config credential.helper 'cache --timeout=120'
git config user.name "$USER_NAME"
git config user.email "$USER_EMAIL"

# Commit and push generated content to `master` branch.
git status
git add -A .
git status
git commit --allow-empty -m "$(git log jekyll -1 --pretty=%B)"
git push -q --force https://$GITHUB_TOKEN@github.com/jyoonsong/jyoonsong.github.io.git master

echo "deployed successfully"

