#!/bin/sh
set -e
#
# Deployment script for Pänzsystem.
# Downloads start, stop and upgrade scripts. 
# Then runs Upgrade to pull and setup docker images.
# 
# Usage:
#  'curl -sSL https://raw.githubusercontent.com/jloehr/Paenzsystem/master/Deploy.sh | sh'
# or:
#  'wget -qO- https://raw.githubusercontent.com/jloehr/Paenzsystem/master/Deploy.sh | sh'
#

scripts="Start.sh Stop.sh Upgrade.sh"
url='https://raw.githubusercontent.com/jloehr/Paenzsystem/master/Docker/'

echo 'Checking dependencies...'

if ! command -v docker >/dev/null 2>&1 ; then
	echo >&2 "Docker not found! Please install Docker (eg. 'curl -sSL https://get.docker.com/ | sh')."
	exit 1
fi

if ! command -v wget >/dev/null 2>&1 ; then
	echo >&2 "Missing Wget!"
	exit 1
fi

mkdir "mongodata" || true

echo 'Downloading scripts...'

for script in $scripts ; do
	wget  $url$script
	chmod u+x $script
done

echo 'Run Upgrade to pull and create containers...'

. ./Upgrade.sh
