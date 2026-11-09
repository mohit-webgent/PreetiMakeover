@echo off
echo Checking and starting PostgreSQL on port 5432...
set PG_BIN=D:\Postgres\bin
set PG_DATA=D:\Postgres\data

"%PG_BIN%\pg_isready.exe" -h localhost -p 5432 >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo PostgreSQL is already running on port 5432.
    goto done
)

net start postgresql-x64-18 >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Service start failed ^(needs admin?^), trying pg_ctl...
    "%PG_BIN%\pg_ctl.exe" -D "%PG_DATA%" start -w
)

:done
echo Database ready.
