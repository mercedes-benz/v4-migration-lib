import { DDO } from '../ddo/DDO'
import DID from './DID'
import {
  SubscribablePromise,
  didNoZeroX,
  didPrefixed,
  assetResolve
} from '../utils'
import { Instantiable } from '../Instantiable.abstract'
import { WebServiceConnector } from './utils/WebServiceConnector'
import BigNumber from 'bignumber.js'
import { Provider } from '../provider/Provider'
import { isAddress } from 'web3-utils'
import {
  updateCredentialDetail,
  removeCredentialDetail
} from './AssetsCredential'
import { EventAccessControl } from './EventAccessControl'
export var CreateProgressStep
;(function (CreateProgressStep) {
  CreateProgressStep[(CreateProgressStep['CreatingDataToken'] = 0)] =
    'CreatingDataToken'
  CreateProgressStep[(CreateProgressStep['DataTokenCreated'] = 1)] =
    'DataTokenCreated'
  CreateProgressStep[(CreateProgressStep['EncryptingFiles'] = 2)] =
    'EncryptingFiles'
  CreateProgressStep[(CreateProgressStep['FilesEncrypted'] = 3)] =
    'FilesEncrypted'
  CreateProgressStep[(CreateProgressStep['StoringDdo'] = 4)] = 'StoringDdo'
  CreateProgressStep[(CreateProgressStep['DdoStored'] = 5)] = 'DdoStored'
})(CreateProgressStep || (CreateProgressStep = {}))
export var OrderProgressStep
;(function (OrderProgressStep) {
  OrderProgressStep[(OrderProgressStep['TransferDataToken'] = 0)] =
    'TransferDataToken'
})(OrderProgressStep || (OrderProgressStep = {}))
/**
 * Assets submodule of Ocean Protocol.
 */
