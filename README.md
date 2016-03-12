LOCAL:
start server: node server
local url: localhost:5000

HEROKU:
heroku login
heroku git:remote -a thawing-eyrie-2347   - connect git with app
git push heroku master
git push heroku bootstrap:master   - to push to a different branch
heroku ps:scale web=1
