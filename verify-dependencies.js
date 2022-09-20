const { exec } = require('child_process');

(() => {
  const workspace = exec(`echo $(cat package.json | jq -r '.workspaces.packages | join(" ")')`)
  workspace.stdout.on('data', (data) => {
    const dependenciesList = []
    for (const path of data.split(' ').concat('./')) {
      const { devDependencies = {}, dependencies = {} } = require(`${__dirname}${path.replace('./', '/').trim()}/package.json`)
      for (const key in Object.assign({}, devDependencies, dependencies)) {
        if (dependenciesList.find(d => d === key)) {
          console.log('\x1b[31m', `duplicate dependency ${key} keep only`);
          process.exit(1)
        }
        dependenciesList.push(key)
      }
    }
  })
})()