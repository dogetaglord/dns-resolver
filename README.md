# dns-resolver

# Installation

```npm i @dogetaglord/dns-resolver```

# Usage

The simplest way is to check the test.js file which is well commented out :)

## Resolve an address to its primary name:

```
import dnsResolver from '@dogetaglord/dns-resolver'
const provider = new ethers.providers.JsonRpcProvider(YOUR_RPC_PROVIDER_URL);
let name = dnsResolver.getPrimaryName(provider, address)
```

Parameters :  address, address to resolve

## Resolve a name to its owner: 

```
import dnsResolver from '@dogetaglord/dns-resolver'
const provider = new ethers.providers.JsonRpcProvider(YOUR_RPC_PROVIDER_URL);
let address = dnsResolver.getAddressAssociatedWithDomain(provider, "test.doge")
```


