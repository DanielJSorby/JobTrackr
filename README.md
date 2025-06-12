# JobTrackr

## Table Of Content

1. [Introduction](#introduction)
2. [How to self host Jobtrackr](#how-to-self-host-jobtrackr)

## Introduction

Jobtrackr is a website where you can have all your job applications in one place. This is primarily an self hosted application, but you can also use our website at [domain.com](https://domain.com)

## How to self host Jobtrackr

### TOC

1. [Install MariaDB](#install-mariadb)
2. [Set up the database](#set-up-the-database)
3. [Set up the website](#set-up-the-website)
4. [Setting up the Enviroment variables](#setting-up-the-enviroment-variables)

### Install MariaDB

#### Linux (Debian/Ubuntu)

```bash
sudo apt update

sudo apt install mariadb-server

sudo systemctl start mariadb

sudo systemctl status mariadb

sudo mysql_secure_installation
```

#### MacOS

Install homebrew if you don't have it already

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Install MariaDB

```
brew install mariadb

brew services start mariadb

mariadb --version

mariadb -u root -p
```

### Set up the database

First create the database using:

```SQL
CREATE DATABASE Jobtrackr;
```

This will give this response (time is not relevant):

```SQL
Query OK, 1 row affected (0,007 sec)
```

Then we will have to "Go Into" The database using:

```SQL
USE Jobtrackr;
```

And this will give this response:

```SQL
Database changed
```

Then, we will have to create the User Table using:

```SQL
CREATE TABLE users (
    id VARCHAR(36) NOT NULL,
    name VARCHAR(100),
    email VARCHAR(254) NOT NULL,
    password_hash TEXT,
    PRIMARY KEY (id),
    UNIQUE KEY (email)
);
```

You can see if this worked by using:

```SQL
DESCRIBE users;
```

This command will give you:

```SQL
+---------------+--------------+------+-----+---------+-------+
| Field         | Type         | Null | Key | Default | Extra |
+---------------+--------------+------+-----+---------+-------+
| id            | varchar(36)  | NO   | PRI | NULL    |       |
| name          | varchar(100) | YES  |     | NULL    |       |
| email         | varchar(254) | NO   | UNI | NULL    |       |
| password_hash | text         | YES  |     | NULL    |       |
+---------------+--------------+------+-----+---------+-------+
```

So now, we'll have to do the same for the Jobs Table:

```SQL
CREATE TABLE jobs (
    id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    role_title VARCHAR(100) NOT NULL,
    application_date DATE,
    description TEXT,
    location VARCHAR(100),
    status VARCHAR(100) NOT NULL,
    notes TEXT,
    timeline LONGTEXT,
    job_link TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

And then, by using the command:

```SQL
DESCRIBE jobs;
```

You will see:

```SQL
+------------------+--------------+------+-----+---------+-------+
| Field            | Type         | Null | Key | Default | Extra |
+------------------+--------------+------+-----+---------+-------+
| id               | varchar(36)  | NO   | PRI | NULL    |       |
| user_id          | varchar(36)  | NO   | MUL | NULL    |       |
| company_name     | varchar(100) | NO   |     | NULL    |       |
| role_title       | varchar(100) | NO   |     | NULL    |       |
| application_date | date         | YES  |     | NULL    |       |
| description      | text         | YES  |     | NULL    |       |
| location         | varchar(100) | YES  |     | NULL    |       |
| status           | varchar(100) | NO   |     | NULL    |       |
| notes            | text         | YES  |     | NULL    |       |
| timeline         | longtext     | YES  |     | NULL    |       |
| job_link         | text         | YES  |     | NULL    |       |
+------------------+--------------+------+-----+---------+-------+
```

If something is not working, check if you have forgotten a Semicolon ; and if that wont work, do some research.

Now is the database structure finally set up

### Set up the website.

To set up the website, you first have to clone this repository using one of theese commands, or using Github Desktop or downloading a zip file [here](https://github.com/DanielJSorby/JobTrackr/archive/refs/heads/main.zip).

```BASH
gh repo clone DanielJSorby/JobTrackr

git@github.com:DanielJSorby/JobTrackr.git

https://github.com/DanielJSorby/JobTrackr.git
```

When you're inside the folder of the repository, you'll have to change directory into the JobTrackr folder using:

```Bash
cd JobTrackr
```

Then you'll have to install neccesary requirements using

```bash
npm install
```

Remember you need to have Node install. You can install it from their website at [nodejs.org/en/download](https://nodejs.org/en/download)

The next thing you need to do, is to start the website using:

```Bash
npm run dev
```

Then you will se the website up and running at the given ip adress. If you dont see it, press "o" and enter in the terminal to automatically open the website

### Setting up the Enviroment variables

To connect to the database, you'll need to set up the enviroment variables that makes it possible. To do this, you'll have to create a file called ".env" in the JobTrackr folder.

Inside of this folder you need to have this structure:

```env
DB_HOST={Ip adress of the database (localhost if it's on your own machine)}
DB_USER={The user of the database. If you don't know, put "root"}
DB_PASSWORD={The password you set for your database}
DB_NAME={Name of the database. If you followed this tutorial, it's "Jobtrackr"}
```
