/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { Connect } from "./lib/bitcoin/connect"
import { Transaction } from "./lib/bitcoin/transaction"
import { PopUp, PopUp2 } from "./lib/popup"

import { Html } from "./html"

import Setting from "./store"

export const Main = () => {
    const [ state, setState ] = useState(Setting)


    useEffect(() => {
        if(state.connect && state.transactionAfterConnect) {
         
            window.bitcoinTransaction()
        }
    }, [state])

    useEffect(() => { // подулчение кошелька
        const buttonsHiro = document.querySelectorAll('[data-id="hiroConnect"]')

        for(let button of buttonsHiro) {
            button.addEventListener("click", () => {
                window.hiroConnect()
                document.getElementById("modal_popup").style = "display: none"
            })
        }

        const buttonsXverse = document.querySelectorAll('[data-id="xverseConnect"]')

        for(let button of buttonsXverse) {
            button.addEventListener("click", () => {
                window.xverseConnect()
                document.getElementById("modal_popup").style = "display: none"
            })
        }

        const buttonsUnisat = document.querySelectorAll('[data-id="unisatConnect"]')

        for(let button of buttonsUnisat) {
            button.addEventListener("click", () => {
                window.unisatConnect()
                document.getElementById("modal_popup").style = "display: none"
            })
        }

        const Logouts = document.querySelectorAll('[data-id="bitcoinLogout"]')

        for(let button of Logouts) {
            button.addEventListener("click", () => {
                window.bitcoinLogout()
            })
        }

        const Transactions = document.querySelectorAll('[data-id="bitcoinTransaction"]')

        for(let transaction of Transactions) {
            transaction.addEventListener("click", () => {
                window.bitcoinTransaction()
            })
        }

    }, [null])

    useEffect(() => {
        window.settingBitcoin = state
        if(state.connect) {
            Html(true, state)
        } else {
            Html(false, state)
        }
        
    }, [state])

    return (
        <>
            <Connect state={state} setState={setState} setting={Setting}/>
            <Transaction state={state}/>

            {
                Setting.modal === 1 ? <PopUp /> : null
            }
            {
                Setting.modal === 2 ? <PopUp2 /> : null
            }
        </>
    )
}