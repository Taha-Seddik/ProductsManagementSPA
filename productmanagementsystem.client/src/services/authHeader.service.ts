import { AppLocalStorageService } from './localStoage';

export const makeAuthHeader = () => {
  const user = AppLocalStorageService.getUserData();
  if (user && user.token) {
    return { 'x-access-token': 'Bearer ' + user.token };
  } else {
    return { 'x-access-token': '' };
  }
};
