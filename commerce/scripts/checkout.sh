#!/bin/bash

echo "Checking out..."

curl -X POST \
  http://localhost:21337/carts/$1/checkout \
  -H 'content-type: application/json' | jq .
