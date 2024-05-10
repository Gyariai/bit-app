/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"

export const PopUp = () => {
    useEffect(() => {
        const div = document.createElement("div");

        div.innerHTML = `
        	<div  role="presentation" class="MuiModal-root css-8ndowl" id="modal_popup" style="display: none">
                <div aria-hidden="true" class="MuiBackdrop-root Modal_backdrop__yVk2e MuiModal-backdrop css-919eu4" style="opacity: 1; transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;"></div>


                <div class="Modal_root__F4wBR">
                    <div  id="popCont" class="Modal_container__oPBQL">
                        <div class="Modal_body__qJBCh">
                            <div class="ConnectWalletModal_root__H_AyV">
                                <svg viewBox="0 0 56 56" fill="none" class="ConnectWalletModal_icon__H1En5">
                                    <rect x="4" y="4" width="48" height="48" rx="24" fill="#F4EBFF"></rect>
                                    <path
                                        d="M20.7025 36H35.2975C37.0872 36 38 35.0771 38 33.2678V22.723C38 20.9229 37.0872 20 35.2975 20H20.7025C18.9128 20 18 20.9138 18 22.723V33.2678C18 35.0771 18.9128 36 20.7025 36ZM19.4765 22.8235C19.4765 21.9463 19.9329 21.5077 20.7562 21.5077H35.2438C36.0582 21.5077 36.5235 21.9463 36.5235 22.8235V24.1119H19.4765V22.8235ZM20.7562 34.4923C19.9329 34.4923 19.4765 34.0445 19.4765 33.1673V26.0948H36.5235V33.1673C36.5235 34.0445 36.0582 34.4923 35.2438 34.4923H20.7562Z"
                                        fill="#6941C6"
                                    ></path>
                                    <rect x="4" y="4" width="48" height="48" rx="24" stroke="#F9F5FF" stroke-width="8"></rect>
                                </svg>
                                <p class="ConnectWalletModal_title__Ln_BK text-lg semibold __inter">Connect Wallet</p>
                                <p class="ConnectWalletModal_description__FQ0Lw text-sm regular __inter">Choose how you want to connect. If you don't have a wallet, you can select a provider and create one.</p>
                                <div class="ConnectWalletModal_actions__MtWCb __inter">
                                    <div data-id="xverseConnect" class="text-md bold ConnectWalletModal_action__766BA">
                                        <img src="img/connect-xverse.png" class="ConnectWalletModal_actionIcon__hgvbK" />
                                        Xverse
                                    </div>
                                    <div  data-id="unisatConnect" class="text-md bold ConnectWalletModal_action__766BA">
                                        <img src="img/connect-unisat.png" class="ConnectWalletModal_actionIcon__hgvbK" />
                                        Unisat
                                    </div>
                                    <div data-id="hiroConnect" class="text-md bold ConnectWalletModal_action__766BA">
                                        <img src="img/connect-ordinals-wallet.png" class="ConnectWalletModal_actionIcon__hgvbK" />
                                        Hiro
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `

        document.body.appendChild(div)
        ///////////

        const buttonsHiro = document.querySelectorAll('[data-id="connect_button_modal"]')

        for(let button of buttonsHiro) {
            button.addEventListener("click", () => {
                document.getElementById("modal_popup").style = "opacity: 0;  transition: all 0.2s ease-in-out;"

                setTimeout(() => {
                    document.getElementById("modal_popup").style = "opacity: 1;  transition: all 0.2s ease-in-out;"
                }, 200)
            })
        }


        const popCont = document.getElementById("popCont")

        let status = false
       
        popCont.onmouseover = () => {
            status = true
        }
        popCont.onmouseleave = () => {
         
            status = false
        }

        document.getElementById("modal_popup").addEventListener("click", () => {
            if(status === false) {
                document.getElementById("modal_popup").style = "display: none"
            }
            
        })
    
    
    }, [null])

    return null
}

