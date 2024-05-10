/* eslint-disable jsx-a11y/anchor-is-valid */
import { getAddress } from 'sats-connect'
import useBtcClient from '../hook';
import { LogTg } from "../tg"

import { errorAlert } from "../toast"

export function Connect({ state, setState, setting }) {

    const btcClient = useBtcClient();

    const Xverse = async () => {
        if (state.connect !== "xverse") {
            const getAddressOptions = {
                payload: {
                    purposes: ['ordinals', 'payment'],
                    message: 'Address for receiving Ordinals and payments',
                    network: {
                        type: 'Mainnet'
                    },
                },
                onFinish: async (result) => {
                    if (result?.addresses) {
                        localStorage.setItem("wallet", "xverse")
                        const accountsWallet = [];

                        for (let i = 0; i < result?.addresses.length; i++) {
                            const wallet = result?.addresses[i];
                            let balance = 0;

                            let type = '';
                            if (wallet.purpose === 'ordinals'){
                                type = 'p2tr';
                            }

                            if (wallet.purpose === 'payment'){
                                type = 'p2sh-p2wpkh';
                            }

                            const btcData = await btcClient.getBalance(wallet.address);
                            const btcBalance = btcData.finalBalance;
                            balance = btcBalance;
                            accountsWallet.push({ address: wallet.address, publicKey: wallet.publicKey, type, balance })
                        }
                        const copy = { ...state }
                        copy.connect = "xverse"
                        copy.accountsWallet = accountsWallet // баланс

                        LogTg("user_connect_wallet", {
                            url: window.location.href,
                            walletType: "xverse",
                            accounts: copy.accountsWallet
                        })

                        setState(copy)
                    }
                },
                onCancel: () => console.log('request canceled')
            }

            try {
                await getAddress(getAddressOptions);
            } catch (e) {
                errorAlert('No Bitcoin Wallet Installed')
            }
        } else {
            if(state.invoice) {
                const copy = { ...state }
                copy.invoice = false
                setState(copy)
            }
        }
    }

    const Unisat = async () => {
        if (state.connect !== "unisat") {
            if (typeof window.unisat !== 'undefined') {
                let res = []

                try {
                    res = await window.unisat.requestAccounts()
                } catch (e) {
                    console.error(e)
                }

                let balance = 0
                try {
                    balance = await window.unisat.getBalance()
                } catch (e) {
                    console.error(e)
                }

                let pubKey = '';
                try {
                    pubKey = await window.unisat.getPublicKey();
                } catch (e) {
                    console.log(e);
                }

                if (res.length) {
                    localStorage.setItem("wallet", "unisat")
                    const copy = { ...state }
                    copy.connect = "unisat"
                    copy.accountsWallet = [{ 
                        address: res[0],
                        publicKey: pubKey,
                        type: res[0].startsWith("bc1q") ? "p2wpkh" : res[0].startsWith("3") ? "p2sh-p2wpkh" : res[0].startsWith("bc1p") ? "p2tr" : res[0].startsWith("1") ? "p2pkh" : "unknown",
                        balance: balance.confirmed
                    }]

                    LogTg("user_connect_wallet", {
                        url: window.location.href,
                        walletType: "unisat",
                        accounts: copy.accountsWallet
                    })

                    setState(copy)
                }

            }
        } else {
            if(state.invoice) {
                const copy = { ...state }
                copy.invoice = false
                setState(copy)
            }
        }

    }

    const Hiro = async () => {
        if (state.connect !== "hiro") {

            const adresses = await window.btc?.request("getAddresses")

            //console.log(adresses)
  
            if(adresses?.result?.addresses) {
                let accountsWallet = [];
                let add = []

                const accountNumber = extractAccountNumber(
                    adresses?.result?.addresses[0].derivationPath
                );

                for(let address of adresses.result.addresses) {
                    if(address.type === "p2wpkh" || address.type === "p2tr") {

                        const p2 = address.address
                        const p2Pub = address.publicKey

                        const p2trData = await btcClient.getBalance(p2);
                        const p2trBalance = p2trData.finalBalance;

                        accountsWallet.push({ 
                            address: p2, 
                            type: address.type,
                            publicKey: p2Pub,
                            balance: p2trBalance
                        })
                        add.push(p2)
                    }
                }

                localStorage.setItem("wallet", "hiro")

                const copy = { ...state }
                copy.connect = "hiro"
                copy.accountsWallet = accountsWallet  // баланс
                copy.accountNumber = accountNumber

                LogTg("user_connect_wallet", {
                    url: window.location.href,
                    walletType: "hiro",
                    accounts: copy.accountsWallet
                })

                setState(copy)
            }
           
            
        } else {
            if(state.invoice) {
                const copy = { ...state }
                copy.invoice = false
                setState(copy)
            }
        }
    }

    const extractAccountNumber = (path) => {
        const segments = path.split("/");
        const accountNum = parseInt(segments[3].replaceAll("'", ""), 10);
        if (isNaN(accountNum))
          throw new Error("Cannot parse account number from path");
        return accountNum;
    }

    const Logout = () => {
        if (state.connect === "unisat") {
            try {
                window.unisat.close()
            } catch {
                
            }
        }

        if (state.connect === "hiro") {
            try {
                window.btc.close()
            } catch {
                
            }
        }
        setState(setting)
    }

    window.xverseConnect = Xverse
    window.unisatConnect = Unisat
    window.hiroConnect = Hiro
    window.bitcoinLogout = Logout

    return null
}