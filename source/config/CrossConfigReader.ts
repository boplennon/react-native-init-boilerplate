import Config from 'react-native-config';
import { IEnv } from '../IEnv';

/**
 * Reads app configuration files
 */
namespace CrossConfigReader {
  /**
   * Reads `.env` and returns a typed object using `IEnv.ts`
   */
  export const GetEnv = () => Config as IEnv;
}

export default CrossConfigReader;
