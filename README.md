

# Bawl #

Bawl is an application that provides ability to manage different(ecological, social, municipal etc.) issues in city. 

​

### Version

1.0.1

​

### Installation

For installing required libs and frameworks execute next commands:

```sh

    git clone git@github.com:Michaluch/Rv011PHP.git -b devLaravel

    curl -sS https://getcomposer.org/installer | php

    cd $PROJECT 

    composer update


```

​

Next step you need to create .env file in root folder of the project.

.env should contain next lines with yours setting:

​

APP_ENV=local
APP_DEBUG=true
APP_KEY=SomeRandomString

DB_HOST=localhost
DB_DATABASE=bawl
DB_USERNAME=admin
DB_PASSWORD=password

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_DRIVER=sync

MAIL_DRIVER=smtp
MAIL_HOST=mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null

​

//vadim add info about logger system

​

#### Fixtures

In case you want to fill tables into database execute next command:

```sh

    php artisan migrate

```

If you  want to fill tables with data into database execute next command:

```sh
	composer dump-autolaod
    php artisan db:seed

```

​

License
----

GNU/GPL
