// import the index.js functions
const {getAddressAssociatedWithDomain, getPrimaryName, getTokenURI, getDomainInfoFromTokenURI} = require('./index.js');
const ethers = require('ethers');

async function testMain(){
    // example on how to use the functions

    const provider = new ethers.providers.JsonRpcProvider("https://dogechain.ankr.com");

    // get the address associated with a domain
    let address = await getAddressAssociatedWithDomain(provider, "crazy.doge")
    console.log(address)

    // get the domain associated with an address
    let name = await getPrimaryName(provider, "0x389B8EAD802bE6B43cC0B091fdf6c7cEA4510012")
    console.log(name)

    // get the nft data associated with a domain
    let tokenURI = await getTokenURI(provider, "crazy")

    // the nft data is encoded in base64 so you need to decode it using this function to get a json
    let data = await getDomainInfoFromTokenURI(tokenURI)
    console.log(data)
    // data is composed of 
    // a name, the name of the domain for example crazy.doge
    // the description : Dogechain Name Service Domain
    // the image : a svg encoded in base 64 that you can use to display the domain (in a marketplace for example)
}

testMain()
