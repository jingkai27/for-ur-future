start project: `node index.js`
then can do all the curl stuff


API=localhost:3000/api/expenses

retrieve: curl -s -X GET $API
post one: curl -s -X POST $API -H "Content-Type: application/json" -d '{"description":"money", "amount":3000}'
update one: curl -s -X PUT $API/1 -H "Content-Type: application/json" -d '{"description":"money", "amount":4000}'
delete one: curl -s -X DELETE $API/1
get one: curl -s -X GET $API/1

# step 3: 
register + login returning a JWT
npm i jsonwebtoken bcrypt

# step 4: 
building the auth checks 
- register a new user -> expect 201
- register same username twice -> expect rejection not 201
- login with right password -> expect 200 and token in json
- login with wrong password -> 401
- login with unknown user -> 404

to-do: finish writing all 5 test cases, understand how the curl and shell stuff works
