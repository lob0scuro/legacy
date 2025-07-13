echo "sending server file...."
scp -r server.py cameron@104.200.20.211:/var/www/legacy_api/

echo "sending wsgi file...."
scp wsgi.py cameron@104.200.20.211:/var/www/legacy_api/

echo "sending requirements file...."
scp requirements.txt cameron@104.200.20.211:/var/www/legacy_api/

echo "job complete!"