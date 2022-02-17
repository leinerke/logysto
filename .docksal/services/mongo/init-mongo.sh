#!/bin/bash
set -e
cat <<EOF
###################################################################
# Trying to create database and user
###################################################################
EOF
if [ -n "${MONGO_INITDB_ROOT_USERNAME:-}" ] && [ -n "${MONGO_INITDB_ROOT_PASSWORD:-}" ] && [ -n "${MONGODB_USER:-}" ] && [ -n "${MONGODB_PASS:-}" ] && [ -n "${MONGODB_DB:-}" ]; then
  mongo -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD <<EOF
    db=db.getSiblingDB('$MONGODB_DB');
    db.createUser({
      user: '$MONGODB_USER',
      pwd: '$MONGODB_PASS',
      roles: [
        { role: 'dbOwner', db: '$MONGODB_DB' },
      ],
    });
EOF
cat <<EOF
###################################################################
# User and databases created
###################################################################
EOF
else
  echo "MONGO_INITDB_ROOT_USERNAME,MONGO_INITDB_ROOT_PASSWORD,MONGODB_USER, MONGODB_PASS MONGODB_DATABASE  must be provided. Some of these are missing, hence exiting database and user creatioin"
  exit 403
fi