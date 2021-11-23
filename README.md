# Turkish Identity Verification

This library created for Turkish identity verification. [Government-provided web APIs](https://tckimlik.nvi.gov.tr/Home) were used for the verification.

## Installation 

```
npm install tc-identity --save
```

## Usage

```js
const Identity = require('tc-identity')

async function validateCitizen() {
  const ct = new Identity({
    id: 10000000146,
    name: 'Gazi Mustafa Kemal',
    lastName: 'Atatürk',
    birthYear: 1881,
  })
  
  const valid = await ct.check()
  console.log(valid)
}

validateCitizen()
```