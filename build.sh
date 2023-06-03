# configuration.ts
# index.html
# index.ts
# package.json

if [ ! -d "../docker-registry" ]; then
  echo "mkdir ../docker-registry"
  mkdir ../docker-registry
fi

cd src
npm install --legacy-peer-deps
npm run build
cd ..

sudo docker login ajmfco37-01.ajm.net:5000
# Dockerfile
sudo docker build -t ajmfco37-01.ajm.net:5000/sunstealer-explorer-angular .
sudo docker push ajmfco37-01.ajm.net:5000/sunstealer-explorer-angular
# sudo docker logout ajmfco37-01.ajm.net:5000

kubectl create secret tls sunstealer --namespace default --key ../Documents/sunstealer.key --cert ../Documents/sunstealer.crt

# http://ajmfco37-02:32080/sunstealer-explorer-angular

#debug
# kubectl exec --stdin --tty <POD_NAME> -- /bin/bash

# docker run -d --name sunstealer -p 8080:8080 --restart=always ajmfco37-01:5000/sunstealer-explorer-angular:latest
# docker exec -it <container_id> bash

# curl https://ajmfco37-01:32443/sunstealer-explorer-angular -kv
# openssl s_client -connect ajmfco37-01:32443