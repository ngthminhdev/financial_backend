#!/bin/zsh

docker run -d --name financial_management_db -p 5432:5432 -v financial_management_db_data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=development postgres:15.5
