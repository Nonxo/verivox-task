# VerivoxTask

A responsive Angular application for displaying and filtering internet tariffs. Built with Angular 18, featuring mobile-first design and comprehensive unit tests.

## Features

- Responsive design (Mobile, Tablet, Desktop layouts)
- Sorting functionality (Price, Download Speed, Upload Speed)
- Async data loading with mock service
- Unit tests for components and services
- Mobile-first approach

## Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)
- Angular CLI (v18 or later)

## Installation

### For Linux Users (Automated Setup)

The project includes an installation script (`install.sh`) that automates the setup process on Linux systems. The script:

1. Clone the repository:
```bash
git clone 
cd verivox-task
```

2. Make the installation script executable:
```bash
chmod +x install.sh
```

3. Run the installation script:
```bash
./install.sh
```

### Manual Installation (All Platforms)

1. Clone the repository:
```bash
git clone 
cd verivox-task
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   └── tariff.service.ts
│   │   └── interfaces/
│   │       └── tariff.ts
│   ├── tariffs/
│       ├── tariffs.component.ts
│       ├── tariffs.component.html
│       ├── tariffs.component.scss
│       ├── tariffs.component.spec.ts
│       └── tariff-card/
│           ├── tariff-card.component.ts
│           ├── tariff-card.component.html
│           └── tariff-card.component.scss
│           └── tariff-card.component.spec.ts
└── assets/
    └── mock-data/
        └── tariffs.json
```

## Development

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## About Tariffs

The application displays internet tariffs with the following information:
- Tariff name
- Price (formatted as XXX,XX €)
- Download speed
- Upload speed
- Features/Benefits

