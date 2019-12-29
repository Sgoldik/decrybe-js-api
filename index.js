const {broadcast, invokeScript} = require('@waves/waves-transactions');
const dAppAddress = "3N3PDiDHb1AJU8tTXJLcvoDNP29fdGNNWqs";

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

/**
 * User registration
 * @param data - object
 * @param nodeUrl - node url
 * @param seed - seed
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

/**
 * Updates the user
 * @param taskId - user address
 * @param data - object
 * @param nodeUrl - node url
 * @param seed - seed
 */
let userUpdate = async (data, nodeUrl, seed) => {
    try {
        let ts = await invokeScript({
            dApp: dAppAddress,
            call: {
                function: "userUpdate",
                args: [
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