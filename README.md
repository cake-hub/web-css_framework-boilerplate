# CAKE web css-framework boilerplate

This is a simple bolierplate / starter kit for using CAKEs css-framework. This repository is meant only for example purposes.
If you are going to start a new project utilizing our css-framework you can simply fork this repository. Otherwise you could also use this as inspiration and extend your existing or new project with the required configuration from this repository.

There are two ways of starting up this project:

* Docker
* nodejs + npm

## Using Docker

### Preconditions

#### Docker

You need [docker](https://www.docker.com/) installed on your device.

#### Envirement variables

Please use a copy of the `.env-example` file in the root folder and rename it to `.env`.

#### Check your network

The easiest way is, to not be in a restricted network behind a proxy.
Otherwise, be sure git/npm and docker can connect to the world wide web.

If you need to set a proxy, we have something for you:
Please use a copy of the `.npmrc-docker` file in the root folder and rename it to `.npmrc`.
Now you can set up your proxy in the `.env` file.

```toml
PROXY_URL=http://PROXY-URL.GOES:HERE/
# PROXY_URL=null
```

If you want it more direkt, you can also use the `.npmrc-proxy` as a template, but we recommand to use one configuration file in the end.

### Start up (docker)

Navigate to the unpacked project folder via your console (the starting folder with the `Dockerfile` file).
To startup the docker, you only need to execute the following command:

    docker-compose up

*This might take some time because all dependencies will be automatically downloaded and installed.*

### Build distribution files (docker)

To build the distribution files, you have to log into your docker container with:

    docker-compose exec cake_boilerplate sh

Now you are connected to the shell of your docker container and are able to run commands in the machine itself.
Now navigate to the `var/www/html` folder, where your project files are located.
To build the distribution files into the folder `./dist` run:

    npm run build

## Using nodejs + npm

### Preconditions

#### Nodejs

You need version 10 of [nodejs](https://nodejs.org/en/) with it's version of npm.
If you have another version of nodejs installed we do not guarantee that our framework does work, but it could also work with nodejs versions above 10.

#### Check your network

The easierst way is, to not be in a restricted network behind a proxy.
Otherwise, be sure git/npm and docker can connect to the world wide web.

If you need to set a proxy, we have something for you:
Please use a copy of the `.npmrc-proxy` file in the root folder and rename it to `.npmrc`.
Now you can set up your proxy in the `.npmrc` file.

```toml
proxy=http://PROXY-URL.GOES:HERE/
https-proxy=http://PROXY-URL.GOES:HERE/
```

### Start up (nodejs)

Before you can start the development server you have to install all required dependencies executing:

    npm install

Afterwards you can run:

    npm start

to start development. This command will watch your changes and update and compile all changed files automatically.

### Build distribution files (nodejs)

To build the distribution files, you only have to run:

    npm run build

This will build the distribution files into the folder `./dist`.

## Development server

The development server listens on port `5000` so you can open the preview by opening <http://localhost:5000> in your favourite browser.

The server is also configurated to mount the `./dist` folder in the `./static` folder. The `./dist` content is directly referancable in `/static`: `./dist/assets/images/icon__sprite.svg` is available in `./static/assets/images/icon__sprite.svg`.

## icon__sprite.svg

We are merging all icons into one file in our css-framework, so we did here too. Choose the company theme you need in the webpack.config.js in the `myTheme` constant (To find near the start of the file.). If you need more icons in your sprite, add them to the `./src/assets/icons/` folder and they will be included. The file names are used as HTML ids, so they should not have underscores (`_`), for example. If you don't want the icon pack from the css-framework theme, set the `myTheme` constant to an empty string.

## License

This repository is released under the Microsoft Reference Source License (Ms-RSL). More details about our license can be found at [CAKE Ms-RSL](LICENSE).

## Contributing

This repository get's actively maintained by the CAKE team. If you have any problems, feature requests or you find any bug, please [contact us](cake@lidl.com)! We are very happy about any feedback and we are highly motivated to improve this project with your help!