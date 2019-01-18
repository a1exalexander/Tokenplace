#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка
npm run build

# переход в каталог сборки


npm run build


git add -A
git commit -m 'deploy'
# если вы публикуете по адресу https://<USERNAME>.github.io

# если вы публикуете по адресу https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:a1exalexander/Tokenplace.git master:gh-pages

