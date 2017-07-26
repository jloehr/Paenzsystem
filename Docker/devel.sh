#!/bin/sh
set -e
#
# Script for testing the dockerfile and image
# 
# USAGE: devel.sh [COMMAND] [OPTIONS]
# 
# Commands:
#     start     Starts docker containers
#     stop      Stops docker containers
#     build     Builds docker image from local dockerfile & repository
#     setup     Creates docker containers
#     remove    Removes docker containers
#
# Options:
#     -d PATH   Sets data directory for container data mapping
#     -m        Mongo Only
#     -n NAME   Sets the name for the mongo container
#     -p        Enables public port mapping for the mongo container 
#
data_dir=$( pwd )
mongo_only=0
mongo_image=mongo
mongo_container=paenzsystem_mongo_localtest
mongo_data_dir="mongodata"
mongo_args=""
paenzsystem_image=paenzsystem_local
paenzsystem_container=paenzsystem_server_localtest
paenzsystem_data_dir="nodedata"
paenzsystem_args="-u node --link $mongo_container -p 80:8080 -p 443:8443 -e NODE_ENV=production"

ACTION=$1
shift

while getopts ":d:mn:p" arg $@; do
	case "$arg" in
  		d)
    		data_dir=$OPTARG
    		;;
    	m)
			mongo_only=1
			;;
		n)
			mongo_container=$OPTARG
			;;
		p)
			mongo_args="$mongo_args -p 27017:27017"
			;;
	esac
done

mongo_args="$mongo_args -v $data_dir/$mongo_data_dir:/data/db"
paenzsystem_args="$paenzsystem_args -v $data_dir/$paenzsystem_data_dir:/data"

case $ACTION in
	"start")
		docker start $mongo_container
		if [ $mongo_only -eq 0 ] ; then
			docker start $paenzsystem_container
		fi	
		;;
	"stop")
		if [ $mongo_only -eq 0 ] ; then
			docker stop $paenzsystem_container
		fi	
		docker stop $mongo_container
		;;
	"build")
		if [ $mongo_only -eq 1 ] ; then
			echo "Nothing to build in mongo only mode"
			exit 1
		fi
		docker rm $paenzsystem_container || true
		docker rmi $paenzsystem_image || true
		docker build -t $paenzsystem_image ./../
		;;
	"setup")
		docker pull $mongo_image
		docker rm $mongo_container || true
		docker create --name $mongo_container $mongo_args $mongo_image

		if [ $mongo_only -eq 0 ] ; then
			docker rm $paenzsystem_container || true
			docker create --name $paenzsystem_container $paenzsystem_args $paenzsystem_image
		fi
		;;
	"remove")
		if [ $mongo_only -eq 0 ] ; then
			docker rm $paenzsystem_container || true
		fi
		docker rm $mongo_container || true
		;;
esac
