class Settings {
  private boilerplates: Map<string, string>;

  constructor() {
    this.boilerplates = new Map<string, string>();
    this.boilerplates.set('express-ts-api', 'https://github.com/kauefraga/express-ts-api.git');
    this.boilerplates.set('typed-js-lib', 'https://github.com/kauefraga/typed-js-lib.git');
  }

  get boilerplate_names(): string[] {
    const names: string[] = [];

    this.boilerplates.forEach((_, key) => {
      names.push(key);
    });

    return names;
  }

  getBoilerplateUrl(key: string): string {
    return String(this.boilerplates.get(key));
  }
}

export const settings = new Settings();
