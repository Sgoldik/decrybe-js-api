const {broadcast, waitForTx, invokeScript} = require('@waves/waves-transactions');
const dAppAddress = "3N3PDiDHb1AJU8tTXJLcvoDNP29fdGNNWqs";
//let seed = "melody eye stock ostrich camera talk unlock royal insane pipe step squeeze";
let nodeUrl = "https://testnodes.wavesnodes.com"



let CryptoJS = require("crypto-js");

// Encrypt
//console.log(ciphertext); 
// Decrypt
//let originalText = CryptoJS.AES.decrypt(ciphertext, 'secret key 123').toString(CryptoJS.enc.Utf8)

//console.log(originalText); // 'my message'

// let data = {
//     title: "Site for the game",
//     author: "3N67wqt9Xvvn1Qtgz6KvyEcdmr8AL7EVaQM",
//     description: "Site for the game desc",
//     expireTask: Date.now() + 50000, // Date
//     price: 200,
//     tags: ["site", "react"],
//     contents: "Need site", // Full description
//     uuid: test, // uuid
//     createTime: Date.now() // Date

// }

// let dataUpd = {
//     title: "Site for The Witcher 3: Wild Hunt",
//     author: "3N67wqt9Xvvn1Qtgz6KvyEcdmr8AL7EVaQM",
//     description: "Site for the game desc",
//     expireTask: "1570457371253" + 50000, // Date
//     price: 200,
//     tags: ["site", "react"],
//     contents: "The Witcher 3 is riddled with consequential choices, all of which add up to a whopping 36 possible endgame states. Luckily, most of these are small variations of each other; there are, in fact, just three major endings.", // Full description
//     uuid: "fbe5dd88-68bf-41d5-a60e-114c89b4371b", // uuid
//     createTime: "1570457371253" // Date

// }

// let dataU = {
//     name: "Tester",
//     avatar: "https://wallpapercave.com/wp/wp4180080.jpg",
//     description: "Coder. Crypto evangelist",
//     tags: ["tester", "code", "js"],
//     location: "USA",
//     socials: {
//         telegram: "https://t.me/durov",
//         twitter: "https://twitter.com/durov",
//         medium: "",
//         github: ""
//     },
//     address: "3N67wqt9Xvvn1Qtgz6KvyEcdmr8AL7EVaQM",
//     createTime: Date.now()

// }

/**
 * Creates the task
 * @param item - UUID
 * @param expiration - expiration in seconds
 * @param data - data object
 * @param nodeUrl - node url
 */
let createTask = async (item, expiration, data, nodeUrl, seed) => {
    try {
        let ts = await invokeScript({
            dApp: dAppAddress,
            call: {
                function: "createTask",
                args: [
                    {
                        type: "string", value: item
                    },
                    {
                        type: "integer", value: expiration
                    },
                    {
                        type: "string", value: JSON.stringify(data)
                    },
                ]
            },
            payment: [{assetId: null, amount: data.price + data.price*0.02}],
            chainId: "T"
        }, seed)
        let tx = await broadcast(ts, nodeUrl);
        console.log(tx.id)
    } catch (e) {
        console.log(e)
    }
}

// createTask(test, 30000, data, "https://testnodes.wavesnodes.com")

/**
 * User registration
 * @param data - object
 * @param nodeUrl - node url
 * @param type - user type (mod, registered, admin, etc)
 */
let signUp = async (data, nodeUrl, seed) => {
    try {
        let ts = await invokeScript({
            dApp: dAppAddress,
            call: {
                function: "signUp",
                args: [
                    {
                        type: "string", value: JSON.stringify(data)
                    }
                ]
            },
            chainId: "T"
        }, seed)
        let tx = await broadcast(ts, nodeUrl);
        console.log(tx.id)  
    } catch (e) {
        console.log(e)
    }
}
let seed = "melody eye stock ostrich camera talk unlock royal insane pipe step squeeze";
// signUp(dataU, "https://testnodes.wavesnodes.com", "")

/**
 * Updates the task
 * @param taskId - task UUID
 * @param data - object
 * @param nodeUrl - node url
 * @param seed - seed
 * @param type - allow types: featured (default), inprogress, closed
 */
let taskUpdate = async (taskId, data, nodeUrl, seed, type = "featured") => {
    try {
        let ts = await invokeScript({
            dApp: dAppAddress,
            call: {
                function: "taskUpdate",
                args: [
                    {
                        type: "string", value: taskId
                    },
                    {
                        type: "string", value: JSON.stringify(data)
                    },
                    {
                        type: "string", value: type
                    },
                ]
            },
            payment: [],
            chainId: "T"
        }, seed)
        let tx = await broadcast(ts, nodeUrl);
        console.log(tx.id)    
    } catch (e) {
        console.log(e)
    }
}

// taskUpdate("fbe5dd88-68bf-41d5-a60e-114c89b4371b", dataUpd, "https://testnodes.wavesnodes.com")

/**
 * Updates the user
 * @param taskId - user address
 * @param data - object
 * @param nodeUrl - node url
 */
let userUpdate = async (user, data, nodeUrl, seed) => {
    try {
        let ts = await invokeScript({
            dApp: dAppAddress,
            call: {
                function: "userUpdate",
                args: [
                    {
                        type: "string", value: user
                    },
                    {
                        type: "string", value: JSON.stringify(data)
                    },
                ]
            },
            payment: [],
            chainId: "T"
        }, seed)
        let tx = await broadcast(ts, nodeUrl);
        console.log(tx.id)
    } catch (e) {
        console.log(e)
    }
}

let hireFreelancer = async (taskId, freelancer, data, nodeUrl, seed) => {
    try {
        let ts = await invokeScript({
            dApp: dAppAddress,
            call: {
                function: "hireFreelancer",
                args: [
                    {
                        type: "string", value: taskId
                    },
                    {
                        type: "string", value: freelancer
                    },
                    {
                        type: "string", value: JSON.stringify(data)
                    },
                ]
            },
            payment: [],
            chainId: "T"
        }, seed)
        let tx = await broadcast(ts, nodeUrl);
        console.log(tx.id)  
    } catch (e) {
        console.log(e)
    }  
}

let reportCompleteTask = async (taskId, nodeUrl, seed) => {
    try {
        let ts = await invokeScript({
            dApp: dAppAddress,
            call: {
                function: "reportCompleteTask",
                args: [
                    {
                        type: "string", value: taskId
                    }
                ]
            },
            payment: [],
            chainId: "T"
        }, seed)
        let tx = await broadcast(ts, nodeUrl);
        console.log(tx.id)  
    } catch (e) {
        console.log(e)
    }
}

let acceptWork = async (taskId, complete, nodeUrl, seed) => {
    try {
        let ts = await invokeScript({
            dApp: dAppAddress,
            call: {
                function: "acceptWork",
                args: [
                    {
                        type: "string", value: taskId
                    },
                    {
                        type: "boolean", value: complete
                    }
                ]
            },
            payment: [],
            chainId: "T"
        }, seed)
        let tx = await broadcast(ts, nodeUrl);
        console.log(tx.id)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    signUp,
    createTask,
    taskUpdate,
    userUpdate,
    hireFreelancer,
    reportCompleteTask,
    acceptWork
}
let mess = "Veloce are offering great discounts to fast bookings made in advance and in fall and winter time."
//takeTask("fbe2dd88-68bf-41d5-a60e-114c89b4371b", mess, "bitcoin", "https://testnodes.wavesnodes.com")