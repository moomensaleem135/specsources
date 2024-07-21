#!/bin/bash
# restore.sh

# Start SQL Server
/opt/mssql/bin/sqlservr &

# Wait for SQL Server to start
sleep 60s

# Restore the database
# /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -Q "
# RESTORE DATABASE [AdventureWorks2022]
# FROM DISK = '/var/opt/mssql/backup/AdventureWorks2022.bak'
# WITH MOVE 'AdventureWorksDW2012_Data' TO '/var/opt/mssql/data/AdventureWorks2022.mdf',
# MOVE 'AdventureWorksDW2012_Log' TO '/var/opt/mssql/data/AdventureWorks2022_log.ldf',
# REPLACE;"

# Restore the database
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -Q "RESTORE DATABASE AdventureWorks2022 FROM DISK = '/var/opt/mssql/backup/AdventureWorks2022.bak' WITH MOVE 'AdventureWorks2022' TO '/var/opt/mssql/data/AdventureWorks2022.mdf', MOVE 'AdventureWorks2022_log' TO '/var/opt/mssql/data/AdventureWorks2022_log.ldf';"

# File to signal that the database is ready
touch /var/opt/mssql/restore_done

# Keep the container running
tail -f /dev/null
