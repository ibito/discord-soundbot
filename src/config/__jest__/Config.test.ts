import Config from '../Config';

jest.mock('fs');
const randomString = (length: number) =>
  Math.random()
    .toString(36)
    .substring(length);

describe('Default config', () => {
  const testedConfig = new Config();

  test('Default clientID and token are empty', () => {
    expect(testedConfig.clientId).toEqual('');
    expect(testedConfig.token).toEqual('');
  });

  test('Default language is English', () => {
    expect(testedConfig.language).toEqual('en');
  });

  test('Default command prefix is !', () => {
    expect(testedConfig.prefix).toEqual('!');
  });

  test('Default whitelisted extensions are popular audio files', () => {
    expect(testedConfig.acceptedExtensions).toEqual([
      '.wav',
      '.mp3',
      '.aac',
      '.flac',
      '.m4a',
      '.webm',
      '.ogg'
    ]);
  });

  test('Default maximum filesize is ', () => {
    expect(testedConfig.maximumFileSize).toEqual(1000000);
  });

  test('Default setting to delete messages is false', () => {
    expect(testedConfig.deleteMessages).toEqual(false);
  });

  test('Default setting to stay in the channel is false', () => {
    expect(testedConfig.stayInChannel).toEqual(false);
  });

  test('Default setting to deafen the bot is false', () => {
    expect(testedConfig.deafen).toEqual(false);
  });

  test('Default game is set to sounds', () => {
    expect(testedConfig.game).toEqual('sounds');
  });
});

describe('Setting config from Environment Variables', () => {
  const OLD_ENVIRONMENT_VARIABLES = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENVIRONMENT_VARIABLES };
  });

  afterEach(() => {
    process.env = OLD_ENVIRONMENT_VARIABLES;
  });

  test('You can overwrite any string value from the environment', () => {
    process.env.CLIENT_ID = randomString(20);
    process.env.TOKEN = randomString(20);
    process.env.LANGUAGE = randomString(2);
    process.env.PREFIX = randomString(1);
    process.env.GAME = randomString(20);

    const testedConfig = new Config();

    expect(testedConfig.clientId).toEqual(process.env.CLIENT_ID);
    expect(testedConfig.token).toEqual(process.env.TOKEN);
    expect(testedConfig.language).toEqual(process.env.LANGUAGE);
    expect(testedConfig.prefix).toEqual(process.env.PREFIX);
    expect(testedConfig.game).toEqual(process.env.GAME);
  });

  test('You can set boolean config values to `true` from the environment', () => {
    process.env.DELETE_MESSAGES = 'tRuE';
    process.env.STAY_IN_CHANNEL = 'TruE';
    process.env.DEAFEN = 'TRUE';

    const testedConfig = new Config();

    expect(testedConfig.deleteMessages).toBe(true);
    expect(testedConfig.stayInChannel).toBe(true);
    expect(testedConfig.deafen).toBe(true);
  });

  test('You can set boolean config values to `false` from the environment', () => {
    process.env.DELETE_MESSAGES = 'false';
    process.env.STAY_IN_CHANNEL = 'neen';
    process.env.DEAFEN = 'anything else than true';

    const testedConfig = new Config();

    expect(testedConfig.deleteMessages).toBe(false);
    expect(testedConfig.stayInChannel).toBe(false);
    expect(testedConfig.deafen).toBe(false);
  });

  test('You can set array config values by using comma seperation', () => {
    process.env.ACCEPTED_EXTENSIONS = '.mp3,.ogg,.wav,.mp4,.flac';

    const testedConfig = new Config();

    expect(testedConfig.acceptedExtensions).toEqual(['.mp3', '.ogg', '.wav', '.mp4', '.flac']);
  });
});