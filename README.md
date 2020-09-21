welcome to bananagrams!

play it here! https://bananagrams.nataliewee.com/

<img src="https://media.giphy.com/media/l1TYoiaAaPTnsxXz7j/giphy.gif" alt="bananagrams" />


## to run it locally:

from the client/ directory run `npm start`

to run it with the backend locally, in client/src/components/Game/Game.js change the ENDPOINT to localhost:5000

from the server/ directory run `npm start`

## to deploy the frontend:

from the client/ directory run npm run build

then copy over the `_redirects` file into the build/ folder

then run `netlify deploy`

and when it asks for which folder, put `./build`

then run `netlify deploy --prod`

and also put `./build` when it asks for the folder

NOTE:

using https://kaffeine.herokuapp.com/ to prevent heroku from idling after 30 minutes which messes up all the socket data
