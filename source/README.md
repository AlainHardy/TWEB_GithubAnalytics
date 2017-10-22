# TWEB-Github Analytics
This is a web app using nodeJs. It fetches a respository on Github, extract data and make stats about the repository.
## Prerequisite
You have to use you own github credentials to the app. You have to add them to the file *__github-credentials.json__* on the *__source__* folder. It should be on the same folder as the *__app.js__* . Structure of the file :
```JSON
{
	"username": "MyUsername",
	"token": "MyToken";
}
```
## Start the server
*__app.js__* is the main file of the server. To start the server :
```bash
node app
```
## How to use ?
You can look for any repository you want, but the bigger the slower it will be to get data. 
On the top right corner of the app, there is a text input where you can type the repo you want to get.
Respect the format *__respositoryOwner/repository__*, with no space or any other characters before and after . If nothing is displayed, the repository does not exist.
## Docker
The project integrate  docker-compose. You can find the *__docker-compose.yml__* file on *__docker/topology__* . To start the docker-compose : 
```bash
docker-compose up --build
```
The server is listening to the port 3000. So you should be able to access at http://192.168.99.100:3000/ .