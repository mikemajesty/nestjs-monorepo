# Istanbul Badges Readme

> Creates README badges from istanbul coverage report

| Statements                                                                               | Branches                                                                             | Functions                                                                              | Lines                                                                          |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| ![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-100%25-brightgreen.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg?style=flat) |

---

## Table of Contents

- [Running example](#running-example)
- [Requirements](#requirements)
- [Installation](#installation)
- [Simple Usage](#simple-usage)
- [Advanced Usage](#advanced-usage-arguments)
- [Usage as a part of your githooks](#usage-as-a-part-of-your-githooks)
- [Usage as a part of your CI](#usage-as-a-part-of-your-ci)
- [Custom badge Styles](#custom-badge-styles)
- [See running examples](#see-running-examples)
- [Contributors](#contributors)
- [License](#license)

## Running example

![Example](./assets/readme-gif.gif)

---

## Requirements

- First, of course, you **must** have a test runner such as Jest and Mocha;
- You **must** have **json-summary** as a **coverageReporter** in your tests configuration;
- For example, if you are using Jest, configuration should either be within `package.json` or inside your jest config file i.e. `jest.config.js` or `jestconfig.json` as written below:

```json
  "coverageReporters": ["json-summary"]
```

- See more in the [examples](./examples/README.md).

---

## Installation

- Install the library in your project as a devDependency:

```bash
  npm i -D istanbul-badges-readme
```

- Add **at least one** of the below coverage hashes in your README file:

  - `![Statements](#statements#)`
  - `![Branches](#branches#)`
  - `![Functions](#functions#)`
  - `![Lines](#lines#)`

- A simple example of all hashes being used in a table fashion markup:

```markdown
| Statements                  | Branches                | Functions                 | Lines             |
| --------------------------- | ----------------------- | ------------------------- | ----------------- |
| ![Statements](#statements#) | ![Branches](#branches#) | ![Functions](#functions#) | ![Lines](#lines#) |
```

---

## Simple Usage

- Simply run it from the CLI as follows:

```bash
  npx istanbul-badges-readme
```

- Or add it to your **package.json** scripts as follows:

```json
"scripts": {
  "make-badges": "istanbul-badges-readme",
}
```

---

## Advanced Usage Arguments

#### Coverage Directory

- Custom coverage directory? Use **--coverageDir** argument:

```bash
  npm run istanbul-badges-readme --coverageDir="./my-custom-coverage-directory"
```

#### Readme Directory

- Custom readme directory? Use **--readmeDir** argument:

```bash
  npm run istanbul-badges-readme --readmeDir="./my-custom-readme-directory"
```

#### Silent

- Want it without logging? Try silent mode with **--silent** argument:

```bash
  npm run istanbul-badges-readme --silent
```

#### Functions and Branches Labels

- You may also create custom labeling for the badges using the corresponding hash and _Label_ e.g. _branchesLabel_ **--branchesLabel='Branches are troublesome!'**:

```bash
  npm run istanbul-badges-readme --functionsLabel='Mis funciones!' --branchesLabel='Branches are troublesome!'
```

#### Badge Style

- You can also change the badge styling, according to _[shields.io's](https://shields.io/)_ own style reference. See more examples [here](#badge-styles).

```bash
  npm run istanbul-badges-readme --style="for-the-badges"
```

#### Badge Logo

- There is an option to use a _logo_ within the badge, as described on _[shields.io's](https://shields.io/)_ own documentation which uses all icons available at _[simple-icons](https://simpleicons.org/)_.

```bash
  npm run istanbul-badges-readme --logo="jest"
```

#### Exit code

- To exit with **1** code on validation errors (eg.: _README doesn't exist_, or _coverage directory doesn't exist_) or on editing errors (eg.: cannot write to README due to lack of permissions). The default exit code is **0**. Set a different one by using **--exitCode** argument.

```bash
  npm run istanbul-badges-readme --exitCode=1
```

---

## Usage as a part of your githooks

- If you want to have this run on the **pre-commit** hook and update the commit in place, just install husky and add the `pre-commit` script to your package.json.

1. Install Husky.

```bash
  npm install -D husky
```

2. Add your **pre-commit** script:

```json
  "husky": {
    "hooks": {
      "pre-commit": "npm run test && istanbul-badges-readme && git add 'README.md'"
    }
  }
```

3. Git Commit and Push. Just use your workflow as usual. If your tests fail, no commit. If they pass, update the README.md and add the file to the commit. Nice!

---

## Usage as a part of your CI

You may want to have peace of mind that contributors have run `istanbul-badges-readme` locally by performing a simple check in your CI.

The `--ci` argument will throw an error, code 0 by default unless [exitCode](#exit-code) is specified, thus not updating anything regarding coverage, if the badges generated do not match what is already in the `README.md`.

You can add this to your **package.json** as follows for exitCode 0:

```json
"scripts": {
  "make-badges": "istanbul-badges-readme",
  "make-badges:ci": "npm run make-badges -- --ci",
}
```

Also if you wish a different exitCode:

```json
"scripts": {
  "make-badges": "istanbul-badges-readme",
  "make-badges:ci": "npm run make-badges -- --ci --exitCode=1",
}
```

This is a useful addition/alternative to the githooks approach for some use cases such as larger codebases, slow computers etc, where it isn't always feasible to run all the tests and produce coverage on each commit.

## Custom Badge Styles

- **DEFAULT STYLE** Square `style='square'`:
  ![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=square)

- Square flat `style='square-flat'`:
  ![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=square-flat)

- Plastic `style='plastic'`:
  ![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=plastic)

- For the badge `style='for-the-badge'`:
  ![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=for-the-badge)

## See running examples

[Examples folder](./examples/README.md)

> ✔️ **Tip**
>
> We use this in our pull request GitHub Action, check out a recent pull request to see it in action!

---

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://olavoparno.github.io"><img src="https://avatars1.githubusercontent.com/u/7513162?v=4?s=70" width="70px;" alt="Olavo Parno"/><br /><sub><b>Olavo Parno</b></sub></a><br /><a href="#ideas-olavoparno" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/the-bugging/istanbul-badges-readme/commits?author=olavoparno" title="Code">💻</a> <a href="https://github.com/the-bugging/istanbul-badges-readme/commits?author=olavoparno" title="Tests">⚠️</a></td>
      <td align="center"><a href="https://github.com/nothingismagick"><img src="https://avatars1.githubusercontent.com/u/35242872?v=4?s=70" width="70px;" alt="nothingismagick"/><br /><sub><b>nothingismagick</b></sub></a><br /><a href="#ideas-nothingismagick" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/the-bugging/istanbul-badges-readme/issues?q=author%3Anothingismagick" title="Bug reports">🐛</a> <a href="#content-nothingismagick" title="Content">🖋</a></td>
      <td align="center"><a href="http://www.fallenclient.co.uk"><img src="https://avatars2.githubusercontent.com/u/326470?v=4?s=70" width="70px;" alt="Dave Fisher"/><br /><sub><b>Dave Fisher</b></sub></a><br /><a href="https://github.com/the-bugging/istanbul-badges-readme/issues?q=author%3Afallenclient" title="Bug reports">🐛</a></td>
      <td align="center"><a href="http://twitter.com/zaggino"><img src="https://avatars1.githubusercontent.com/u/1067319?v=4?s=70" width="70px;" alt="Martin Zagora"/><br /><sub><b>Martin Zagora</b></sub></a><br /><a href="#ideas-zaggino" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/the-bugging/istanbul-badges-readme/issues?q=author%3Azaggino" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/engineervix"><img src="https://avatars3.githubusercontent.com/u/7713776?v=4?s=70" width="70px;" alt="Victor Miti"/><br /><sub><b>Victor Miti</b></sub></a><br /><a href="https://github.com/the-bugging/istanbul-badges-readme/issues?q=author%3Aengineervix" title="Bug reports">🐛</a></td>
      <td align="center"><a href="http://signalwerk.ch"><img src="https://avatars1.githubusercontent.com/u/992878?v=4?s=70" width="70px;" alt="Stefan Huber"/><br /><sub><b>Stefan Huber</b></sub></a><br /><a href="#question-signalwerk" title="Answering Questions">💬</a> <a href="https://github.com/the-bugging/istanbul-badges-readme/commits?author=signalwerk" title="Documentation">📖</a></td>
      <td align="center"><a href="http://www.venturalp.com.br"><img src="https://avatars.githubusercontent.com/u/11214357?v=4?s=70" width="70px;" alt="Guilherme Ventura"/><br /><sub><b>Guilherme Ventura</b></sub></a><br /><a href="#ideas-venturalp" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/the-bugging/istanbul-badges-readme/commits?author=venturalp" title="Code">💻</a> <a href="https://github.com/the-bugging/istanbul-badges-readme/issues?q=author%3Aventuralp" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/mh1622"><img src="https://avatars.githubusercontent.com/u/59019985?v=4?s=70" width="70px;" alt="Matt Hodges"/><br /><sub><b>Matt Hodges</b></sub></a><br /><a href="https://github.com/the-bugging/istanbul-badges-readme/issues?q=author%3Amh1622" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/Tlahey"><img src="https://avatars.githubusercontent.com/u/2856778?v=4?s=70" width="70px;" alt="Antoine Vendeville"/><br /><sub><b>Antoine Vendeville</b></sub></a><br /><a href="https://github.com/the-bugging/istanbul-badges-readme/issues?q=author%3ATlahey" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/dutchenkoOleg"><img src="https://avatars.githubusercontent.com/u/16334642?v=4?s=70" width="70px;" alt="Oleg Dutchenko"/><br /><sub><b>Oleg Dutchenko</b></sub></a><br /><a href="https://github.com/the-bugging/istanbul-badges-readme/issues?q=author%3AdutchenkoOleg" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://creeation.de"><img src="https://avatars.githubusercontent.com/u/3277769?v=4?s=70" width="70px;" alt="Thomas"/><br /><sub><b>Thomas</b></sub></a><br /><a href="#ideas-CREEATION" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://github.com/troypoulter"><img src="https://avatars.githubusercontent.com/u/19419349?v=4?s=70" width="70px;" alt="Troy Poulter"/><br /><sub><b>Troy Poulter</b></sub></a><br /><a href="https://github.com/the-bugging/istanbul-badges-readme/commits?author=troypoulter" title="Code">💻</a> <a href="#ideas-troypoulter" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/the-bugging/istanbul-badges-readme/commits?author=troypoulter" title="Tests">⚠️</a></td>
      <td align="center"><a href="https://github.com/liaoliaots"><img src="https://avatars.githubusercontent.com/u/27341089?v=4?s=70" width="70px;" alt="LiaoLiao"/><br /><sub><b>LiaoLiao</b></sub></a><br /><a href="#ideas-liaoliaots" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://github.com/David-Mimnagh"><img src="https://avatars.githubusercontent.com/u/10092258?v=4?s=70" width="70px;" alt="David Mimnagh"/><br /><sub><b>David Mimnagh</b></sub></a><br /><a href="#ideas-David-Mimnagh" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
    <tr>
      <td align="center"><a href="http://micalevisk.github.io"><img src="https://avatars.githubusercontent.com/u/13461315?v=4?s=70" width="70px;" alt="Micael Levi L. Cavalcante"/><br /><sub><b>Micael Levi L. Cavalcante</b></sub></a><br /><a href="#ideas-micalevisk" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/the-bugging/istanbul-badges-readme/commits?author=micalevisk" title="Code">💻</a> <a href="https://github.com/the-bugging/istanbul-badges-readme/issues?q=author%3Amicalevisk" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/myknbani"><img src="https://avatars.githubusercontent.com/u/5841268?v=4?s=70" width="70px;" alt="Richard Michael Coo"/><br /><sub><b>Richard Michael Coo</b></sub></a><br /><a href="https://github.com/the-bugging/istanbul-badges-readme/issues?q=author%3Amyknbani" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://www.linkedin.com/in/leticiavna/"><img src="https://avatars.githubusercontent.com/u/28829955?v=4?s=70" width="70px;" alt="Letícia Vidal"/><br /><sub><b>Letícia Vidal</b></sub></a><br /><a href="https://github.com/the-bugging/istanbul-badges-readme/issues?q=author%3Aleticiavna" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://canbax.github.io/"><img src="https://avatars.githubusercontent.com/u/8426741?v=4?s=70" width="70px;" alt="Yusuf"/><br /><sub><b>Yusuf</b></sub></a><br /><a href="https://github.com/the-bugging/istanbul-badges-readme/commits?author=canbax" title="Documentation">📖</a></td>
      <td align="center"><a href="https://github.com/supunTE"><img src="https://avatars.githubusercontent.com/u/33794760?v=4?s=70" width="70px;" alt="supunTE"/><br /><sub><b>supunTE</b></sub></a><br /><a href="https://github.com/the-bugging/istanbul-badges-readme/issues/79" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

---

## License

Istanbul Badges Readme is [MIT licensed](./LICENSE).
