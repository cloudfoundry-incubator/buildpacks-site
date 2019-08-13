# buildpacks

> Buildpack Listing

## Build Setup

``` bash
# Check package.json and install the appropriate version using 
nvm install <version>

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Updating buildpacks
1. Edit the downloader/buildpacks.json file
1. Generate a data file `cd downloader && bundle && bundle exec dl.rb /tmp/buildpack-data.json`
1. Upload to an S3 bucket
1. Update the source code to point to that bucket: `vim src/router/index.js`

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
