import React, { useCallback, useEffect, useMemo } from 'react';

import { defaultState } from './context';
import { AppConfig, UserSession } from '@stacks/auth';

export function useAuth() {
  const [state, setState] = React.useState(defaultState());
  const [authResponse, setAuthResponse] = React.useState('');
  const [appPrivateKey, setAppPrivateKey] = React.useState('');

  const appConfig = useMemo(
    () => new AppConfig(['store_write', 'publish_data'], document.location.href),
    []
  );
  const userSession = useMemo(() => new UserSession({ appConfig }), [appConfig]);

  const handleSignOut = useCallback(() => {
    userSession.signUserOut();
    setState({ userData: null });
  }, [userSession]);

  const handleRedirectAuth = useCallback(async () => {
    if (userSession.isSignInPending()) {
      const userData = await userSession.handlePendingSignIn();
      setState({ userData });
      setAppPrivateKey(userData.appPrivateKey);
    } else if (userSession.isUserSignedIn()) {
      setAppPrivateKey(userSession.loadUserData().appPrivateKey);
    }
  }, [userSession]);

  const onFinish = useCallback(({ userSession, authResponse }) => {
    const userData = userSession.loadUserData();
    setAppPrivateKey(userSession.loadUserData().appPrivateKey);
    setAuthResponse(authResponse);
    setState({ userData });
  }, []);

  const onCancel = useCallback(() => {
    
  }, []);

  useEffect(() => {
    void handleRedirectAuth();
    if (userSession.isUserSignedIn() && !state.userData) {
      const userData = userSession.loadUserData();
      setState({ userData });
    }
  }, [handleRedirectAuth, userSession, state]);

  const authOptions = {
    manifestPath: '/static/manifest.json',
    redirectTo: '/',
    userSession,
    onFinish,
    onCancel,
    appDetails: {
      name: 'Testing App',
      icon: 'http://placekitten.com/g/100/100',
    },
  };
  return {
    authOptions,
    state,
    authResponse,
    appPrivateKey,
    handleSignOut,
  };
}