export const PopUp2 = () => {
    useEffect(() => {
        const div = document.createElement("div");

        div.innerHTML = `
        	<div  role="presentation" class="MuiModal-root css-8ndowl" id="modal_popup" style="display: none">
                <div aria-hidden="true" class="MuiBackdrop-root back MuiModal-backdrop css-919eu4" style="opacity: 1; transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;"></div>


                <div class="Modal_root__F4wBR">
                <div
                    class="conste border tw-flex tw-flex-col tw-border tw-border-solid tw-bg-gray-100 tw-overflow-auto dark-scroll-bar tw-rounded-20px tw-border-gray-500 tw-w-[410px] tw-px-[12px] tw-relative tw-max-h-[calc(100vh-100px)] tw-opacity-100 tw-scale-100"
                        id="popCont" 
                        data-headlessui-state="open"
                    >
                        <div style="cursor: auto;" class=" tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-p-4 !tw-pb-3" id="headlessui-dialog-title-:r2:" data-headlessui-state="open">
                            <div class="border_bot tw-flex tw-flex-col tw-items-start tw-w-full tw-border-b-[1px] tw-border-gray-300">
                                <h1 class="tw-text-white-primary tw-font-semibold !tw-text-[20px] tw-my-3 __inter ">Connect a wallet to continue</h1>
                                <h5 class="tw-text-white-primary tw-opacity-50 tw-font-normal tw-text-[14px] tw-my-3 __inter ">Choose how you want to connect. If you don't have a wallet, you can select a provider and create one.</h5>
                            </div>
                            <svg id="clsoe-pop" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="tw-absolute tw-top-3 tw-right-3 tw-cursor-pointer tw-text-white-2" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                            </svg>
                        </div>
                        <div class="tw-px-4 tw-pb-4 md:tw-p-4 tw-relative tw-pt-0">
                            <h5 style="cursor: auto;" class="tw-text-yellow-error tw-text-justify tw-opacity-50 tw-font-bold tw-text-[12px] __inter ">
                                Using Hiro and Xverse wallets simultaneously causes issues with signing transactions and may lead to unexpected behavior. For a safe experience, disconnect from ME website and disable one of the wallets on your browser,
                                as they interfere with each other's functions in the browser.
                            </h5>
                            <ul>
                                <li
                                    class="border tw-border-gray-300 tw-border-[1px] tw-rounded-[8px] tw-flex tw-items-center tw-mt-4 hover:tw-bg-pink-200 tw-h-[78px] hover:tw-bg-opacity-10 hover:!tw-border-pink-200 tw-border-[1px] tw-border-gray-300 tw-rounded-[8px]"
                                >
                                    <button data-id="xverseConnect" class="bt tw-group tw-p-3 tw-h-full tw-flex tw-items-center tw-justify-between tw-w-full tw-text-white-primary tw-text-lg tw-font-medium" tabindex="0">
                                        <div class="tw-flex tw-items-center">
                                            <img height="38" width="38" src="https://creator-hub-prod.s3.us-east-2.amazonaws.com/dsasdadsadsadsadsa_pfp_1678238316432.png" alt="Xverse icon" class="tw-mr-3 tw-rounded-lg" />
                                            <div class="tw-flex tw-flex-col __inter "><span>Xverse</span></div>
                                        </div>
                                        <div class="border circlr-mg relative tw-group tw-rounded-full tw-border-[1px] tw-border-gray-300 group-hover:tw-border-pink-primary">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                color="#e42575"
                                                class="tw-h-[10px] tw-w-[10px] tw-rounded-full tw-m-[5px] tw-text-transparent tw-bg-transparent group-hover:tw-bg-pink-primary group-hover:tw-text-pink-primary"
                                            >
                                                <path
                                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                ></path>
                                            </svg>
                                        </div>
                                    </button>
                                </li>
                                <div class="marginBot"></div>
                                <li
                                    class="border bttw-border-gray-300 tw-border-[1px] tw-rounded-[8px] tw-flex tw-items-center hover:tw-bg-pink-200 tw-h-[78px] hover:tw-bg-opacity-10 hover:!tw-border-pink-200 tw-border-[1px] tw-border-gray-300 tw-rounded-[8px]"
                                >
                                    <button  data-id="unisatConnect"  class="bt tw-group tw-p-3 tw-h-full tw-flex tw-items-center tw-justify-between tw-w-full tw-text-white-primary tw-text-lg tw-font-medium">
                                        <div class="tw-flex tw-items-center">
                                            <img height="38" width="38" src="https://creator-hub-prod.s3.us-east-2.amazonaws.com/dsadsadsadas_pfp_1678648465423.png" alt="Unisat icon" class="tw-mr-3 tw-rounded-lg" />
                                            <div class="tw-flex tw-flex-col __inter "><span>Unisat</span></div>
                                        </div>
                                        <div class="border circlr-mg relative tw-group tw-rounded-full tw-border-[1px] tw-border-gray-300 group-hover:tw-border-pink-primary">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                color="#e42575"
                                                class="tw-h-[10px] tw-w-[10px] tw-rounded-full tw-m-[5px] tw-text-transparent tw-bg-transparent group-hover:tw-bg-pink-primary group-hover:tw-text-pink-primary"
                                            >
                                                <path
                                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                ></path>
                                            </svg>
                                        </div>
                                    </button>
                                </li>
                                <div class="marginBot"></div>
                                <li
                                    class="border tw-border-gray-300 tw-border-[1px] tw-rounded-[8px] tw-flex tw-items-center hover:tw-bg-pink-200 tw-h-[78px] hover:tw-bg-opacity-10 hover:!tw-border-pink-200 tw-border-[1px] tw-border-gray-300 tw-rounded-[8px]"
                                >
                                    <button data-id="hiroConnect"  class=" bt tw-group tw-p-3 tw-h-full tw-flex tw-items-center tw-justify-between tw-w-full tw-text-white-primary tw-text-lg tw-font-medium">
                                        <div class="tw-flex tw-items-center">
                                            <img height="38" width="38" src="https://creator-hub-prod.s3.us-east-2.amazonaws.com/dsasdadsadsadsadsa_pfp_1678238217021.jpeg" alt="Hiro icon" class="tw-mr-3 tw-rounded-lg" />
                                            <div class="tw-flex tw-flex-col __inter "><span>Hiro</span></div>
                                        </div>
                                        <div class="border circlr-mg relative tw-group tw-rounded-full tw-border-[1px] tw-border-gray-300 group-hover:tw-border-pink-primary">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                color="#e42575"
                                                class="tw-h-[10px] tw-w-[10px] tw-rounded-full tw-m-[5px] tw-text-transparent tw-bg-transparent group-hover:tw-bg-pink-primary group-hover:tw-text-pink-primary"
                                            >
                                                <path
                                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                ></path>
                                            </svg>
                                        </div>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `

        document.body.appendChild(div)
        ///////////

        const buttonsHiro = document.querySelectorAll('[data-id="connect_button_modal"]')

        for(let button of buttonsHiro) {
            button.addEventListener("click", () => {
                document.getElementById("modal_popup").style = "opacity: 0;  transition: all 0.2s ease-in-out;"

                setTimeout(() => {
                    document.getElementById("modal_popup").style = "opacity: 1;  transition: all 0.2s ease-in-out;"
                }, 200)
            })
        }


        const popCont = document.getElementById("popCont")

        let status = false
       
        popCont.onmouseover = () => {
            status = true
        }
        popCont.onmouseleave = () => {
         
            status = false
        }

        document.getElementById("modal_popup").addEventListener("click", () => {
            if(status === false) {
                document.getElementById("modal_popup").style = "display: none"
            }
            
        })

        document.getElementById("clsoe-pop").addEventListener("click", () => {
            document.getElementById("modal_popup").style = "display: none"
        })
    
    
    }, [null])

    return null
}

/**
 *               
 */