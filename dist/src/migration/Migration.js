import ERC721Factory from '../artifacts/ERC721Factory.json'
import ERC721Template from '../artifacts/ERC721Template.json'
import { getFairGasPrice } from '../utils'
import { getAndConvertDDO } from '../DDO/convertDDO'
import { getDDO } from '../DDO/importDDO'
import V4ProviderInstance from '../provider/Provider'
import sha256 from 'crypto-js/sha256'
import { SHA256 } from 'crypto-js'
import { Ocean as V3Ocean } from '../v3/ocean/Ocean'
import { ConfigHelper } from '../v3/utils/ConfigHelper'
import axios from 'axios'
export class Migration {
  GASLIMIT_DEFAULT = 1000000
  web3
  startBlock
  constructor(web3, startBlock) {
    this.web3 = web3
    this.startBlock = startBlock || 0
  }
  async generateDidv4(erc721Address) {
    const chainId = 1 // await this.web3.eth.getChainId()
    const checksum = SHA256(erc721Address + chainId.toString(10))
    return `did:op:${checksum.toString()}`
  }
  async getHash(message) {
    let hex = ''
    for (let i = 0; i < message.length; i++) {
      hex += '' + message.charCodeAt(i).toString(16)
    }
    const hexMessage = '0x' + hex
    return hexMessage
  }
  async validateAssetAquariusV4(asset, v4MetadataCacheUri) {
    const metadataCacheUri =
      v4MetadataCacheUri || 'https://v4.aquarius.oceanprotocol.com'
    const data = JSON.stringify(asset)
    const response = await axios.post(
      `${metadataCacheUri}/api/aquarius/assets/ddo/validate`,
      data,
      { headers: { 'Content-Type': 'application/octet-stream' } }
    )
    if (!response || response.status !== 200 || !response.data)
      return { response: null, validation: {} }
    const { publicKey: validatorAddress, r, s, v } = response.data
    return {
      response: response.data,
      validation: {
        validatorAddress,
        r: r[0],
        s: s[0],
        v: v
      }
    }
  }
  async getAssetURL(account, did, network, infuraProjectId) {
    let urlResponse
    // Workaround for testing
    if (network === 'v4-testing') return 'http://oceanprotocol.com/test'
    try {
      const config = new ConfigHelper().getConfig(network, infuraProjectId)
      config.web3Provider = this.web3
      const ocean = await V3Ocean.getInstance(config)
      urlResponse = await ocean.provider.getAssetURL(account, did, 1)
    } catch (error) {
      console.log('error', error)
    }
    return urlResponse
  }
  async getEncryptedFiles(v4ProviderUrl, account, did, network) {
    const assetURL = await this.getAssetURL(account, did, network)
    const file = [
      {
        type: 'url',
        url: assetURL,
        method: 'GET'
      }
    ]
    try {
      const response = await V4ProviderInstance.encrypt(file, v4ProviderUrl)
      return response
    } catch (error) {
      console.error('Error parsing json: ' + error.message)
    }
  }
  async estGasPublishFixedRateAsset(
    did,
    description,
    ERC721FactoryAddress,
    nftName,
    nftSymbol,
    ownerAddress,
    cap,
    rate,
    marketFee,
    publishingMarketFeeAddress,
    publishingMarketTokenAddress,
    fixedRateExchangeAddress,
    baseTokenAddress,
    templateIndex,
    dtName,
    dtSymbol
  ) {
    const ERC721FactoryContract = new this.web3.eth.Contract(
      ERC721Factory.abi,
      ERC721FactoryAddress
    )
    const gasLimitDefault = this.GASLIMIT_DEFAULT
    let estGas
    const encodedMetadata = Buffer.from(
      JSON.stringify({
        name: nftName,
        symbol: nftSymbol,
        description: description
      })
    ).toString('base64')
    try {
      estGas = await ERC721FactoryContract.methods
        .createNftWithErc20WithFixedRate(
          {
            name: nftName,
            symbol: nftSymbol,
            templateIndex,
            tokenURI: `data:application/json;base64,${encodedMetadata}`
          },
          {
            strings: [dtName, dtSymbol],
            templateIndex,
            addresses: [
              ownerAddress,
              ownerAddress,
              publishingMarketFeeAddress,
              publishingMarketTokenAddress
            ],
            uints: [cap, 0],
            bytess: []
          },
          {
            fixedPriceAddress: fixedRateExchangeAddress,
            addresses: [
              baseTokenAddress,
              ownerAddress,
              ownerAddress,
              publishingMarketFeeAddress
            ],
            uints: [18, 18, rate, marketFee, 0]
          }
        )
        .estimateGas({ from: ownerAddress }, (err, estGas) =>
          err ? gasLimitDefault : estGas
        )
    } catch (error) {
      console.log('error', error)
    }
    return estGas
  }
  async publishFixedRateAsset(
    did,
    description,
    ERC721FactoryAddress,
    nftName,
    nftSymbol,
    ownerAddress,
    cap,
    rate,
    marketFee,
    publishingMarketFeeAddress,
    publishingMarketTokenAddress,
    fixedRateExchangeAddress,
    baseTokenAddress,
    templateIndex,
    dtName,
    dtSymbol
  ) {
    const ERC721FactoryContract = new this.web3.eth.Contract(
      ERC721Factory.abi,
      ERC721FactoryAddress
    )
    const estGas = await this.estGasPublishFixedRateAsset(
      did,
      description,
      ERC721FactoryAddress,
      nftName,
      nftSymbol,
      ownerAddress,
      cap,
      rate,
      marketFee,
      publishingMarketFeeAddress,
      publishingMarketTokenAddress,
      fixedRateExchangeAddress,
      baseTokenAddress,
      templateIndex,
      dtName,
      dtSymbol
    )
    let tx
    const encodedMetadata = Buffer.from(
      JSON.stringify({
        name: nftName,
        symbol: nftSymbol,
        description: description
      })
    ).toString('base64')
    try {
      tx = await ERC721FactoryContract.methods
        .createNftWithErc20WithFixedRate(
          {
            name: nftName,
            symbol: nftSymbol,
            templateIndex,
            tokenURI: `data:application/json;base64,${encodedMetadata}`
          },
          {
            strings: [dtName, dtSymbol],
            templateIndex,
            addresses: [
              ownerAddress,
              ownerAddress,
              publishingMarketFeeAddress,
              publishingMarketTokenAddress
            ],
            uints: [cap, 0],
            bytess: []
          },
          {
            fixedPriceAddress: fixedRateExchangeAddress,
            addresses: [
              baseTokenAddress,
              ownerAddress,
              ownerAddress,
              publishingMarketFeeAddress
            ],
            uints: [18, 18, rate, marketFee, 0]
          }
        )
        .send({
          from: ownerAddress,
          gas: estGas + 1,
          gasPrice: await getFairGasPrice(this.web3)
        })
    } catch (error) {
      console.log('error', error)
    }
    return tx
  }
  async estGaspublishFreeAsset(
    description,
    ERC721FactoryAddress,
    nftName,
    nftSymbol,
    ownerAddress,
    cap,
    publishingMarketFeeAddress,
    publishingMarketTokenAddress,
    templateIndex,
    dtName,
    dtSymbol,
    dispenserData
  ) {
    const ERC721FactoryContract = new this.web3.eth.Contract(
      ERC721Factory.abi,
      ERC721FactoryAddress
    )
    const encodedMetadata = Buffer.from(
      JSON.stringify({
        name: nftName,
        symbol: nftSymbol,
        description: description
      })
    ).toString('base64')
    const gasLimitDefault = this.GASLIMIT_DEFAULT
    let estGas
    try {
      estGas = await ERC721FactoryContract.methods
        .createNftWithErc20WithDispenser(
          {
            name: nftName,
            symbol: nftSymbol,
            templateIndex,
            tokenURI: `data:application/json;base64,${encodedMetadata}`
          },
          {
            strings: [dtName, dtSymbol],
            templateIndex,
            addresses: [
              ownerAddress,
              ownerAddress,
              publishingMarketFeeAddress,
              publishingMarketTokenAddress
            ],
            uints: [cap, 0],
            bytess: []
          },
          dispenserData
        )
        .estimateGas({ from: ownerAddress }, (err, estGas) =>
          err ? gasLimitDefault : estGas
        )
    } catch (error) {
      console.log('error', error)
    }
    return estGas
  }
  async publishFreeAsset(
    description,
    ERC721FactoryAddress,
    nftName,
    nftSymbol,
    ownerAddress,
    cap,
    publishingMarketFeeAddress,
    publishingMarketTokenAddress,
    templateIndex,
    dtName,
    dtSymbol,
    dispenserData
  ) {
    const ERC721FactoryContract = new this.web3.eth.Contract(
      ERC721Factory.abi,
      ERC721FactoryAddress
    )
    const estGas = await this.estGaspublishFreeAsset(
      description,
      ERC721FactoryAddress,
      nftName,
      nftSymbol,
      ownerAddress,
      cap,
      publishingMarketFeeAddress,
      publishingMarketTokenAddress,
      templateIndex,
      dtName,
      dtSymbol,
      dispenserData
    )
    let tx
    const encodedMetadata = Buffer.from(
      JSON.stringify({
        name: nftName,
        symbol: nftSymbol,
        description: description
      })
    ).toString('base64')
    try {
      tx = await ERC721FactoryContract.methods
        .createNftWithErc20WithDispenser(
          {
            name: nftName,
            symbol: nftSymbol,
            templateIndex,
            tokenURI: `data:application/json;base64,${encodedMetadata}`
          },
          {
            strings: [dtName, dtSymbol],
            templateIndex,
            addresses: [
              ownerAddress,
              ownerAddress,
              publishingMarketFeeAddress,
              publishingMarketTokenAddress
            ],
            uints: [cap, 0],
            bytess: []
          },
          dispenserData
        )
        .send({
          from: ownerAddress,
          gas: estGas + 1,
          gasPrice: await getFairGasPrice(this.web3)
        })
    } catch (error) {
      console.log('error', error)
    }
    return tx
  }
  async estGasUpdateMetadata(
    ownerAddress,
    txReceipt,
    metaDataState,
    metaDataDecryptorUrl,
    metaDataDecryptorAddress,
    flags,
    data,
    dataHash,
    metadataProofs
  ) {
    const gasLimitDefault = this.GASLIMIT_DEFAULT
    let estGas
    const event = txReceipt.events.NFTCreated
    const tokenAddress = event.returnValues.newTokenAddress
    if (!metadataProofs) metadataProofs = []
    const tokenERC721 = new this.web3.eth.Contract(
      ERC721Template.abi,
      tokenAddress
    )
    try {
      estGas = await tokenERC721.methods
        .setMetaData(
          metaDataState,
          metaDataDecryptorUrl,
          metaDataDecryptorAddress,
          flags,
          data,
          dataHash,
          metadataProofs
        )
        .estimateGas({ from: ownerAddress }, (err, estGas) =>
          err ? gasLimitDefault : estGas
        )
    } catch (error) {
      console.log('error', error)
    }
    return estGas
  }
  async updateMetadata(
    ownerAddress,
    txReceipt,
    metaDataState,
    metaDataDecryptorUrl,
    metaDataDecryptorAddress,
    flags,
    data,
    dataHash,
    metadataProofs
  ) {
    const event = txReceipt.events.NFTCreated
    const tokenAddress = event.returnValues.newTokenAddress
    if (!metadataProofs) metadataProofs = []
    const tokenERC721 = new this.web3.eth.Contract(
      ERC721Template.abi,
      tokenAddress
    )
    const estGas = await this.estGasUpdateMetadata(
      ownerAddress,
      txReceipt,
      metaDataState,
      metaDataDecryptorUrl,
      metaDataDecryptorAddress,
      flags,
      data,
      dataHash,
      metadataProofs
    )
    let tx
    try {
      tx = await tokenERC721.methods
        .setMetaData(
          metaDataState,
          metaDataDecryptorUrl,
          metaDataDecryptorAddress,
          flags,
          data,
          dataHash,
          metadataProofs
        )
        .send({
          from: ownerAddress,
          gas: estGas + 1,
          gasPrice: await getFairGasPrice(this.web3)
        })
    } catch (error) {
      console.log('setMetaDataAndTokenURI ERROR', error)
    }
    return tx
  }
  async migrateFixedRateAsset(
    v3Did,
    ERC721FactoryAddress,
    nftName,
    nftSymbol,
    ownerAddress,
    ownerAccount,
    cap,
    rate,
    flags,
    marketFee,
    publishingMarketFeeAddress,
    publishingMarketTokenAddress,
    fixedRateExchangeAddress,
    baseTokenAddress,
    metaDataState,
    metaDataDecryptorAddress,
    v4ProviderUrl,
    v3MetadataCacheUri,
    templateIndex,
    dtName,
    dtSymbol,
    network,
    v4MetadataCacheUri,
    v4EncryptProviderUri
  ) {
    let txReceipt
    const v3DDO = await getDDO(v3Did, v3MetadataCacheUri)
    const description =
      v3DDO.service[0].attributes.additionalInformation.description
    try {
      txReceipt = await this.publishFixedRateAsset(
        v3Did,
        description,
        ERC721FactoryAddress,
        nftName,
        nftSymbol,
        ownerAddress,
        cap,
        rate,
        marketFee,
        publishingMarketFeeAddress,
        publishingMarketTokenAddress,
        fixedRateExchangeAddress,
        baseTokenAddress,
        templateIndex,
        dtName,
        dtSymbol
      )
    } catch (e) {
      console.log('publishFixedRateAsset Error', e)
    }
    const nftAddress = txReceipt.events.NFTCreated.returnValues.newTokenAddress
    const erc20Address =
      txReceipt.events.TokenCreated.returnValues.newTokenAddress
    const encryptedFiles = await this.getEncryptedFiles(
      v4ProviderUrl,
      ownerAccount,
      v3Did,
      network
    )
    const v4Did = await this.generateDidv4(nftAddress)
    const ddo = await getAndConvertDDO(
      v3Did,
      v4Did,
      nftAddress,
      erc20Address,
      v3MetadataCacheUri,
      encryptedFiles
    )
    const v4Provider = await V4ProviderInstance
    const encryptedDdo = await v4Provider.encrypt(
      ddo,
      v4EncryptProviderUri || v4ProviderUrl
    )
    const dataHash = '0x' + sha256(JSON.stringify(ddo)).toString()
    const { validation, response } = await this.validateAssetAquariusV4(
      ddo,
      v4MetadataCacheUri
    )
    const isValid = response.hash === dataHash // Should be true
    if (isValid === false) {
      console.log('Asset is not valid')
      return new Error('Invalid DDO hash')
    }
    let txReceipt2
    try {
      txReceipt2 = await this.updateMetadata(
        ownerAddress,
        txReceipt,
        metaDataState,
        v4EncryptProviderUri || v4ProviderUrl,
        metaDataDecryptorAddress,
        flags,
        encryptedDdo,
        dataHash,
        [validation]
      )
    } catch (e) {
      console.log('Error', e)
    }
    return { txReceipt, txReceipt2 }
  }
  async migrateFreeAsset(
    v3Did,
    ERC721FactoryAddress,
    nftName,
    nftSymbol,
    ownerAddress,
    ownerAccount,
    cap,
    flags,
    publishingMarketFeeAddress,
    publishingMarketTokenAddress,
    metaDataState,
    metaDataDecryptorAddress,
    v4ProviderUrl,
    v3MetadataCacheUri,
    templateIndex,
    dtName,
    dtSymbol,
    network,
    dispenserData,
    v4MetadataCacheUri
  ) {
    let txReceipt
    const v3DDO = await getDDO(v3Did, v3MetadataCacheUri)
    const description =
      v3DDO.service[0].attributes.additionalInformation.description
    try {
      txReceipt = await this.publishFreeAsset(
        description,
        ERC721FactoryAddress,
        nftName,
        nftSymbol,
        ownerAddress,
        cap,
        publishingMarketFeeAddress,
        publishingMarketTokenAddress,
        templateIndex,
        dtName,
        dtSymbol,
        dispenserData
      )
    } catch (e) {
      console.log('publishFixedRateAsset Error', e)
    }
    const nftAddress = txReceipt.events.NFTCreated.returnValues.newTokenAddress
    const erc20Address =
      txReceipt.events.TokenCreated.returnValues.newTokenAddress
    const encryptedFiles = await this.getEncryptedFiles(
      v4ProviderUrl,
      ownerAccount,
      v3Did,
      network
    )
    const v4Did = await this.generateDidv4(nftAddress)
    const ddo = await getAndConvertDDO(
      v3Did,
      v4Did,
      nftAddress,
      erc20Address,
      v3MetadataCacheUri,
      encryptedFiles
    )
    const v4Provider = await V4ProviderInstance
    const encryptedDdo = await v4Provider.encrypt(ddo, v4ProviderUrl)
    const dataHash = '0x' + sha256(JSON.stringify(ddo)).toString()
    const { validation, response } = await this.validateAssetAquariusV4(
      ddo,
      v4MetadataCacheUri
    )
    const isValid = response.hash === dataHash // Should be true
    if (isValid === false) {
      console.log('Asset is not valid')
      return new Error('Invalid DDO hash')
    }
    let txReceipt2
    try {
      txReceipt2 = await this.updateMetadata(
        ownerAddress,
        txReceipt,
        metaDataState,
        v4ProviderUrl,
        metaDataDecryptorAddress,
        flags,
        encryptedDdo,
        dataHash,
        [validation]
      )
    } catch (e) {
      console.log('Error', e)
    }
    return { txReceipt, txReceipt2 }
  }
}
//# sourceMappingURL=Migration.js.map
