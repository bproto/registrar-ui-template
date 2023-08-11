import { getFirstMatch } from '@crtxio/database/composables/pocketbase';

export async function querySignature(url: string, admin: string, password: string, collection: string) {
  const account = getAccount();
  return await getFirstMatch(url, admin, password, collection, `wallet="${account}"`);
}