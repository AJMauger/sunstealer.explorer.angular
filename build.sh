cd src
npm install
npm run build
cd ..

sudo docker login ajmfco42-01.ajm.net:5000
sudo docker build -t ajmfco42-01.ajm.net:5000/sunstealer-explorer-angular .
sudo docker push ajmfco42-01.ajm.net:5000/sunstealer-explorer-angular
# sudo docker logout ajmfco42-01.ajm.net:5000
kubectl create secret tls kong-proxy-tls --cert=../tls.crt --key=../tls.key -n ajm
