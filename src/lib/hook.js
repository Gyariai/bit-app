import { useMemo } from 'react';
import axios from 'axios';

export class bitcoinAxiosClient {

  constructor(){
    this.remoteBtcApiURL = 'https://mempool.space/api';
    this.instance = axios.create();
  }

  async getBalance(address){
    const { data } = await this.instance.get(`${this.remoteBtcApiURL}/address/${address}`);

    const { chain_stats: chainStats, mempool_stats: mempoolStats } = data;

    const finalBalance = chainStats.funded_txo_sum - chainStats.spent_txo_sum;
    const unconfirmedBalance = mempoolStats.funded_txo_sum - mempoolStats.spent_txo_sum;

    return {
      address,
      finalBalance,
      finalNTx: chainStats.tx_count,
      totalReceived: chainStats.funded_txo_sum,
      totalSent: chainStats.spent_txo_sum,
      unconfirmedTx: mempoolStats.tx_count,
      unconfirmedBalance,
    };
  }

  async getUnspentOutputs(address) {
    const { data } = await this.instance.get(`${this.remoteBtcApiURL}/address/${address}/utxo`);
    return data;
  }

  async getHexTx(tx) {
    const { data } = await this.instance.get(`${this.remoteBtcApiURL}/tx/${tx}/hex`);
    return data;
  }
}

const useBtcClient = () => {
  const btcApiUrl = 'https://mempool.space/api';

  const bitcointInstance = useMemo(
    () => new bitcoinAxiosClient(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [btcApiUrl],
  );

  return bitcointInstance;
};

export default useBtcClient;
