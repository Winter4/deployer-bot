# - - -

# Проверяем, что передан аргумент (имя ветки)
if [ -z "$1" ]; then
  echo "Ошибка: Не указана ветка" >&2
  exit 1
fi

BRANCH=$1
PROJECT_DIR="$HOME/mus-classified/client"
DEPLOY_DIR="/var/www/mus-$BRANCH"

# Переход в папку с проектом
cd "$PROJECT_DIR" || { echo "Ошибка: Невозможно перейти в директорию $PROJECT_DIR" >&2; exit 1; }

# Проверяем наличие ветки
if git show-ref --verify --quiet refs/heads/$BRANCH; then
  echo "Переход на ветку $BRANCH..."
  git checkout $BRANCH || { echo "Ошибка: Не удалось переключиться на ветку $BRANCH" >&2; exit 1; }
else
  echo "Ошибка: Ветка $BRANCH не существует."
  exit 1
fi

# Обновляем код из репозитория
echo "Обновление репозитория..."
git pull origin $BRANCH || { echo "Ошибка: Не удалось выполнить git pull" >&2; exit 1; }

# Сборка проекта
echo "Сборка проекта..."
npm run build > /dev/null || { echo "Ошибка: Сборка завершилась с ошибкой" >&2; exit 1; }

# Копирование сборки в целевую директорию
echo "Копирование сборки в $DEPLOY_DIR..."
sudo cp -r dist/* $DEPLOY_DIR || { echo "Ошибка: Не удалось скопировать файлы"; exit 1; }

echo "Деплой завершён успешно. Сайт обновлён для ветки $BRANCH."
