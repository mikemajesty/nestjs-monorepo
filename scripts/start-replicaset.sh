#!/bin/bash

docker-compose -f docker-compose-local.yml up -d

sleep 10

docker exec nestjs-monorepo-primary ./scripts/rs-init.sh