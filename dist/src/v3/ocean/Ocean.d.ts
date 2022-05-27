import { Accounts } from './Accounts'
import { Assets } from './Assets'
import { Versions } from './Versions'
import { OceanUtils } from './utils/Utils'
import { MetadataCache } from '../metadatacache/MetadataCache'
import { OnChainMetadata } from '../metadatacache/OnChainMetaData'
import { Provider } from '../provider/Provider'
import { DataTokens } from '../datatokens/Datatokens'
import { Network } from '../datatokens/Network'
import { Config } from '../models/Config'
import { Instantiable } from '../Instantiable.abstract'
import { Compute } from './Compute'
import { OceanPool } from '../balancer/OceanPool'
import { OceanFixedRateExchange } from '../exchange/FixedRateExchange'
import { OceanDispenser } from '../dispenser/Dispenser'
import { EventAccessControl } from './EventAccessControl'
export declare class Ocean extends Instantiable {
  static getInstance(config: Config): Promise<Ocean>
  network: Network
  provider: Provider
  eventAccessControl: EventAccessControl
  web3Provider: any
  metadataCache: MetadataCache
  onChainMetadata: OnChainMetadata
  accounts: Accounts
  assets: Assets
  compute: Compute
  datatokens: DataTokens
  pool: OceanPool
  fixedRateExchange: OceanFixedRateExchange
  OceanDispenser: OceanDispenser
  versions: Versions
  utils: OceanUtils
}