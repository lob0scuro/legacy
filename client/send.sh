echo "building dist file...."
npm run build

echo "deploying to server...."
scp -r dist/* cameron@104.200.20.211:/var/www/epcteams.com/legacy/

echo "files have been sent!"