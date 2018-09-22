import ConfigReader from './CrossConfigReader';

describe('ConfigReader', () => {
  it('Should match snapshot', () => {
    expect(ConfigReader).toMatchSnapshot();
  });

  it('`GetEnv()` should return instance', () => {
    const config = ConfigReader.GetEnv();
    expect(config).toBeDefined();
  });

  it('Env config should match snapshot', () => {
    const config = ConfigReader.GetEnv();
    expect(config).toMatchSnapshot();
  });

  it('Config should have APP_NAME', () => {
    const config = ConfigReader.GetEnv();
    expect(config.APP_NAME).toBeDefined();
  });
});
