import { cwd } from 'process';
import { prompt } from 'enquirer';
import c from 'ansi-colors';
import { createSpinner } from 'nanospinner';
import { Git } from 'git-interface';
import { settings } from '../core/settings';

export async function main() {
  const { boilerplate } = await prompt<{ boilerplate: string }>({
    type: 'select',
    name: 'boilerplate',
    message: 'Choose a boilerplate to code with',
    choices: settings.boilerplate_names,
  })
    .catch(() => {
      throw new Error(c.bold.red('Prompt canceled!'));
    });

  const git = new Git({ dir: cwd() });

  const spinner = createSpinner('Cloning...');

  try {
    spinner.start();

    await git.clone(settings.getBoilerplateUrl(boilerplate), boilerplate);
  } catch (err: any) {
    spinner.error({ text: 'Something went wrong when trying to clone.' });
    process.exit(0);
  }

  spinner.success();

  console.log(
    c.green(`Done! You can locate it at ${c.bold.underline(`${cwd()}/${boilerplate}`)}`),
  );
}
