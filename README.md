# dns-resolver

# Installation

```npm i @dogetaglord/dns-resolver```

# Usage

The simplest way is to check the test.js file which is well commented out :)

## Resolve an address to its primary name:

```
import dnsResolver from '@dogetaglord/dns-resolver'
dnsResolver.getPrimaryName(address)
```

Parameters :  address, address to resolve

## Resolve a name to its owner: 

```
import dnsResolver from '@dogetaglord/dns-resolver'
dnsResolver.getAddressAssociatedWithDomain(dotdogename)
```

Parameters :  dotdogename, name to resolve (eg. alice.doge)

