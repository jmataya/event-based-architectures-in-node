#!/bin/bash

echo "Add address..."

curl -X PATCH \
  http://localhost:21337/carts/$1/shipping-address \
  -H 'content-type: application/json' \
  -d '{
        "address": {
        "street1": "3131 Elliot Ave",
        "street2": "Suite 240",
        "city": "Seattle",
        "state": "WA",
        "postalCode": "98121"
      }
    }' | jq .
