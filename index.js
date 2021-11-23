const soap = require('soap')
const yup = require('yup')

const constructorSchema = yup.object().shape({
  id: yup.number().min(10000000000),
  birthYear: yup.number().required().positive(),
  name: yup.string().required(),
  lastName: yup.string().required(),  
})

class Identity {
  constructor (options) {
    if (constructorSchema.isValidSync(options)) {
      this.id = options.id
      this.name = options.name
      this.lastName = options.lastName
      this.birthYear = options.birthYear
    } else {
      throw new Error("Illegal constructor params.");
    }
  }

  async check() {
    const client = await soap.createClientAsync('https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx?WSDL')
    const data = await client.TCKimlikNoDogrulaAsync({
      TCKimlikNo: this.id,
      Ad: this.name,
      Soyad: this.lastName,
      DogumYili: this.birthYear,
    })

    return data[0].TCKimlikNoDogrulaResult
  }
}

module.exports = Identity