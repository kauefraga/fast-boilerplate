import { prompt } from 'enquirer';
import { Git } from 'git-interface';

export async function main() {
  const response = await prompt({
    type: 'select',
    name: 'boilerplate',
    message: 'Pick a boilerplate',
    choices: ['express-ts-api', 'typed-js-lib'],
  })
    .then((answer) => JSON.stringify(answer));

  const { boilerplate } = JSON.parse(response);

  const boilerplates = new Map();

  boilerplates.set('express-ts-api', 'https://github.com/kauefraga/express-ts-api.git');
  boilerplates.set('typed-js-lib', 'https://github.com/kauefraga/typed-js-lib.git');

  const git = new Git({ dir: __dirname });

  await git.clone(boilerplates.get(boilerplate), boilerplate);
}
