#!/bin/sh
set -e
#
# Forward to development database docker script
# 

if [ "$NODE_ENV" = "production" ] ; then
	exit 0;
fi

. ../Docker/DevelDB.sh "$@"
