# Database for Project Tool

Project tool is using PostgreSQL as its database. A database and its user needs to be created manually before using the backend. The project has been developed with PostgreSQL version 18.

## Database initialization

Run the following steps in pgadmin or from the command prompt to create the database itself and the user with correct priviledges

### Step 1: Create Database

```sql
CREATE DATABASE projecttooldb
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_CTYPE = 'fi-FI'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
```

### Step2 : Create user

**Change the password of the sql before executing it.**

```sql
CREATE ROLE projecttooluser WITH
	LOGIN
	NOSUPERUSER
	NOCREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	NOBYPASSRLS
	CONNECTION LIMIT -1
	PASSWORD 'xxxxxx';
```

### Step 3: Give priviledges to the user

```sql
GRANT ALL PRIVILEGES ON DATABASE projecttooldb TO projecttooluser;
ALTER ROLE projecttooluser SET client_encoding TO 'utf8';
ALTER ROLE projecttooluser SET default_transaction_isolation TO 'read committed';
ALTER DATABASE projecttooldb OWNER TO projecttooluser;
```

### Step 4: Setup the configuration in `.env` file

Create the `.env`file in the root of the server application _(apps/server/projecttoolbackend)_ by copying the `.template.env` files contents to it or alter an existing environment file.

Set the database config values to the correct ones that was used during the setup and initialization

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=projecttooluser
DB_PASSWORD=
DB_NAME=projecttooldb
DB_CLEARDB_ON_STARTUP=true
```

Plase note the **DB_CLEARDB_ON_STARTUP** will clear the contents of all tables from the database and repopulate them when the server is started.


### Step 5: Initial data setup

When the server starts it will automatically populate the database with the default data sets as well as create the tables.