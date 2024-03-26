@REM github process
git pull
git add .
git commit -m "%*"
git push

@REM Angular App builden
ng build