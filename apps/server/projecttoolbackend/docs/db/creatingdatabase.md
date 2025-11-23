

## Creating database to PotgreSQL

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

```sql
GRANT ALL PRIVILEGES ON DATABASE projecttooldb TO projecttooluser;
ALTER ROLE projecttooluser SET client_encoding TO 'utf8';
ALTER ROLE projecttooluser SET default_transaction_isolation TO 'read committed';   
```