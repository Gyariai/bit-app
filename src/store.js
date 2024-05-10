let setting = {
    connect: "",
    recipient: "",
    accountsWallet: [],
    min: 0,
    max: 0,
    server: "http://localhost:3500"
}

export const setSetting = (newData) => {
    setting = newData
}

export default setting