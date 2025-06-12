#!/bin/bash

# Run backend
echo "Starting Backend..."
cd Backend
dotnet run &

# Wait a bit for backend to start
sleep 5

# Run frontend
echo "Starting Frontend..."
cd ../Frontend
npm install
npm start
