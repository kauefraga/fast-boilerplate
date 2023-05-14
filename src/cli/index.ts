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
    .then((answer) => JSON.stringify(answer))
    .catch(() => {
      throw new Error(c.bold.red('Prompt canceled!'));
    });

  const { boilerplate } = JSON.parse(response);

  const git = new Git({ dir: process.cwd() });

  const spinner = createSpinner('Cloning...');

  try {
    spinner.start();

    await git.clone(settings.getBoilerplateUrl(boilerplate), boilerplate);
  } catch (err: any) {
    spinner.error({ text: 'Something went wrong.' });
    process.exit(0);
  }

  spinner.success();

  console.log(
    c.green(`Done! You can locate it at ${c.bold.underline(`${process.cwd()}/${boilerplate}`)}`),
  );
}
