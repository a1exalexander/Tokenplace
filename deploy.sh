#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка

npm run build

git add dist
git commit -m 'deploy'
# если вы публикуете по адресу https://<USERNAME>.github.io

git push -f git@github.com:a1exalexander/Tokenplace.git master:gh-pages

