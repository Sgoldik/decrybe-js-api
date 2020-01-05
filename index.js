const {broadcast, invokeScript} = require('@waves/waves-transactions');

/**
 * Creates the task
 * @param uuid - UUID
 * @param expiration - expiration in minutes
 * @param data - data object
 * @param nodeUrl - node url
 * @param seed - user seed
 * @param dAppAddress - dApp address
 */
let createTask = async (uuid, expiration, data, nodeUrl, seed, dAppAddress, price) => {
    try {
        let ts = await invokeScript({
            dApp: dAppAddress,
            call: {
                function: "createTask",
                args: [
                    {
                        type: "string", value: uuid
                    },
                    {
                        type: "integer", value: expiration
                    },
                    {
                        type: "string", value: JSON.stringify(data)
                    },
                ]
            },
            payment: [{assetId: null, amount: (price + price*0.02) * 10e7}],
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
 * @param dAppAddress - dapp address
 */
let signUp = async (data, nodeUrl, seed, dAppAddress) => {
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
 * @param dAppAddress - dapp address
 */
let taskUpdate = async (taskId, data, nodeUrl, seed, dAppAddress) => {
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
 * @param data - object
 * @param nodeUrl - node url
 * @param seed - seed
 * @param dAppAddress - dapp addres
 */
let userUpdate = async (data, nodeUrl, seed, dAppAddress) => {
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

/**
 * Hires the freelancer
 * @param taskId - task uuid
 * @param freelancer - freelancer address
 * @param nodeUrl - node url
 * @param seed - seed
 * @param dAppAddress - dapp addres
 */
let hireFreelancer = async (taskId, freelancer, nodeUrl, seed, dAppAddress) => {
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
 * Report complete task
 * @param taskId - task uuid
 * @param nodeUrl - node url
 * @param seed - seed
 * @param dAppAddress - dapp addres
 */
let reportCompleteTask = async (taskId, nodeUrl, seed, dAppAddress) => {
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

/**
 * Accept work
 * @param taskId - task uuid
 * @param complete - boolean (true/false)
 * @param nodeUrl - node url
 * @param seed - seed
 * @param dAppAddress - dapp addres
 */
let acceptWork = async (taskId, complete, nodeUrl, seed, dAppAddress) => {
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

/**
 * Move Deadline
 * @param taskId - task uuid
 * @param deadline - new block height
 * @param nodeUrl - node url
 * @param seed - seed
 * @param dAppAddress - dapp addres
 */
let moveDeadline = async (taskId, deadline, nodeUrl, seed, dAppAddress) => {
    try {
        let ts = await invokeScript({
            dApp: dAppAddress,
            call: {
                function: "moveDeadline",
                args: [
                    {
                        type: "string", value: taskId
                    },
                    {
                        type: "integer", value: deadline
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

/**
 * Task Vote (task rating)
 * @param taskId - task uuid
 * @param vote - positive/negative
 * @param nodeUrl - node url
 * @param seed - seed
 * @param dAppAddress - dapp addres
 */
let voteTask = async (taskId, vote, nodeUrl, seed, dAppAddress) => {
    try {
        let ts = await invokeScript({
            dApp: dAppAddress,
            call: {
                function: "voteTask",
                args: [
                    {
                        type: "string", value: taskId
                    },
                    {
                        type: "string", value: vote
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

/**
 * Report user
 * @param user - user address
 * @param nodeUrl - node url
 * @param seed - seed
 * @param dAppAddress - dapp addres
 */
let reportUser = async (user, nodeUrl, seed, dAppAddress) => {
    try {
        let ts = await invokeScript({
            dApp: dAppAddress,
            call: {
                function: "reportUser",
                args: [
                    {
                        type: "string", value: user
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
 * Open task dispute
 * @param task - task uuid
 * @param message - dispute message
 * @param nodeUrl - node url
 * @param seed - seed
 * @param dAppAddress - dapp addres
 */
let openTaskDispute = async (task, message, nodeUrl, seed, dAppAddress) => {
    try {
        let ts = await invokeScript({
            dApp: dAppAddress,
            fee: 900000,
            call: {
                function: "openTaskDispute",
                args: [
                    {
                        type: "string", value: task
                    },
                    {
                        type: "string", value: message
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
 * Vote task dispute
 * @param task - task uuid
 * @param variant - customer/freelancer
 * @param message - dispute comment
 * @param nodeUrl - node url
 * @param seed - seed
 * @param dAppAddress - dapp addres
 */
let voteTaskDispute = async (task, variant, message, nodeUrl, seed, dAppAddress) => {
    try {
        let ts = await invokeScript({
            dApp: dAppAddress,
            call: {
                function: "voteTaskDispute",
                args: [
                    {
                        type: "string", value: task
                    },
                    {
                        type: "string", value: variant
                    },
                    {
                        type: "string", value: message
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
 * Task dispute message (only for freelancer/customer)
 * @param task - task uuid
 * @param message - dispute message
 * @param nodeUrl - node url
 * @param seed - seed
 * @param dAppAddress - dapp addres
 */
let taskDisputeMessage = async (task, message, nodeUrl, seed, dAppAddress) => {
    try {
        let ts = await invokeScript({
            dApp: dAppAddress,
            call: {
                function: "taskDisputeMessage",
                args: [
                    {
                        type: "string", value: task
                    },
                    {
                        type: "string", value: message
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
 * Cancel task
 * @param task - task uuid
 * @param nodeUrl - node url
 * @param seed - seed
 * @param dAppAddress - dapp addres
 */
let cancelTask = async (task, nodeUrl, seed, dAppAddress) => {
    try {
        let ts = await invokeScript({
            dApp: dAppAddress,
            call: {
                function: "cancelTask",
                args: [
                    {
                        type: "string", value: task
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

module.exports = {
    signUp,
    createTask,
    taskUpdate,
    userUpdate,
    hireFreelancer,
    reportCompleteTask,
    acceptWork,
    moveDeadline,
    voteTask,
    reportUser,
    openTaskDispute,
    voteTaskDispute,
    taskDisputeMessage,
    cancelTask
}
let mess = "Veloce are offering great discounts to fast bookings made in advance and in fall and winter time."
//takeTask("fbe2dd88-68bf-41d5-a60e-114c89b4371b", mess, "bitcoin", "https://testnodes.wavesnodes.com")