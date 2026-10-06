#!/usr/bin/env bash

set -e

cd /mnt/LinuxStorage/mywork/twitter-clone/

cd backend
echo "Building the TS program..."
npm run build
echo "Building complete."

echo "Starting the backend server..."
npm run start &

cd ../frontend
echo "Starting the frontend..."
npm run dev
