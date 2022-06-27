import config from 'config';
import bcrypt from 'bcrypt';

export async function hashString(string: string) {
  const salt = await bcrypt.genSalt(
    Number(config.get<number>('saltWorkFactor'))
  );
  return bcrypt.hashSync(string, salt);
}

export function compareHash(candidateString: string, hash: string) {
  return bcrypt.compare(candidateString, hash).catch(() => false);
}
