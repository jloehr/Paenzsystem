#!/bin/sh
set -e
#
# Upgrade script for Pänzsystem
# 

data_dir=$( pwd )
mongo_pretty="Mongo"
mongo_image=mongo
mongo_container=paenzsystem_mongo
mongo_data_dir="$data_dir/mongodata"
mongo_args="-v $mongo_data_dir:/data/db"
paenzsystem_pretty="Pänzsystem"
paenzsystem_image=julianloehr/paenzsystem
paenzsystem_container=paenzsystem_server
paenzsystem_data_dir="$data_dir/nodedata"
paenzsystem_args="-u node --link $mongo_container -p 80:8080 -p 443:8443 -v $paenzsystem_data_dir:/data -e NODE_ENV=production"

# $1 = container
is_running() {
	status=$( docker inspect --format "{{.State.Running}}" $1 2> /dev/null || true ) 
	if [ "$status" = "true" ] ; then 
		return 0
	else
		return 1
	fi
}

# $1 = container - $2 = image
need_upgrade() {
	current=$( docker inspect --format "{{.Image}}" $1 2> /dev/null || true ) 
	latest=$( docker inspect --format "{{.Id}}" $2 2> /dev/null || true ) 

	if [ "$current" != "$latest" ] ; then
		return 0
	else
		return 1
	fi
}

# $1 = stop - $2 = pretty - $3 = container
stop_container() {
	if [ $1 -eq 1 ] ; then
		echo "Stopping $3..."
		docker stop $2
	fi
}

# $1 = upgrade - $2 = container - $3 = image - $4 = pretty
replace_image() {
	if [ $1 -eq 1 ] ; then
		echo "Upgrading $4..."
		docker rm $2 || true
		docker rmi $3:current || true
		docker tag $3:latest $3:current || true
	fi
}


# $1 = upgrade - $2 = stop - $3 = image - $4 = container - $5 = pretty - $6 = args - $7 = data_dir
make_container() {
	if [ $1 -eq 1 ] ; then
		mkdir -p $7

		if [ $2 -eq 1 ] ; then
			echo "Running $5..."
			docker_cmd="run -d"
		else
			echo "Creating $5..."
			docker_cmd="create"
		fi

		docker $docker_cmd --name $4 $6 $3
	else
		echo "Starting $5..."
		docker start $4
	fi
}

echo 'Pulling docker images...'

docker pull $mongo_image
docker pull $paenzsystem_image

echo 'Checking Versions...'

if need_upgrade $paenzsystem_container $paenzsystem_image ; then
	echo "$paenzsystem_pretty needs upgrade!"
	paenzsystem_upgrade=1
	paenzsystem_stop=0

	if is_running $paenzsystem_container ; then
		paenzsystem_stop=1
	fi
else
	echo "$paenzsystem_pretty is up to date!"
	paenzsystem_upgrade=0
	paenzsystem_stop=0
fi

if need_upgrade $mongo_container $mongo_image ; then
	echo "$mongo_pretty needs upgrade!"
	mongo_upgrade=1
	mongo_stop=0

	if is_running $mongo_container ; then
		mongo_stop=1
	fi

	if is_running $paenzsystem_container ; then
		paenzsystem_stop=1
	fi
else
	echo "$mongo_pretty is up to date!"
	mongo_upgrade=0
	mongo_stop=0
fi

# Check if upgrade needed
if [ $paenzsystem_upgrade -eq 1 -o $mongo_upgrade -eq 1 ] ; then
	# Stop running containers
	stop_container $paenzsystem_stop $paenzsystem_container $paenzsystem_pretty
	stop_container $mongo_stop $mongo_container $mongo_pretty

	# Replace image
	replace_image $mongo_upgrade $mongo_container $mongo_image $mongo_pretty
	replace_image $paenzsystem_upgrade $paenzsystem_container $paenzsystem_image $paenzsystem_pretty

	# Restart/Recreate containers
	make_container $mongo_upgrade $mongo_stop $mongo_image $mongo_container $mongo_pretty "$mongo_args" $mongo_data_dir
	make_container $paenzsystem_upgrade $paenzsystem_stop $paenzsystem_image $paenzsystem_container $paenzsystem_pretty "$paenzsystem_args" $paenzsystem_data_dir

	echo "Done!"
else
	echo 'Everything up to date!'
	exit 0
fi
