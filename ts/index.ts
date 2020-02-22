import * as ethers from 'ethers'
const poseidonGenContract = require('circomlib/src/poseidon_gencontract.js');
const POSEIDON_SEED = 'poseidon'


const buildPoseidonT3 = async () => {
    const binary = poseidonGenContract.createCode(3, 8, 57, POSEIDON_SEED)
    return binary
}

const main = async () => {
    const provider = new ethers.providers.JsonRpcProvider()
    const privateKey = '0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3'
    const wallet = new ethers.Wallet(privateKey, provider)
    const bin = await buildPoseidonT3()
    const poseidonFactory = new ethers.ContractFactory(poseidonGenContract.abi, bin, wallet)
    const contract = await poseidonFactory.deploy()
    await contract.deployed()

    const x = await contract.poseidon([1, 2])
    const y = await contract.poseidon([3, 4])
    console.log(x.toString())
    console.log(y.toString())
}

main()
