#!/bin/sh
set -e
#
# Script to start Pänzsystem
#

docker start paenzsystem_mongo
docker start paenzsystem_server
