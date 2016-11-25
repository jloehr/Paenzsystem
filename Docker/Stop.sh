#!/bin/sh
set -e
#
# Script to start Pänzsystem
#

docker stop paenzsystem_mongo
docker stop paenzsystem_server
