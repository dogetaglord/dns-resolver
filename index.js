const ethers = require('ethers');
const Buffer = require('buffer').Buffer;
const ReverseRegistrar = '0xE62c492fbfE08dCD34C936AC723d67CbfEE37223';
const DNS = '0xfBb6F99dC8480366727db0cBf95dea90D64030D1';
const PublicResolver = '0xF9A7a1fA0870e4B4F1eCB90eF6B9aDf54668837F';
const Registrar = '0xCB2Df8B3De2d4d59a7F22E2EB1C080BAafc58C2F';

let RESOLVER_ABI = ['function name(bytes32) external view returns (string memory)'];
let REVERSE_REGISTRAR_ABI = ['function node(address) public pure returns (bytes32)'];
let DNS_OWNER_ABI = ['function owner(bytes32 node) public view returns (address)'];
let REGISTRAR_ABI = ['function tokenURI(uint256 tokenId) public view returns (string)'];
const namehash = require('eth-ens-namehash');
const labelhash = (label) => ethers.utils.keccak256(ethers.utils.toUtf8Bytes(label))

// returns primary name for an address
// @param address - address to lookup
async function getPrimaryName( address) {
	let provider = new ethers.providers.JsonRpcProvider("https://dogechain.ankr.com")
	let dns = new ethers.Contract(DNS, DNS_OWNER_ABI, provider);
	let reverseRegistar = new ethers.Contract(ReverseRegistrar, REVERSE_REGISTRAR_ABI, provider);
	let resolver = new ethers.Contract(PublicResolver, RESOLVER_ABI, provider);
	let node = await reverseRegistar.node(address);
	let currentOwner = await dns.owner(node);
	if (currentOwner.toLowerCase() !== address.toLowerCase()) {
		return '';
	} else {
		let reverseName = await resolver.name(node);
		return reverseName;
	}
}

// returns the address for a given name
// @param domain - domain name eg. "mydomain.doge"
async function getAddressAssociatedWithDomain(domain) {
	let provider = new ethers.providers.JsonRpcProvider("https://dogechain.ankr.com")
	let contract = new ethers.Contract(DNS, DNS_OWNER_ABI, provider);
	// prepare domain name
	const lh = namehash.hash(domain);
	try {
		return await contract.owner(lh);
	} catch (err) {
		console.error(err);
	}
}

// returns information to display user nft domains using a token ID
// param domain name eg. "mydomain.doge"
async function getTokenURI(domainName) {
	// prepare domain name
	let provider = new ethers.providers.JsonRpcProvider("https://dogechain.ankr.com")
	const lh = labelhash(domainName);
	let contract = new ethers.Contract(Registrar, REGISTRAR_ABI, provider);
	try {
		let res = await contract.tokenURI(ethers.BigNumber.from(lh));
		return res;
	} catch (err) {
		console.error('error getting nft data', err);
	}
}

// returns the information to display user nft domains using a token ID
async function getDomainInfoFromTokenURI(tokenURI) {
	const tokenURIWithoutHeader = tokenURI.replace('data:application/json;base64,', '');
	const tokenURIBuffer = Buffer.from(tokenURIWithoutHeader, 'base64');
	const tokenURIString = tokenURIBuffer.toString('utf8');
	const tokenURIObject = JSON.parse(tokenURIString);
	return tokenURIObject;
}

module.exports = {
	getPrimaryName: getPrimaryName,
	getAddressAssociatedWithDomain: getAddressAssociatedWithDomain,
	getTokenURI: getTokenURI,
	getDomainInfoFromTokenURI: getDomainInfoFromTokenURI
};
