# Serverless SNS SQS offline Example
A [Serverless](https://serverless.com/) application that demonstrate the flow of amazon SQS, SNS and lambda. 

## Install
```sh
$ npm install
$ npm run deploy
```

## Remark
There may be a bug on serverless-webpack that [it isn't work to use webpack.DefinePlugin to declare the environment variable](https://github.com/serverless-heaven/serverless-webpack/issues/274). So, I set the environment variable directly on [webpack config file](webpack.config.js). Do let me know if you have better solution to do that.

## Architecture
<img src="./architecture.png" width="750px" alt="Architecture" />

## License
This software is released under the MIT license. See the [license file](LICENSE) for more details.

