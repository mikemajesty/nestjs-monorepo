#### 0.0.2 (2021-11-10)

##### Build System / Dependencies

* **dockerfile:**  fix docker file deploy ([6d862577](https://github.com/mikemajesty/nestjs-monorepo/commit/6d862577aa6aa6b0bfcfe481a7246c45091b2fe1))
* **settings:**  remove test folder ([209ea90d](https://github.com/mikemajesty/nestjs-monorepo/commit/209ea90d35495927b37f7ad14c59fa9061bbf877))
* **docker-compose:**  change container name ([a3351c90](https://github.com/mikemajesty/nestjs-monorepo/commit/a3351c9073417f8f39581645633a1098526310ee))

##### Chores

* **settings:**  add dist exclude ([67455271](https://github.com/mikemajesty/nestjs-monorepo/commit/67455271ed0daab3d7067c4f1b63636572a39245))
* **package:**
  *  add jest dependencies ([495730e6](https://github.com/mikemajesty/nestjs-monorepo/commit/495730e6903af7b991e966b2622b19000f4b464e))
  *  remove shared build and add module build ([6925a40c](https://github.com/mikemajesty/nestjs-monorepo/commit/6925a40c26b87baa063bc2905f8373999102ca99))
  *  organize scripts ([70f00648](https://github.com/mikemajesty/nestjs-monorepo/commit/70f00648074dacd36c4f56201e32341dfd76edcc))
* **main:**
  *  add dockerignore ([e06d09a1](https://github.com/mikemajesty/nestjs-monorepo/commit/e06d09a1748d13b63f0e13b158ca2228370052f9))
  *  change log context ([673dd0aa](https://github.com/mikemajesty/nestjs-monorepo/commit/673dd0aa87599606c5489e1b79a5f78290eabb0c))
* **libs:**
  *  add vscode settings ([b3b59c84](https://github.com/mikemajesty/nestjs-monorepo/commit/b3b59c847cdc22ec3ef1e99c52f746e0b974ec64))
  *  add tsconfig ([965b8e9c](https://github.com/mikemajesty/nestjs-monorepo/commit/965b8e9c75da0e0a151f37740fe787d8132c10a3))
  *  add package.json ([b6ecd3fb](https://github.com/mikemajesty/nestjs-monorepo/commit/b6ecd3fbb9d3b005fc9665607e392b7f218b2341))
  *  add dockerignore ([7ae86565](https://github.com/mikemajesty/nestjs-monorepo/commit/7ae86565bb0db87166d04940b746a760dd2fb856))
* **tsconfig:**  add lib module path ([3ccf544d](https://github.com/mikemajesty/nestjs-monorepo/commit/3ccf544d7f884f5d13baaea8c17c81c62c041c85))
* **monorepo:**  add lib module config ([bc94da49](https://github.com/mikemajesty/nestjs-monorepo/commit/bc94da49da4208c51d631be92e83355c735bbb3f))
* **gitignore:**  add node_modules to subprojects ([fb7a4ad6](https://github.com/mikemajesty/nestjs-monorepo/commit/fb7a4ad6f30247d754e38b06e3ee916fddd46015))
* **shared:**  fix name on health route ([5295ead6](https://github.com/mikemajesty/nestjs-monorepo/commit/5295ead6bd29d5a88aadb948ce3ecc183ebe3cef))

##### Documentation Changes

* **readme:**  remove all information ([83d27632](https://github.com/mikemajesty/nestjs-monorepo/commit/83d2763242433dcd61565d3f1dd905279abb8b8a))

##### New Features

* **jest:**  remove jest workspace ([26e8e2d5](https://github.com/mikemajesty/nestjs-monorepo/commit/26e8e2d54bb42eca910be0c5a59da6e0d4e59c3b))
* **main:**  fix libs path ([0d1284ff](https://github.com/mikemajesty/nestjs-monorepo/commit/0d1284ff39be13e757d1369cab582399975939e6))
* **shared:**
  *  remove shared module ([9d87a5d0](https://github.com/mikemajesty/nestjs-monorepo/commit/9d87a5d0198764a3b52c0b94eb90940d948a5dff))
  *  add common module ([05941626](https://github.com/mikemajesty/nestjs-monorepo/commit/05941626b05e4848481c67d1d4cfce70c557fd7a))
* **libs:**  add module libs ([30467c27](https://github.com/mikemajesty/nestjs-monorepo/commit/30467c27e50a0b009a65aa1dfa9ee0f0cba1b797))
* **settings:**  add format on save to main and shared ([7b739ce7](https://github.com/mikemajesty/nestjs-monorepo/commit/7b739ce7fde9f03b2769de207210f1435750ad2b))

##### Bug Fixes

* **main:**  fix shared live update ([9c4d5298](https://github.com/mikemajesty/nestjs-monorepo/commit/9c4d5298122dd6149c054fc17e44343a7f5575f2))

##### Refactors

* **nest-cli:**  add global eslint ([4763217d](https://github.com/mikemajesty/nestjs-monorepo/commit/4763217da69de2a508608431c7b88ae14463ccbe))
* **main:**  refactor libs path ([e758827f](https://github.com/mikemajesty/nestjs-monorepo/commit/e758827f6561f0b9663fbff09162bd082e35a28a))
* **libs:**
  *  change class error name ([7e4fc1d0](https://github.com/mikemajesty/nestjs-monorepo/commit/7e4fc1d0a1ec8857dc2b7fe3c89e9e61ae241ceb))
  *  remove unnecessary module import ([16856d4d](https://github.com/mikemajesty/nestjs-monorepo/commit/16856d4d76d95b8108fdae96e3b96a680413c90e))
* **monorepo:**  refactor modules path ([57b36cdb](https://github.com/mikemajesty/nestjs-monorepo/commit/57b36cdb2b54c4fb50edc68e0fdba19200631213))

##### Tests

* **health:**  fix service test ([37b2e56b](https://github.com/mikemajesty/nestjs-monorepo/commit/37b2e56b8e2aa7dd5e5ebe05da39b25300f2b9d4))

#### 0.0.1 (2021-11-07)

##### Build System / Dependencies

* **tsconfig:**  fix tsconfig names ([7e428a6c](https://github.com/mikemajesty/nestjs-monorepo/commit/7e428a6c7445c1bd5518a2c24478f3a9fc3a6d33))
* **devops:**  add tag production create ([c70901e8](https://github.com/mikemajesty/nestjs-monorepo/commit/c70901e86fd29ee652cc7e832f16dc876119effe))

##### Chores

* **config.jest:**  add package ([4c8bc5bf](https://github.com/mikemajesty/nestjs-monorepo/commit/4c8bc5bf6c7eb06f7e0ae57c85ae74e3e57f7358))
* **settings:**  change path ([ce647ef5](https://github.com/mikemajesty/nestjs-monorepo/commit/ce647ef5a5c983fee0dd3c3047fb0cd2f918adc6))
* **package:**
  *  change license order ([fee7ca97](https://github.com/mikemajesty/nestjs-monorepo/commit/fee7ca97f5f181d4e48d6311aae5aba2032bcf83))
  *  change monorepo name projects ([bb9b0b0c](https://github.com/mikemajesty/nestjs-monorepo/commit/bb9b0b0cc1dfe41dcabd4554837fbed218817ed0))
  *  add repository information ([f5d14160](https://github.com/mikemajesty/nestjs-monorepo/commit/f5d141609176497bdce7bfe721c7a4c73aaf7797))
  *  add project author ([394cb75b](https://github.com/mikemajesty/nestjs-monorepo/commit/394cb75bcc874c544f17b285cc386718f31ac4fe))
* **jest.config:**  add jest config file ([85afb683](https://github.com/mikemajesty/nestjs-monorepo/commit/85afb6837ffa85f298a8d217976d7331eac55e38))

##### New Features

* **settings:**  remove bin exclude property ([1d6015cd](https://github.com/mikemajesty/nestjs-monorepo/commit/1d6015cdf13158d7e2f442b0944f165c6381a81a))
* **swagger:**  remove swaggger log ([87b4aacb](https://github.com/mikemajesty/nestjs-monorepo/commit/87b4aacba5b94e2e82bf4d0669fbcaea809634d4))
* **eslint:**
  *  add simple-import-sort ([a375e8aa](https://github.com/mikemajesty/nestjs-monorepo/commit/a375e8aaff98bf024ae930ebcaeaaf6ffa9c7b03))
  *  add global eslint ([dfee4b40](https://github.com/mikemajesty/nestjs-monorepo/commit/dfee4b40364ceff06245dd5a1283131d284d2b8b))
* **main.health:**  add health modules on main-api ([e5c943d1](https://github.com/mikemajesty/nestjs-monorepo/commit/e5c943d13f5c13b2d4d10fd8228e5b2193c08b71))
* **shared:**
  *  change project structure ([f9798d66](https://github.com/mikemajesty/nestjs-monorepo/commit/f9798d6687e3881d1023c96decae411fd35170d8))
  *  add global filters and interceptors ([04e9e74e](https://github.com/mikemajesty/nestjs-monorepo/commit/04e9e74e35441dfe7640435181c4d67a86a590de))
  *  add project envs ([c24fe3ab](https://github.com/mikemajesty/nestjs-monorepo/commit/c24fe3ab0866226965d0de36d1f14da495a1b00a))
* **setting:**  improve vscode setting ([d80322bc](https://github.com/mikemajesty/nestjs-monorepo/commit/d80322bca6f07fd7478232e0d1e3a2f6a80ebd3b))
* **package:**  change project name ([418198dd](https://github.com/mikemajesty/nestjs-monorepo/commit/418198dd07a30c022ade84f721157bd687d476c1))
* **docker:**  add docker build ([7637365d](https://github.com/mikemajesty/nestjs-monorepo/commit/7637365d670b44085117f93fe05e156d4dca90bc))
* **main:**  add logs ([40c710b2](https://github.com/mikemajesty/nestjs-monorepo/commit/40c710b2eb302e7e58a7c1778790d97a5986cbec))
* **app:**  add project structure ([8a931dd7](https://github.com/mikemajesty/nestjs-monorepo/commit/8a931dd79581c6939bdb4a5598e728780403e548))

##### Bug Fixes

* **husky:**  fix commit lint ([9f7ba37d](https://github.com/mikemajesty/nestjs-monorepo/commit/9f7ba37d7ff74c89cfd0a1cfa063013e7296bb85))

##### Refactors

* **main:**
  *  add modules and tests ([ddeec1d0](https://github.com/mikemajesty/nestjs-monorepo/commit/ddeec1d0fd4fdf8c9dca1c2fbab1c395ff7a04cb))
  *  change app.module name to module ([81d1f61b](https://github.com/mikemajesty/nestjs-monorepo/commit/81d1f61b98978e5b82df511ec2b23a508b9ef5b2))
* **config.jest:**  add config file ([6524e571](https://github.com/mikemajesty/nestjs-monorepo/commit/6524e571b872f3cee71993e39b0b815c7839e9fb))
* **main/shared:**  remove files ([75faa946](https://github.com/mikemajesty/nestjs-monorepo/commit/75faa9469c5542bf3fd661ff89eba1d817a730a2))
* **jest-init:**  change location ([1aa0aa2b](https://github.com/mikemajesty/nestjs-monorepo/commit/1aa0aa2bb9ad4c8d5eb7de496ddde6bc9f703ee2))
* **jest.init:**  remove config folder ([93bf2e04](https://github.com/mikemajesty/nestjs-monorepo/commit/93bf2e04692b5c6f5727e359cf838c7b621d0983))
* **package:**  organize dependencies ([f97ae0aa](https://github.com/mikemajesty/nestjs-monorepo/commit/f97ae0aaf53402d53d38a930b512ef899b2610c3))
* **eslintrc:**  change eslint config path ([7ea9735a](https://github.com/mikemajesty/nestjs-monorepo/commit/7ea9735a4838db197d331219893d8d498d360075))
* **jest.config:**  change extension ([527a6dd0](https://github.com/mikemajesty/nestjs-monorepo/commit/527a6dd06569a583e1f4b7a8f661a3c5e421bc98))
* **jest-e2e:**  add to root ([a4b28987](https://github.com/mikemajesty/nestjs-monorepo/commit/a4b28987cdda4e9125e5d4f35b63e3cf40957211))
* **app.module:**  change name to MainModule ([349ee848](https://github.com/mikemajesty/nestjs-monorepo/commit/349ee84823585dfa76f333b329dc59626d46b28e))

##### Code Style Changes

* **lib.shared:**  change http-status location ([9b8b0778](https://github.com/mikemajesty/nestjs-monorepo/commit/9b8b0778e068836a466916b7d1c3ef0b474b7867))

##### Tests

* **jest.config:**
  *  add coverage exclude file main ([462c97c3](https://github.com/mikemajesty/nestjs-monorepo/commit/462c97c33bd2119a67d33e3120bf2e4f83a083ab))
  *  add jest configuration ([03260024](https://github.com/mikemajesty/nestjs-monorepo/commit/032600245d9d8112acb937661a29e63da7297fda))
* **shared:**  add shared module tests ([7ced0ec1](https://github.com/mikemajesty/nestjs-monorepo/commit/7ced0ec145864c6beb2de6cdf358816f0c530bc0))
* **test:**  add test init ([6aedab5f](https://github.com/mikemajesty/nestjs-monorepo/commit/6aedab5fccbf07e77adbd1dd555bb8274df04dca))

