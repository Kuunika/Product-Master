# Kuunika - Product Master

![version](https://img.shields.io/github/package-json/v/Kuunika/Product-Master?color=green&style=for-the-badge)

[TOC]

## Background

....



## Installation on Local Machine

### Dependencies

- [NodeJS > v10.15.0](https://nodejs.org/en/download/)



### Setup

This project uses NestJs v7.0.0, click the following link to thier respective documentation for more information on [NestJs](https://docs.nestjs.com/).



### Installation

#### Step 1: Clone Repo

Clone this repository into your local directory, Use the command below:

```bash
# Clone project to local machine
git clone https://github.com/Kuunika/Product-Master.git
# Navigation into directory
cd Product-Master
```

#### Step 2: Install Dependencies

In the root directory of the project run the following command

```bash
#Installing all dependencies
npm install
```

#### Step 3: Edit .env File

In the root directory there exist a file named *'.env.example'* create a copy of this file, rename the copy to *'.env'* and open it to edit the contents.

```bash
OCL_BASE_URL= # Add the URL to Your OCL API Org Repository
OCL_MASTER_REPO= # Add source that maps to all other desired systems
OCL_API_TOKEN= # Add your OCL API Key
```

#### Step 4: Run Test

```bash
npm run test:e2e
```

#### Step 5: Running Application

```bash
npm run start
```



## Docker Installation

#### Step 1: Clone Repo

Clone this repository into your local directory, Use the command below:

```bash
# Clone project to local machine
git clone https://github.com/Kuunika/Product-Master.git
# Navigation into directory
cd Product-Master
```

#### Step 2: Install Dependencies

In the root directory of the project run the following command

```bash
#Installing all dependencies
npm install
```

#### Step 3: Edit .env File

In the root directory there exist a file named *'.env.example'* create a copy of this file, rename the copy to *'.env'* and open it to edit the contents.

```bash
OCL_BASE_URL= # Add the URL to Your OCL API Org Repository
OCL_MASTER_REPO= # Add source that maps to all other desired systems
OCL_API_TOKEN= # Add your OCL API Key
```

#### Step 4: Run Test

```bash
npm run test:e2e
```

#### Step 5: Create Dist Build for Project

```bash
npm run build
```

#### Step 6: Build Docker Images

```bash
docker image build -t product-master .
```

#### Step 7: Creating Docker Container

From withing the same directory run the following command.

```bash
docker run -d -p 3000:3000 --env-file ./.env product-master
```

