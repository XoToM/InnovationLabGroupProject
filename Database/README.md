# How to create a database in AWS

1. Create AWS login
2. AWS console -> search for RDB (relational database) -> create database
3. Select free tier template
4. Set database name
5. Select minimal settings (to reduce the cost)
6. Connectivity -> select Public access: Yes
7. After creating database (3 minutes) -> save _endpoint_ name

# Connect to database

1. Install MySQL Workbench
2. Add MySQL Connection with parameters:
   1. Connection name: EquiMap
   2. Hostname: [given hostname]
   3. Login: admin
   4. Password: given password (You will also be prompted to enter it when connecting or press Store in Vault to save it for later connections)
   5. Port: 3306
   6. Default Schema: EquiMap
3. Check connection by executing this query: select \* from Place
