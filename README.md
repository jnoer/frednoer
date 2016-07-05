#REQUIREMENTS:
* NodeJS
* NPM

#LOCAL:
* Download dependencies. Run **npm update**
* Start the server. Run **node server**
* Go to url: **http://localhost:5000**

#PRODUCTION:
* Requires heroku toolbelt https://toolbelt.heroku.com/
* Log in: **heroku login**
* Connect git with the app: **heroku git:remote -a thawing-eyrie-2347**
* Push changes to heroku: **git push heroku master** (to push to a different branch: **git push heroku bootstrap:master**)
* Restart the app: **heroku ps:scale web=1**
