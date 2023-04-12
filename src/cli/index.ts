import { prompt } from 'enquirer';
import c from 'ansi-colors';
import { createSpinner } from 'nanospinner';
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

  const spinner = createSpinner('Cloning...');

  try {
    spinner.start();

    await git.clone(settings.getBoilerplateUrl(boilerplate), boilerplate);
  } catch (err: any) {
    console.error(c.red(err.message));
  }

  spinner.success();

  console.log(
    c.green(`Done! You can locate it at ${c.bold.underline(`${__dirname}/${boilerplate}`)}`),
  );
}
