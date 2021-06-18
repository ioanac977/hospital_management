cd ./client && npm run build && rm -rf ../HospitalManagement/HospitalManagement/wwwroot/* && 
cp -a ./build/* ../HospitalManagement/HospitalManagement/wwwroot &&
cd .. && docker-compose up --build