export class Assets extends Instantiable {
  /**
   * Returns the instance of Assets.
   * @return {Promise<Assets>}
   */
  static async getInstance(config) {
    const instance = new Assets()
    instance.setInstanceConfig(config)
    return instance
  }
  /**
   * Creates a new DDO. After this, Call ocean.onChainMetadata.to publish
   * @param  {Metadata} metadata DDO metadata.
   * @param  {Account}  publisher Publisher account.
   * @param  {list} services list of Service description documents
   * @param {String} dtAddress existing Data Token Address
   * @param {String} cap Maximum cap (Number) - will be converted to wei
   * @param {String} name Token name
   * @param {String} symbol Token symbol
   * @param {String} providerUri
   * @return {SubscribablePromise<CreateProgressStep, DDO>}
   */
  create(
    metadata,
    publisher,
    services = [],
    dtAddress,
    cap,
    name,
    symbol,
    providerUri
  ) {
    if (dtAddress && !isAddress(dtAddress)) {
      this.logger.error(
        `Passed Data Token address ${dtAddress} is not valid. Aborting publishing.`
      )
      return null
    }
    this.logger.log('Creating asset')
    return new SubscribablePromise(async (observer) => {
      if (services.length === 0) {
        this.logger.log('You have no services. Are you sure about this?')
      }
      const { datatokens } = this.ocean
      if (!dtAddress) {
        this.logger.log('Creating datatoken')
        observer.next(CreateProgressStep.CreatingDataToken)
        // const metadataCacheUri = this.ocean.metadataCache.getURI()
        // const jsonBlob = { t: 1, url: metadataCacheUri }
        dtAddress = await datatokens.create(
          '',
          publisher.getId(),
          cap,
          name,
          symbol
        )
        if (!isAddress(dtAddress)) {
          this.logger.error(
            `Created Data Token address ${dtAddress} is not valid. Aborting publishing.`
          )
          return null
        }
        this.logger.log(`DataToken ${dtAddress} created`)
        observer.next(CreateProgressStep.DataTokenCreated)
      }
      const did = DID.generate(dtAddress)
      this.logger.log('Encrypting files')
      observer.next(CreateProgressStep.EncryptingFiles)
      let provider
      if (providerUri) {
        provider = await Provider.getInstance(this.instanceConfig)
        await provider.setBaseUrl(providerUri)
      } else provider = this.ocean.provider
      const encryptedFiles = await provider.encrypt(
        did.getDid(),
        metadata.main.files,
        publisher
      )
      this.logger.log('Files encrypted')
      observer.next(CreateProgressStep.FilesEncrypted)
      let indexCount = 0
      // create ddo itself
      const ddo = new DDO({
        id: did.getDid(),
        dataToken: dtAddress,
        authentication: [
          {
            type: 'RsaSignatureAuthentication2018',
            publicKey: did.getDid()
          }
        ],
        publicKey: [
          {
            id: did.getDid(),
            type: 'EthereumECDSAKey',
            owner: publisher.getId()
          }
        ],
        service: [
          {
            type: 'metadata',
            attributes: {
              // Default values
              status: {
                isListed: true,
                isRetired: false,
                isOrderDisabled: false
              },
              // Overwrites defaults
              ...metadata,
              encryptedFiles,
              // Cleaning not needed information
              main: {
                ...metadata.main,
                files: metadata.main.files.map((file, index) => ({
                  ...file,
                  index,
                  url: undefined
                }))
              }
            }
          },
          ...services
        ]
          // Remove duplications
          .reverse()
          .filter(
            ({ type }, i, list) =>
              list.findIndex(({ type: t }) => t === type) === i
          )
          .reverse()
          // Adding index
          .map((_) => ({
            ..._,
            index: indexCount++
          }))
      })
      await ddo.addProof(this.ocean, publisher.getId())
      ddo.dataTokenInfo = {
        name: name,
        symbol: symbol,
        address: dtAddress,
        cap: parseFloat(cap)
      }
      return ddo
      /* Remeber to call ocean.onChainMetadata.publish after creating the DDO.
            
            this.logger.log('Storing DDO')
            observer.next(CreateProgressStep.StoringDdo)
            const storeTx = await this.ocean.onChainMetadata.publish(
              ddo.id,
              ddo,
              publisher.getId()
            )
            this.logger.log('DDO stored ' + ddo.id)
            observer.next(CreateProgressStep.DdoStored)
            if (storeTx) return ddo
            else return null
            */
    })
  }
  /**
   * Returns a DDO by DID.
   * @param  {string} did Decentralized ID.
   * @return {Promise<DDO>}
   */
  async resolve(did) {
    return this.ocean.metadataCache.retrieveDDO(did)
  }
  /**    Metadata updates
   *  Don't forget to call ocean.OnChainmetadataCache.update after using this functions
   * ie:  ocean.OnChainmetadataCache.update(ddo.id,ddo,account.getId())
   */
  /**
   * Edit Metadata for a DID.
   * @param  {ddo} DDO
   * @param  {newMetadata}  EditableMetadata Metadata fields & new values.
   * @return {Promise<DDO>} the new DDO
   */
  async editMetadata(ddo, newMetadata) {
    if (!ddo) return null
    for (let i = 0; i < ddo.service.length; i++) {
      if (ddo.service[i].type !== 'metadata') continue
      if (newMetadata.title)
        ddo.service[i].attributes.main.name = newMetadata.title
      if (newMetadata.author)
        ddo.service[i].attributes.main.author = newMetadata.author
      if (!ddo.service[i].attributes.additionalInformation)
        ddo.service[i].attributes.additionalInformation = Object()
      if (newMetadata.description)
        ddo.service[i].attributes.additionalInformation.description =
          newMetadata.description
      if (newMetadata.links) {
        ddo.service[i].attributes.additionalInformation.links =
          newMetadata.links
      } else {
        ddo.service[i].attributes.additionalInformation.links = []
      }
      if (newMetadata.status?.isOrderDisabled !== undefined) {
        !ddo.service[i].attributes.status
          ? (ddo.service[i].attributes.status = {
              isOrderDisabled: newMetadata.status.isOrderDisabled
            })
          : (ddo.service[i].attributes.status.isOrderDisabled =
              newMetadata.status.isOrderDisabled)
      }
    }
    return ddo
  }
  /**
   * Update Credentials attribute in DDO
   * @param  {ddo} DDO
   * @param {credentialType} string e.g. address / credentail3Box
   * @param {allowList} string[] List of allow credential
   * @param {denyList} string[] List of deny credential
   * @return {Promise<DDO>} Updated DDO
   */
  async updateCredentials(ddo, credentialType, allowList, denyList) {
    let newDDo
    if (allowList && allowList.length > 0) {
      newDDo = updateCredentialDetail(ddo, credentialType, allowList, 'allow')
    } else {
      newDDo = removeCredentialDetail(ddo, credentialType, 'allow')
    }
    if (denyList && denyList.length > 0) {
      newDDo = updateCredentialDetail(ddo, credentialType, denyList, 'deny')
    } else {
      newDDo = removeCredentialDetail(ddo, credentialType, 'deny')
    }
    return newDDo
  }
  /**
   * check if a credential can consume a dataset
   * @param  {ddo} DDO
   * @param {credentialType} string e.g. address / credentail3Box
   * @param {value} string credential
   * @return {Consumable} allowed  0 = OK , 2 - Credential not in allow list, 3 - Credential in deny list
   */
  checkCredential(ddo, credentialType, value) {
    let status = 0
    let message = 'All good'
    let result = true
    if (ddo.credentials) {
      if (ddo.credentials.allow && ddo.credentials.allow.length > 0) {
        const allowList = ddo.credentials.allow.find(
          (credentail) => credentail.type === credentialType
        )
        if (allowList && !allowList.values.includes(value)) {
          status = 2
          message =
            'Access is denied, your wallet address is not found on allow list'
          result = false
        }
      }
      if (ddo.credentials.deny && ddo.credentials.deny.length > 0) {
        const denyList = ddo.credentials.deny.find(
          (credentail) => credentail.type === credentialType
        )
        if (denyList && denyList.values.includes(value)) {
          status = 3
          message =
            'Access is denied, your wallet address is found on deny list'
          result = false
        }
      }
    }
    return { status, message, result }
  }
  /**
   * Publish DDO on chain.
   * @param  {ddo} DDO
   * @param {String} consumerAccount
   * @param {boolean} encrypt
   * @return {Promise<TransactionReceipt>} transaction
   */
  async publishDdo(ddo, consumerAccount, encrypt = false) {
    return await this.ocean.onChainMetadata.publish(
      ddo.id,
      ddo,
      consumerAccount,
      encrypt
    )
  }
  /**
   * Update Metadata on chain.
   * @param  {ddo} DDO
   * @param {String} consumerAccount
   * @return {Promise<TransactionReceipt>} transaction
   */
  async updateMetadata(ddo, consumerAccount) {
    return await this.ocean.onChainMetadata.update(ddo.id, ddo, consumerAccount)
  }
  /**
   * Edit Service Timeouts
   * @param  {ddo} DDO if empty, will trigger a retrieve
   * @param  {number} serviceIndex Index of the compute service in the DDO.
   * @param  {number} timeout New timeout setting
   * @return {Promise<DDO>}
   */
  async editServiceTimeout(ddo, serviceIndex, timeout) {
    if (!ddo) return null
    if (typeof ddo.service[serviceIndex] === 'undefined') return null
    if (timeout < 0) return null
    ddo.service[serviceIndex].attributes.main.timeout = parseInt(
      timeout.toFixed()
    )
    return ddo
  }
  /**    End metadata updates   */
  /**
   * Returns the creator of a asset.
   * @param  {DDO|string} asset DID Descriptor Object containing all the data related to an asset or a Decentralized identifier.
   * @return {Promise<string>} Returns eth address
   */
  async creator(asset) {
    const { did, ddo } = await assetResolve(asset, this.ocean)
    const checksum = ddo.getChecksum()
    const { creator, signatureValue } = ddo.proof
    const signer = await this.ocean.utils.signature.verifyText(
      checksum,
      signatureValue
    )
    if (signer.toLowerCase() !== creator.toLowerCase()) {
      this.logger.warn(
        `Owner of ${did} doesn't match. Expected ${creator} instead of ${signer}.`
      )
    }
    return creator
  }
  async getServiceByType(asset, serviceType) {
    const { ddo } = await assetResolve(asset, this.ocean)
    let service
    const services = ddo.service
    services.forEach((serv) => {
      if (serv.type.toString() === serviceType) {
        service = serv
      }
    })
    return service
  }
  async getServiceByIndex(asset, serviceIndex) {
    const { ddo } = await assetResolve(asset, this.ocean)
    let service
    const services = ddo.service
    services.forEach((serv) => {
      if (serv.index === serviceIndex) {
        service = serv
      }
    })
    return service
  }
  /**
   * Search over the assets using a query.
   * @param  {SearchQuery} query Query to filter the assets.
   * @return {Promise<QueryResult>}
   */
  async query(query) {
    return this.ocean.metadataCache.queryMetadata(query)
  }
  /**
   * Creates an access service
   * @param {Account} creator
   * @param {String} cost  number of datatokens needed for this service
   * @param {String} datePublished
   * @param {Number} timeout
   * @param {String} providerUri
   * @param {ServiceCustomParametersRequired} requiredParameters
   * @return {Promise<ServiceAccess>} service
   */
  async createAccessServiceAttributes(
    creator,
    cost,
    datePublished,
    timeout = 0,
    providerUri,
    requiredParameters
  ) {
    const service = {
      type: 'access',
      index: 2,
      serviceEndpoint: providerUri || this.ocean.provider.url,
      attributes: {
        main: {
          creator: creator.getId(),
          datePublished,
          cost,
          timeout: timeout,
          name: 'dataAssetAccess'
        }
      }
    }
    if (requiredParameters?.userCustomParameters)
      service.attributes.userCustomParameters =
        requiredParameters.userCustomParameters
    if (requiredParameters?.algoCustomParameters)
      service.attributes.algoCustomParameters =
        requiredParameters.algoCustomParameters
    return service
  }
  /**
   * Initialize a service
   * Can be used to compute totalCost for ordering a service
   * @param {DDO|string} asset DID Descriptor Object containing all the data related to an asset or a Decentralized identifier.
   * @param {String} serviceType
   * @param {String} consumerAddress
   * @param {Number} serviceIndex
   * @param {String} serviceEndpoint
   * @param {UserCustomParameters} userCustomParameters
   * @return {Promise<any>} Order details
   */
  async initialize(
    asset,
    serviceType,
    consumerAddress,
    serviceIndex = -1,
    serviceEndpoint,
    userCustomParameters
  ) {
    const provider = await Provider.getInstance(this.instanceConfig)
    await provider.setBaseUrl(serviceEndpoint)
    const res = await provider.initialize(
      asset,
      serviceIndex,
      serviceType,
      consumerAddress,
      userCustomParameters
    )
    if (res === null) return null
    const providerData = JSON.parse(res)
    return providerData
  }
  /**
   * Orders & pays for a service
   * @param {DDO|string} asset DID Descriptor Object containing all the data related to an asset or a Decentralized identifier.
   * @param {String} serviceType
   * @param {String} payerAddress
   * @param {Number} serviceIndex
   * @param {String} mpAddress Marketplace fee collector address
   * @param {String} consumerAddress Optionally, if the consumer is another address than payer
   * @param {UserCustomParameters} userCustomParameters
   * @return {Promise<String>} transactionHash of the payment
   */
  async order(
    asset,
    serviceType,
    payerAddress,
    serviceIndex = -1,
    mpAddress,
    consumerAddress,
    userCustomParameters,
    authService = 'json',
    searchPreviousOrders = true
  ) {
    let service
    const { ddo } = await assetResolve(asset, this.ocean)
    const consumable = await this.isConsumable(
      ddo,
      payerAddress,
      'address',
      authService
    )
    if (!consumable.result) {
      throw new Error(`Order asset failed, ` + consumable.message)
    }
    if (!consumerAddress) consumerAddress = payerAddress
    if (serviceIndex === -1) {
      service = await this.getServiceByType(ddo, serviceType)
      serviceIndex = service.index
    } else {
      service = await this.getServiceByIndex(ddo, serviceIndex)
      serviceType = service.type
    }
    // TODO validate userCustomParameters
    if (
      !(await this.isUserCustomParametersValid(
        service.attributes.userCustomParameters,
        userCustomParameters
      ))
    ) {
      throw new Error(
        `Order asset failed, Missing required fiels in userCustomParameters`
      )
    }
    try {
      const providerData = await this.initialize(
        ddo,
        serviceType,
        payerAddress,
        serviceIndex,
        service.serviceEndpoint,
        userCustomParameters
      )
      if (!providerData)
        throw new Error(
          `Order asset failed, Failed to initialize service to compute totalCost for ordering`
        )
      if (searchPreviousOrders) {
        const previousOrder =
          await this.ocean.datatokens.getPreviousValidOrders(
            providerData.dataToken,
            providerData.numTokens,
            serviceIndex,
            service.attributes.main.timeout,
            consumerAddress
          )
        if (previousOrder) return previousOrder
      }
      const balance = new BigNumber(
        await this.ocean.datatokens.balance(
          providerData.dataToken,
          payerAddress
        )
      )
      const totalCost = new BigNumber(String(providerData.numTokens))
      if (balance.isLessThan(totalCost)) {
        this.logger.error(
          'ERROR: Not enough funds Needed ' +
            totalCost.toString() +
            ' but balance is ' +
            balance.toString()
        )
        throw new Error(
          'ERROR: Not enough funds Needed ' +
            totalCost.toString() +
            ' but balance is ' +
            balance.toString()
        )
      }
      const txid = await this.ocean.datatokens.startOrder(
        providerData.dataToken,
        consumerAddress,
        String(providerData.numTokens),
        serviceIndex,
        mpAddress,
        payerAddress
      )
      if (txid) return txid.transactionHash
    } catch (e) {
      this.logger.error(`ERROR: Failed to order a service : ${e.message}`)
      throw new Error(`${e.message}`)
    }
  }
  // marketplace flow
  async download(
    asset,
    txId,
    tokenAddress,
    consumerAccount,
    destination,
    index = -1,
    userCustomParameters
  ) {
    const { did, ddo } = await assetResolve(asset, this.ocean)
    const { attributes } = ddo.findServiceByType('metadata')
    const service = ddo.findServiceByType('access')
    const { files } = attributes.main
    const { serviceEndpoint } = service
    if (!serviceEndpoint) {
      throw new Error(
        'Consume asset failed, service definition is missing the `serviceEndpoint`.'
      )
    }
    this.logger.log('Consuming files')
    destination = destination
      ? `${destination}/datafile.${ddo.shortId()}.${service.index}/`
      : undefined
    const provider = await Provider.getInstance(this.instanceConfig)
    await provider.setBaseUrl(serviceEndpoint)
    await provider.download(
      did,
      txId,
      tokenAddress,
      service.type,
      service.index.toString(),
      destination,
      consumerAccount,
      files,
      index,
      userCustomParameters
    )
    return true
  }
  // simple flow
  async simpleDownload(dtAddress, serviceEndpoint, txId, account) {
    let consumeUrl = serviceEndpoint
    consumeUrl += `?consumerAddress=${account}`
    consumeUrl += `&tokenAddress=${dtAddress}`
    consumeUrl += `&transferTxId=${txId}`
    const serviceConnector = new WebServiceConnector(
      this.logger,
      this.instanceConfig?.config?.requestTimeout
    )
    try {
      await serviceConnector.downloadFile(consumeUrl)
    } catch (e) {
      this.logger.error('Error consuming assets')
      this.logger.error(e)
      throw e
    }
    return serviceEndpoint
  }
  /**
   * get Order History
   * @param {Account} account
   * @param {string} serviceType Optional, filter by
   * @param {number} fromBlock Optional, start at block
   * @return {Promise<OrderHistory[]>} transactionHash of the payment
   */
  async getOrderHistory(account, serviceType, fromBlock) {
    const results = []
    const address = account.getId().toLowerCase()
    const { datatokens } = this.ocean
    const topic1 = '0x000000000000000000000000' + address.substring(2)
    const topic0 = datatokens.getStartOrderEventSignature()
    const events = await this.web3.eth.getPastLogs({
      topics: [topic0, null, topic1],
      fromBlock: fromBlock || 0,
      toBlock: 'latest'
    })
    for (let i = 0; i < events.length; i++) {
      const order = {
        dtAddress: events[i].address,
        timestamp: 0,
        transactionHash: events[i].transactionHash,
        amount: null,
        consumer:
          '0x' + events[i].topics[1].substring(events[i].topics[1].length - 40),
        payer:
          '0x' + events[i].topics[2].substring(events[i].topics[2].length - 40)
      }
      try {
        const params = this.web3.eth.abi.decodeParameters(
          ['uint256', 'uint256', 'uint256', 'uint256'],
          events[i].data
        )
        order.serviceId = parseInt(params[1])
        order.timestamp = parseInt(params[2])
        order.amount = this.web3.utils.fromWei(params[0])
        order.did = didPrefixed(didNoZeroX(order.dtAddress))
        const service = await this.getServiceByIndex(order.did, order.serviceId)
        order.serviceType = service.type
        if (!serviceType || (serviceType && serviceType === service.type))
          results.push(order)
      } catch (e) {
        console.error(e)
      }
    }
    return results
  }
  /**
   *
   * @param {DDO} ddo
   * @param {consumer} string
   * @return {Promise<Consumable>}
   */
  async isConsumable(ddo, consumer, credentialsType, authService) {
    if (!ddo) throw new Error('ERROR: DDO does not exist')
    const allowedConsume = { status: 0, message: 'All good', result: true }
    const orderDisabled = {
      status: 1,
      message:
        'Ordering this asset has been temporarily disabled by the publisher.',
      result: false
    }
    const denyConsume = {
      status: 2,
      message: 'Consume access is denied.',
      result: false
    }
    const metadata = ddo.findServiceByType('metadata')
    if (metadata.attributes.status?.isOrderDisabled) return orderDisabled
    const config = this.instanceConfig
    if (consumer && config?.config?.rbacUri) {
      const eventAccessControl = await EventAccessControl.getInstance(
        this.instanceConfig
      )
      const isPermit = await eventAccessControl.isPermit(
        'market',
        'consume',
        authService,
        consumer,
        credentialsType,
        ddo.id
      )
      if (!isPermit) return denyConsume
    }
    return allowedConsume
  }
  /**
   * Validate custom user parameters (user & algorithms)
   * @param {ServiceCustomParameter[]} serviceCustomParameters
   * @param {UserCustomParameters} userCustomParameters
   * @return {Promise<Boolean>}
   */
  async isUserCustomParametersValid(
    serviceCustomParameters,
    userCustomParameters
  ) {
    if (serviceCustomParameters)
      for (const data of serviceCustomParameters) {
        const keyname = data.name
        if (
          data.required &&
          (!userCustomParameters || !userCustomParameters[keyname])
        ) {
          this.logger.error('Missing key: ' + keyname + ' from customData')
          return false
        }
      }
    return true
  }
}
//# sourceMappingURL=Assets.js.map