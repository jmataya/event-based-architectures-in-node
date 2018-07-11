#!/bin/bash

echo "Add credit card..."

curl -X PATCH \
  http://localhost:21337/carts/$1/payment-method \
  -H 'content-type: application/json' \
  -d '{
        "payment": {
        "cardNumber": "4242424242424242",
        "expMonth": 5,
        "expYear": 2030,
        "verificationCode": "1234"
      }
    }' | jq .
