echo off
echo =======================================
echo Building all common packages...
echo =======================================
echo.
echo =======================================
echo Building projecttoolmodels...
cd .\common\projecttoolmodels\
call npm install
call npm run build
cd ..\..
echo.
echo =======================================
echo Building projecttoolsdata...
cd .\common\projecttoolsdata\
call npm install
call npm run build
cd ..\..
echo.
echo =======================================
echo Building projecttoolutils...
cd .\common\projecttoolutils\
call npm install
call npm run build
cd ..\..
echo.
echo =======================================
echo Installing project root
call npm install
echo.
echo =======================================
echo All common packages built successfully.
echo =======================================    