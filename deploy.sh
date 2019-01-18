#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка
npm run build

# если вы публикуете на пользовательский домен
# echo 'www.example.com' > CNAME
git checkout gh-pages

git add dist
git commit -m 'deploy'

# если вы публикуете по адресу https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# если вы публикуете по адресу https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/a1exalexander/Tokenplace.git gh-pages

git checkout master