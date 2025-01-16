#!/bin/bash

echo "Starting Verivox Task application setup..."

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if script is run with sudo
if [ "$EUID" -ne 0 ]; then
    echo "Please run as root or with sudo"
    exit 1
fi


echo "Updating package list..."
apt-get update

# Install curl if not present
if ! command_exists curl; then
    echo "Installing curl..."
    apt-get install -y curl
fi

# Check Node.js version and install if needed
if ! command_exists node; then
    echo "Node.js not found. Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
else
    echo "Node.js is already installed"
fi

# Check npm version
echo "Checking npm version..."
npm install -g npm@latest

# Install Angular CLI globally if not present
if ! command_exists ng; then
    echo "Installing Angular CLI globally..."
    npm install -g @angular/cli
else
    echo "Angular CLI is already installed"
fi

if [ -n "$SUDO_USER" ]; then
    REAL_USER="$SUDO_USER"
else
    REAL_USER="$(whoami)"
fi

PROJECT_DIR="$(pwd)"

echo "Installing project dependencies..."
sudo -u "$REAL_USER" bash << EOF
cd "$PROJECT_DIR"
npm install
EOF

if [ $? -eq 0 ]; then
    echo "Installation completed successfully!"
    echo "Starting development server..."
    # Start the development server as the real user
    sudo -u "$REAL_USER" bash << EOF
    cd "$PROJECT_DIR"
    ng serve
EOF
else
    echo "Installation failed. Please check the error messages above."
    exit 1
fi
