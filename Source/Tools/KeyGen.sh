#!/bin/sh
#
# Generates SSL-Keys
# 

if [ "$NODE_ENV" = "production" ] ; then
	node_data_dir=$npm_package_config_production_datadir
else
	node_data_dir=$npm_package_config_devel_datadir
fi

mkdir -p $node_data_dir
cd $node_data_dir

if [ ! -f $npm_package_config_ssl_key_name -o ! -f $npm_package_config_ssl_cert_name ] ; then
	openssl req -x509 -nodes -newkey rsa:2048 -keyout $npm_package_config_ssl_key_name -out $npm_package_config_ssl_cert_name -subj "/CN=*"
fi
