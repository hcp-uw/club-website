<div align="center">

<img src="https://firebasestorage.googleapis.com/v0/b/hcp-uw.appspot.com/o/Logos%2Fclubwebsite.jpg?alt=media&token=c99bd945-8ba0-440f-bbd1-d02ba98b82a4" width="200">

# Husky Coding Project Official Website

The first iteration of [the Husky Coding Project Official Website](https://hcp-uw.web.app/home) built with [React](https://reactjs.org/) leveraging [Material UI as our components library](https://mui.com/). Hosted with [Firebase](https://firebase.google.com/).

<a href="https://github.com/hcp-uw/club-website"><img alt="Latest Release" src="https://img.shields.io/badge/latest-v1.0.0-brightgreen"></a>
<a href="https://hcp-uw.web.app/home"><img alt="Successful Production" src="https://img.shields.io/badge/production-success-brightgreen"></a>

</div>

## 🛠 Installation & Set Up 

1) Install Yarn
```sh
npm install --global yarn
```
2) Clone the website locally into `${HOME}`
```sh
git clone https://github.com/hcp-uw/club-website.git
```
3) Go to `${HOME}/club-website/.`
```sh
cd {HOME}/club-website/
```
4) Install all dependencies using `yarn install`
```sh
yarn install
```
<!-- 5) Run the application using `yarn start`
```sh
yarn start
``` -->
5) Go to club-website/src/back-end/
```sh
cd club-website/src/back-end/
```
6) Install back-end dependencies
```sh
npm install
```

## Running the App Locally 

```sh
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

```sh
yarn test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```sh
yarn build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Linter

```sh
yarn lint
# or
npm run lint
```

To apply fixes:

```shell
yarn lint --apply
# or
npm run lint -- --apply
```

To apply suggested fixes:

```shell
yarn lint --apply-suggested
# or
npm run lint -- --apply-suggested
```

### Formatter

```sh
yarn fmt
# or
npm run fmt
```

For more information about Linter and Formatter, please visit https://docs.rome.tools/.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## How to publish site

https://github.com/hcp-uw/club-website/blob/main/.github/workflows/publish.yml

```console
$ git tag v2.0.0
$ git push origin v2.0.0
```

### If you fail to deploy the site

Run the following commands after you fix the cause of failure:

```console
# delete tag
$ git tag -d v2.0.0
$ git push origin :v2.0.0

# create a new tag
$ git tag v2.0.0
$ git push origin v2.0.0
```

## This project exists thanks to all our contributors ❤️

<a href="https://github.com/hcp-uw/club-website/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=hcp-uw/club-website" />
</a>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
