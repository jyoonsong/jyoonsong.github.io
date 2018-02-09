#!/bin/bash

# only proceed script when started not by pull request (PR)
if [ $TRAVIS_PULL_REQUEST == "true" ]; then
  echo "this is PR, exiting"
  exit 0
fi

# enable error reporting to the console
set -e

# build site with jekyll, by default to `_site' folder
bundle exec jekyll build

#clone `master' branch of the repository using encrypted GH_TOKEN for authentification
git clone https://${GH_TOKEN}@github.com/jyoonsong/jyoonsong.github.io.git ../jyoonsong.github.io.master
cd ../jyoonsong.github.io.master
git checkout master
rm -rf *

# Copy generated HTML site from source branch in original repo.
# Now the master branch will contain only the contents of the _site directory.
cp -R ../jyoonsong.github.io/_site/* .

# Make sure we have the updated .travis.yml file so tests won't run on master.
cp ../jyoonsong.github.io/.travis.yml .
git config user.email "jyo3on@gmail.com"
git config user.name "jyoonsong"

# commit and push generated content to `master' branch
# since repository was cloned in write mode with token auth - we can push there
git add -A .
git commit -a -m "Travis #$TRAVIS_BUILD_NUMBER"
git push --quiet origin master > /dev/null 2>&1