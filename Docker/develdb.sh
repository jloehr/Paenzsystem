#!/bin/sh
set -e
#
# Script for development Mongo DB
# 

image_name=mongo
container_name=paenzsystem_mongo_devel
data_dir=$( pwd )"/$npm_package_config_devel_datadir/mongodata"
container_args="-v $data_dir:/data/db -p 27017:27017"

ACTION=$1
shift

case $ACTION in
	"setup")
		echo "Setting up Mongo DB for development..."
		docker pull $image_name
		docker rm $container_name || true
		docker create --name $container_name $container_args $image_name
		;;
	"remove")
		echo "Removing Mongo DB devlopment container."
		docker rm $container_name || true
		;;
	"start")
		echo "Starting Mongo DB."
		docker start $container_name
		;;
	"stop")
		echo "Stopping Mongo DB."
		docker stop $container_name
		;;	
esac
 