#!/bin/sh
set -e
#
# Forward to development database docker script
# 

if [ "$NODE_ENV" = "production" ] ; then
	exit 0;
fi

../Docker/devel.sh $@ -m -p -d $npm_package_config_devel_datadir -n paenzsystem_mongo_devel
