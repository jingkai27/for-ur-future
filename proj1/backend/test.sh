#!/bin/bash
# test.sh - exercises every expense endpoint end to end.
# usage:  ./test.sh        (starts its own server, cleans up after itself)

cd "$(dirname "$0")"
API=localhost:3000/api/expenses
AUTH=localhost:3000/api/auth

# kill anything already holding port 3000 (stale server from a previous run)
lsof -ti:3000 2>/dev/null | xargs kill 2>/dev/null && sleep 0.5

# start a server on a clean database
rm -f expenses.db
node index.js > /tmp/test-server.log 2>&1 &
SERVER_PID=$!
trap 'kill $SERVER_PID 2>/dev/null' EXIT

# wait until it actually answers, rather than guessing with sleep
for i in $(seq 1 25); do
  curl -s -o /dev/null localhost:3000/api/expenses && break
  sleep 0.2
done

if ! curl -s -o /dev/null localhost:3000/api/expenses; then
  echo "server never came up:"; cat /tmp/test-server.log; exit 1
fi
echo "server up"

echo
echo "1. CREATE two expenses"
curl -s -X POST $API -H 'Content-Type: application/json' \
     -d '{"description":"coffee","amount":4.5}'; echo
curl -s -X POST $API -H 'Content-Type: application/json' \
     -d '{"description":"lunch","amount":12.00}'; echo

echo
echo "2. READ all"
curl -s $API | jq -c '.[]'

echo
echo "3. READ one (id=1)"
curl -s $API/1 | jq -c

echo
echo "4. UPDATE coffee 4.50 -> 9.99"
curl -s -X PUT $API/1 -H 'Content-Type: application/json' \
     -d '{"description":"coffee","amount":9.99}'; echo
got=$(curl -s $API | jq -r '.[] | select(.description=="coffee") | .amount')
if [ "$got" = "9.99" ]; then echo "   PASS - coffee is now $got"
else                          echo "   FAIL - expected 9.99, got $got"; fi

echo
echo "5. DELETE lunch"
curl -s -X DELETE $API/2; echo

echo
echo "6. READ all (expect coffee only)"
curl -s $API | jq -c '.[]'

echo
echo "done."


## Test the authentication database

## test 1: register a new user
echo 
echo "Testing the Auth Database" 
echo "Test 1: Registering a new user"
code=$(curl -s -o /dev/null -w '%{http_code}' -X POST $AUTH/register \
-H 'Content-Type:application/json' \
-d '{"username":"Alice", "password":"sally123"}')

if [ "$code" = "201" ]; then echo "PASS - register returned 201"
else                        echo "FAIL - register returned $code"; fi

# test 2: register with the same username twice
echo "Test 2: register with same username twice" 
code=$(curl -s -o /dev/null -w '%{http_code}' -X POST $AUTH/register -H 'Content-Type:application/json' \
-d '{"username":"Alice", "password":"sally123"}')

if [ "$code" = "409" ]; then echo "PASS - register returned 409" 
else                       echo "FAIL - register returned $code"; fi
