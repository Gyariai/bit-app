import { createContext } from 'react';

import { AppConfig, UserSession } from '@stacks/auth';



export const defaultState = () => {
  const appConfig = new AppConfig(['store_write'], document.location.href);
  const userSession = new UserSession({ appConfig });

  if (userSession.isUserSignedIn()) {
    return {
      userData: userSession.loadUserData(),
    };
  }
  return { userData: null };
};

export const AppContext = createContext(defaultState());