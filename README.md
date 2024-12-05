# loanCalculator

Instructions to run

1. download docker on your system

2. Download this repo

3. Run the command "docker build . " to build the image

4. Run the command "docker build -t ubuntu-serve ."
( this will build the docker image and tag it as 'ubuntu-serve' )

5. Run the command "docker run --restart unless-stopped -p 80:80 -d ubuntu-serve"
( this will run the docker contianer 'ubuntu-serve', make it always restart (even if host restarts) and forward port 80 > container port 80 )
