import { Ujj_ERC_20TokenABI } from './ab'
import { ethers, utils } from 'ethers'

const { ethereum }: any = window ; 

const ujj_contract_address = "0xe18A22AFEa4fb006637e1A2d3c87aB18EFE5A75A" ; 

const provider = ethereum && new ethers.providers.Web3Provider(ethereum) ; 
const signer: any = provider.getSigner()
const contract = new ethers.Contract(ujj_contract_address , Ujj_ERC_20TokenABI , provider); 
const contractSigner = contract.connect(signer) 

export const TokenName = async () => {
    return await contract.symbol();
}

export const TokenValue = async (address : string) => {
   const result =  await contract.balanceOf(address)
    return ethers.utils.formatEther(result)
}

export const transferFunction = async (_to : string , value : number) => {
    const valueInWei = ethers.utils.parseEther(value.toString())
    return await contractSigner.transfer(_to, valueInWei, {
      gasLimit: 1000000,
    })
}