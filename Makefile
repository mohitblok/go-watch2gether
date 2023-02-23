VER=0.10.3

build-server:
	gsed -i '/ /s/".*"/"${VER}"/' server/pkg/datastore/version.go
	cd server; CGO_ENABLED=0 GOOS=linux go build -o ../.

build-ui:
	cd ui; yarn; yarn build
	gsed -i 's/{WATCH2GETHER_VERSION}/$(VER)/g' ui/build/index.html

build-docker:
	# docker build . --platform linux/amd64 -t mohitpundir28/watch2gether:${VER} 
	docker build . --platform linux/amd64 -t mohitpundir28/watch2gether:latest
	
publish:
	# docker push mohitpundir28/watch2gether:${VER}
	# docker push mohitpundir28/watch2gether:latest

build: build-server build-ui build-docker

run: 
	docker-compose up -d
