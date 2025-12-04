echo off
REM Optional argument: 1, 2, or 3 to build only one project
REM 1 = projecttoolmodels, 2 = projecttoolsdata, 3 = projecttoolutils

set arg1=%1
set arg2=%2

if "%arg1%"=="1" goto build_models
if "%arg1%"=="2" goto build_data
if "%arg1%"=="3" goto build_utils
if "%arg1%"=="" goto build_all
REM If invalid argument, build all
goto build_all


:build_models
echo =======================================
echo Building projecttoolmodels...
cd .\common\projecttoolmodels\
call npm run clean.cmd
call npm install
call npm run build
cd ..\..
goto end

:build_data
echo =======================================
echo Building projecttoolsdata...
cd .\common\projecttoolsdata\
call npm install
call npm run build
cd ..\..
goto end

:build_utils
echo =======================================
echo Building projecttoolutils...
cd .\common\projecttoolutils\
call npm install
call npm run build
cd ..\..
goto end

:build_all
echo =======================================
echo Building all common packages...
echo =======================================
echo.
echo =======================================
echo Building projecttoolmodels...
cd .\common\projecttoolmodels\
call npm run clean.cmd
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

:end
echo.
echo =======================================
echo Installing project root
call npm run clean.cmd
call npm install
echo.
echo =======================================
echo All common packages built successfully.
echo =======================================

if "%arg2%"=="" exit /b 0

echo.
echo =======================================
echo clear and rebuild ui node modules
cd .\apps\ui\projecttoolui\
call rd /s /q node_modules
call npm install
echo. 
echo =======================================
echo ui node modules rebuilt successfully.
echo =======================================
