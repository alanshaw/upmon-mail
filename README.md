# upmon-mail [![Build Status](https://travis-ci.org/alanshaw/upmon-mail.svg?branch=master)](https://travis-ci.org/alanshaw/upmon-mail) [![Dependency Status](https://david-dm.org/alanshaw/upmon-mail.svg?style=flat)](https://david-dm.org/alanshaw/upmon-mail) [![Coverage Status](https://img.shields.io/coveralls/alanshaw/upmon-mail/master.svg?style=flat)](https://coveralls.io/r/alanshaw/upmon-mail)

Send an email message when [upmon](https://github.com/alanshaw/upmon) detects a failure.

## Getting started

1. `npm install -g upmon upmon-mail`
2. Create a new `$HOME/.upmonrc` file and add config:

    ```js
    {
      "ping": {
        // Time in ms between pings
        "interval": 5000,
        // URL's of services to ping
        "services": ["http://localhost:8000/"]
      },
      "mail": {
        // Email from address
        "from": "upmon@example.org",
        // Email to address(es)
        "to": ["sysadmin@example.org"],
        // Nodemailer transport options
        // http://www.nodemailer.com/
        "transport": { 
          "service": "",
          "auth": {
            "user": "",
            "pass": ""
          } 
        }
      }
    }
    ```

3. `upmon | upmon-mail`