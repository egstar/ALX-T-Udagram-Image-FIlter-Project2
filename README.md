# :rocket: ALX-T-Udagram-Image-Filter-Project2

Simple filter API used to resize and apply grayscale filter on images, made by Udacity's community for Cloud compute advanced track.

## :book: Setup and installation

### :point_right: Project prerequesties:
  - Node.js version 14+ ![Node version](https://img.shields.io/badge/Node.js%20-%20v%2014+-greensvg)

### :point_right: Project dependencies

|# | Name | Version | Type | #| Name | Version | Type |
|:---:|:---:| :--- | :--- | :---: |:---:| :--- | :--- |
|**1** | @types/bluebird | ^3.5.33 | Dev |**7** | bestzip | ^2.2.1 | Dep |
|**2**| @types/express | ^4.17.0 | Dev | **8** | dotenv | ^16.0.3 | Dep |
|**3**| @types/node | ^11.13.17 | Dev | **9** | express | ^4.17.1 | Dep |
|**4**| ts-node-dev | ^1.0.0-pre.40 | Dev | **10** | jimp | ^0.16.1 | Dep |
|**5**| tslint | ^5.18.0 | Dev | **11** | lodash | ^4.17.15 | Dep |
|**6**| typescript | ^4.9.4 | Dev | **12**  | rimraf | ^3.0.2 | Dep |

### :point_right: Project Installation

- to install the project you need to get a copy of files through downloading them or using git commands
```s
git clone <REPO>
```
- next step after downloading you need to install it using the command:
```s
npm i
```
- for development mode run the command:
```s
npm run dev
```
> For Linux users or Windows with linux commands 

- to run at production you need to build server using command:
```s
npm run build
```
> For Windwos/Linux users

- to run at production you need to build server using command:
```s
npm run build:win
```

### :point_right: Server's End-Points & Usage

- **"/"** Main end point which shows how to use the API
- **"/filteredimage"** API endpoint which runs a request using the query `?image_url` with the required image link to apply filters

e.g:
```s
/filteredimage?image_url=<IMG_URL>
```
---
## :bulb: Deployment 

### AWS Deployment pre-requesties
- You need to a valid access to AWS account with root user or using IAM roles
- You need to install the AWS CLI ![AWS CLI](https://img.shields.io/badge/AWS%20CLI%20-%20Installed-greensvg) using the [AWS CLI guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- You need to install the EB CLI ![EB CLI](https://img.shields.io/badge/EB%20CLI%20-%20Installed-greensvg) using the [AWS EB CLI guide](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)

### Deployment process steps
- You need firstly to configure your AWS cli using your credentials by running the command
```s
aws configure
```
then follow steps on screen using your IAM Role with programatic access

- to make sure that you have done the AWS configuration, run this command on your PC `%userprofile%/.aws/config` and use NOTEPAD as a text editor to read it 
it must appear like this
```conf
[profile default]
aws_access_key_id = xxxxxxxxxxxxxxxxx
aws_secret_access_key = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
region = us-east-1
output = json
[default]
```
- create .npmrc file using the command `touch .npnrc` to allow eb node_modules installation permissions, and save it after adding this text in it
```json
unsafe-perm=true
```
- prepare package.json with the deploy and build scripts like that
```json
{
  "clean": "rm -rf www/ || true",
  "build": "npm i && npm run clean && tsc && cd www && mkdir tmp && cd .. && cp -R .elasticbeanstalk www/.elasticbeanstalk && cp .npmrc www/.npmrc && cp package.json www/package.json && cd www && zip -r Archive.zip . && cd ..",
  "deploy": "npm run build && eb list && eb use udagram-api && eb deploy && eb setenv PORT=8080",
}
```
- next you need to run the following commands into the main folder of the project to start deployment process
  - first run the Elastic Beanstalk initializing command to create the eb folder: `eb init <APP_NAME>`
  - after initializing the eb, go to file `./.elasticbeanstalk/config.yml` and add the deployment artifact zip to the end like that
  ```yml
  deploy:
    artifact: www/Archive.zip
  ```
  also set the AWS profile like that
  ```yml
  profile: default
  ```
  - now create your environment using the command `eb create --sample <env_name>`

  all done, you can start deployment process 

  > for Linux OS Only
  ```s
  npm run deploy
  ```
  > for Windows/Linux OS
  ```s
  npm run deploy:win
  ```

### :link: Project Link & Screenshot :camera:

- :link: Running on : [AWS S3 Link](http://udagram-api.eba-wsgpqwxv.us-east-1.elasticbeanstalk.com/)


- :camera: EB Health : Using cli running command -> `eb health` ![EB Health](https://img.shields.io/badge/EB%20Health-%20OK-greensvg)
![image](https://user-images.githubusercontent.com/76433966/207643700-f5620bc5-1392-48cb-9e90-aba89060b8fa.png)
