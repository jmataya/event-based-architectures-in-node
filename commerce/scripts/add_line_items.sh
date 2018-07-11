#!/bin/bash

echo "Add line items..."

curl -X PATCH \
  http://localhost:21337/carts/$1/line-items \
  -H 'content-type: application/json' \
  -d '{
        "lineItems": [{
          "sku": "basketball-shoes",
          "qty": 1,
          "price": 100.00
        }]
      }' | jq .
