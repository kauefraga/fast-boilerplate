import { prompt } from 'enquirer';
import { Git } from 'git-interface';
import { settings } from '../core/settings';

export async function main() {
  const response = await prompt({
    type: 'select',
    name: 'boilerplate',
    message: 'Pick a boilerplate',
    choices: settings.boilerplate_names,
  })
    .then((answer) => JSON.stringify(answer));

  const { boilerplate } = JSON.parse(response);

  const git = new Git({ dir: __dirname });

  await git.clone(settings.getBoilerplateUrl(boilerplate), boilerplate);
}
