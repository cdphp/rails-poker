## info
  rails poker is a rails 5 based project.</br>
  and include a chatroom in it ;)</br>
  I start the project with a purpose to buid a demo for **rails5 + actioncable + reactjs**</br>
  i can't stop my keybord while i found much fun with it!</br>
  then i extend the actioncable demo to a nice chating app</br>
  and build a internal use online srum-poker app</br>
  
  I think this will help someone who is interested in actioncable and reactjs,</br>
  maybe this can be the starting example.
## demo
  [Chat room](http://poker.miaowu.org/)</br>
  [scum poker](http://poker.miaowu.org/usersessions/new)</br>

## FEATURES
  - **Chat Room**
  > 1. random displayname by session, everyday changes, very interesting
  > 2. user join/quit staus(some problem with the quit)
  > 3. some mark-down support
  > 4. send image by url
  > 5. kamoji support
  
  - **Scrum Poker**
  > 1. create room and send the url to participants
  > 2. subject can change every turn
  > 3. organizer can switch the room status, **ready** -> **start poking** -> **draw result**
  > 4. the participants status will be showed on the right
  > 5. the result will showing as a pie chart

## Support

For support please create an issue here at GitHub

## Pull Requests

Feel free to submit any PRs here, too. :)

Please indent using two spaces only, have a newline at the EOF and use UNIX line ending, thanks!

# development

```bashshell
# install docker and docker-compose beforehand
# clone the repo
git clone https://github.com/cdphp/rails-poker.git

# create the database
docker-compose run app /bin/bash
root@3b552a0a5c99:/usr/src/app# mysql -hdb -p
Enter password: root
mysql> CREATE DATABASE IF NOT EXISTS poker default charset utf8 COLLATE utf8_general_ci;
mysql> exit
Bye
root@3b552a0a5c99:/usr/src/app# rake db:migrate
root@3b552a0a5c99:/usr/src/app# exit
exit
docker-compose up
# http://localhost:3000
```

# contribute
如果你有什么想法或者建议，请不要客气尽可以提出来。<br>
show me your ideas, thanks!

----
Built by (c) Joey Huang and contributors. Released under the MIT license.

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcdphp%2Frails-poker.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcdphp%2Frails-poker?ref=badge_large)
