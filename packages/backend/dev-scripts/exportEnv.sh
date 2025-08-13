#!/bin/sh
DOPPLER_TOKEN=$DOPPLER_MFACTORY_TOKEN
PROJECT="marketing-factory"
CONFIG=${1:-dev}
OUTPUT_FILE=".env"

if [ -z "$DOPPLER_TOKEN" ]; then
  echo "ERROR: DOPPLER_TOKEN not found. Please set the DOPPLER_MFACTORY_TOKEN environment variable."
  exit 1
fi

echo "Exporting secrets from $CONFIG configuration in $OUTPUT_FILE..."

response=$(curl -s -H "Authorization: Bearer $DOPPLER_TOKEN" \
  "https://api.doppler.com/v3/configs/config/secrets/download?project=$PROJECT&config=$CONFIG&format=env")

if [[ "$response" == *"\"success\":false"* ]]; then
  echo "ERROR getting secrets from Doppler:"
  echo "$response"
  exit 1
fi

if echo "$response" | grep -q "error"; then
  echo "ERROR getting secrets from Doppler:"
  echo "$response"
  exit 1
fi

echo "$response" > "$OUTPUT_FILE"
echo "Finish exporting secrets to $OUTPUT_FILE."