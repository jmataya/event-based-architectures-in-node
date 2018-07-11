#!/bin/bash

echo "Creating cart..."

curl -X POST \
  http://localhost:21337/carts \
  -H 'content-type: application/json' \
  -d "{ \"customerId\": $1 }" | jq .
