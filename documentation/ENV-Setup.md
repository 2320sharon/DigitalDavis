# Development Environment

### Docker Desktop

1. https://www.docker.com/products/docker-desktop
1. You will need to enable WSL inside of settings.
1. docker run -d -p 80:80 docker/getting-started

### WSL2 - Windows Users Only

1. https://docs.microsoft.com/en-us/windows/wsl/install-win10
2. Distro Ubuntu 18.04 - Bionic Beaver
3. https://www.microsoft.com/en-us/p/ubuntu-1804-lts/9n9tngvndl3q?activetab=pivot:overviewtab

4. 
``` 
wsl --shutdown
```
5. 
```
notepad "$env:USERPROFILE/.wslconfig"
```
6. 
```
[wsl2]
memory=3GB   # Limits VM memory in WSL 2 up to 3GB
processors=4 # Makes the WSL 2 VM use two virtual processors
```
7. Save and exit notepad

### VSCode

1. https://code.visualstudio.com/download
Extensions
    1. https://code.visualstudio.com/docs/remote/wsl
    1. https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack
2. Sync Settings - optional 
    1. https://code.visualstudio.com/docs/editor/settings-sync


### Git

https://newbedev.com/shell-how-to-change-git-credentials-in-vscode-code-example

1. Disable 2FA on Gitlab if you have it enabled 
2. Clone using HTTPS vscode should ask for username and pw
3. Open VSCode Terminal and navigate to the git directory /home/path_to_repo/Spring2021_Final Iteration.
4. Clone the project repo useing HTTPS 
    1. https://gitlab.com/yang_SacState/spring2021_final-iteration.git
5. Run the following commands

```git config --global user.email "you@example.com"```

```git config --global user.name "Your Name"```

6. Use the command below with your personal credentials
    1. ```git remote set-url origin https://<USERNAME>:<PASSWORD>@gitlab.com/yang_SacState/spring2021_final-iteration.git```
7. Checkout to the auth_test branch
8. update the auth_test.md file to include your name
9. save and push 


### WSL CLI - VScode

1. In VSCode Type

```
ctrl+shift+p
```

2. Select

```
New WSL Window using Distro
```

3. Choose 

```
Ubuntu 18.04
```

4. Run the following command 

```
-uname -srvo
 ```

You need to get the following output to confirm you are in the correct env 

``` 
> Linux 5.4.72-microsoft-standard-WSL2 #1 SMP Wed Oct 28 23:40:43 UTC 2020 GNU/Linux
``` 

### Docker 

```docker -v```

``` 
> Docker version 20.10.8, build 3967b7d
``` 

```docker run -d -p 80:80 docker/getting-started```

Go to ```localhost:80```

### Docker Compose

https://docs.docker.com/compose/install/

```sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose```

```sudo chmod +x /usr/local/bin/docker-compose```

```sudo docker-compose --version```

```
> docker-compose version 1.29.2, build 5becea4c 
```  

### Node JS 
https://github.com/nodesource/distributions/blob/master/README.md#deb

```curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -```

```sudo apt-get install -y nodejs```

```sudo npm install -g npm```

```npm version```

```json
{
  npm: '7.21.1',
  node: '16.8.0',
  v8: '9.2.230.21-node.20',
  uv: '1.42.0',
  zlib: '1.2.11',
  brotli: '1.0.9',
  ares: '1.17.2',
  modules: '93',
  nghttp2: '1.42.0',
  napi: '8',
  llhttp: '6.0.2',
  openssl: '1.1.1k+quic',
  cldr: '39.0',
  icu: '69.1',
  tz: '2021a',
  unicode: '13.0',
  ngtcp2: '0.1.0-DEV',
  nghttp3: '0.1.0-DEV'
}
```

### Kubernetes install 

https://minikube.sigs.k8s.io/docs/start/


inside of a new WSL terminal 

```curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64```

```sudo install minikube-linux-amd64 /usr/local/bin/minikube```

```minikube version```

```
> minikube version: v1.22.0
> commit: a03fbcf166e6f74ef224d4a63be4277d017bb62e
```

### Versions



### Recommended Tools

1. Microsoft Terminal 
1. Mongo DB Compass
1. MobaXterm
1. Sublime Text 4
1. Greenshot
1. Bitvise