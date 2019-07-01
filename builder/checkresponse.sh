#wait for webserver before trying to test
sleep 2

#check to see if local webserver is serving pages
frontendresponse=`curl -s -o /dev/null -I -w "%{http_code}" http://127.0.0.1:9091`
backendresponse=`curl -s -o /dev/null -I -w "%{http_code}" http://127.0.0.1:9090`
frontend="false"
backend="false"
#look for a response code of 301 or 302
 if [ $frontendresponse -eq "301" ] || [ $frontendresponse -eq "302" ] || [ $frontendresponse -eq "200" ]; then
  echo "Site is live! HTTP Response $response OK"
  frontend="true"
  if [ $backendresponse -eq "301" ] || [ $backendresponse -eq "302" ] || [ $backendresponse -eq "200" ]; then
  backend="true"
  exit 0
else
  echo "Something went wrong! HTTP Response code was $response"
  exit 1
fi