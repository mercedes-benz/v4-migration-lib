import { assert, expect } from 'chai'
import { AbiItem } from 'web3-utils/types'
import { TestContractHandler } from '../TestContractHandler'
import Web3 from 'web3'
import { Migration } from '../../src/migration/Migration'
import Dispenser from './../../src/artifacts/Dispenser.json'
import ERC721Factory from './../../src/artifacts/ERC721Factory.json'
import ERC721Template from './../../src/artifacts/ERC721Template.json'
import SideStaking from './../../src/artifacts/SideStaking.json'
import Router from './../../src/artifacts/FactoryRouter.json'
import ERC20Template from './../../src/artifacts/ERC20Template.json'
import FixedRate from './../../src/artifacts/FixedRateExchange.json'
import OPFCommunityFeeCollector from './../../src/artifacts/OPFCommunityFeeCollector.json'
import PoolTemplate from './../../src/artifacts/BPool.json'
import { Provider } from '../../src/provider/Provider'
import { getAndConvertDDO } from '../../src/DDO/convertDDO'
import { ZERO_ADDRESS, ONE_ADDRESS } from '../../src/utils/Constants'
import BN from 'bn.js'
const web3 = new Web3('http://127.0.0.1:8545')
const providerUrl = 'http://127.0.0.1:8030'
describe('Migration test', () => {
  let v3DtOwner: string
  let user1: string
  let user2: string
  let daemon: string
  let v3dt1Address: string
  let v3pool1Address: string
  let migrationAddress: string
  let contracts: TestContractHandler
  let migration: Migration

  it('should deploy contracts', async () => {
    contracts = new TestContractHandler(
      web3,
      ERC721Template.abi as AbiItem[],
      ERC20Template.abi as AbiItem[],
      PoolTemplate.abi as AbiItem[],
      ERC721Factory.abi as AbiItem[],
      Router.abi as AbiItem[],
      SideStaking.abi as AbiItem[],
      FixedRate.abi as AbiItem[],
      Dispenser.abi as AbiItem[],
      OPFCommunityFeeCollector.abi as AbiItem[],

      ERC721Template.bytecode,
      ERC20Template.bytecode,
      PoolTemplate.bytecode,
      ERC721Factory.bytecode,
      Router.bytecode,
      SideStaking.bytecode,
      FixedRate.bytecode,
      Dispenser.bytecode,
      OPFCommunityFeeCollector.bytecode
    )
    await contracts.getAccounts()
    v3DtOwner = contracts.accounts[0]
    user1 = contracts.accounts[1]
    user2 = contracts.accounts[2]
    daemon = contracts.accounts[3]

    await contracts.deployContracts(v3DtOwner, daemon, Router.abi as AbiItem[])
    //console.log(contracts)
    v3dt1Address = contracts.v3dt1Address

    v3pool1Address = contracts.v3pool1Address

    migrationAddress = contracts.migrationAddress
  })

  it('should initiate Migration instance', async () => {
    migration = new Migration(web3)
    assert(migration != undefined, 'Failed to initialize Migration class')
  })

  describe('Migration has started, status == allowed', () => {
    it('Migration successfully starts', async () => {
      await migration.startMigration(
        v3DtOwner,
        migrationAddress,
        v3dt1Address,
        v3pool1Address,
        'didV3',
        'tokenURI',
        ['NFTname', 'NFTsymbol'],
        ['ERC20name', 'ERC20symbol']
      )
      const poolStatus = await migration.getPoolStatus(
        migrationAddress,
        v3pool1Address
      )
      expect(poolStatus.status).to.equal('1')
      expect(poolStatus.poolV3Address).to.equal(v3pool1Address)
      expect(poolStatus.didV3).to.equal('didV3')
    })
    // Now we add enough shares so we can unit test with threshold met
    it('#addShares - all user add their LPTs, Threshold is MET', async () => {
      expect(
        (
          await migration.getShareAllocation(
            migrationAddress,
            v3pool1Address,
            v3DtOwner
          )
        ).userV3Shares
      ).to.equal(web3.utils.toWei('0'))
      expect(
        (
          await migration.getShareAllocation(
            migrationAddress,
            v3pool1Address,
            user1
          )
        ).userV3Shares
      ).to.equal(web3.utils.toWei('0'))
      expect(
        (
          await migration.getShareAllocation(
            migrationAddress,
            v3pool1Address,
            user2
          )
        ).userV3Shares
      ).to.equal(web3.utils.toWei('0'))

      await migration.approve(
        v3DtOwner,
        v3pool1Address,
        migrationAddress,
        web3.utils.toWei('50')
      )
      await migration.approve(
        user1,
        v3pool1Address,
        migrationAddress,
        web3.utils.toWei('30')
      )
      await migration.approve(
        user2,
        v3pool1Address,
        migrationAddress,
        web3.utils.toWei('20')
      )

      await migration.addShares(
        v3DtOwner,
        migrationAddress,
        v3pool1Address,
        web3.utils.toWei('50')
      )
      await migration.addShares(
        user1,
        migrationAddress,
        v3pool1Address,
        web3.utils.toWei('30')
      )
      // we don't add the full amount because actually the pool can't be fully removed (balancer pool logic requires 1000 wei or around to be kept)
      await migration.addShares(
        user2,
        migrationAddress,
        v3pool1Address,
        web3.utils.toWei('20')
      )

      expect(
        (
          await migration.getShareAllocation(
            migrationAddress,
            v3pool1Address,
            v3DtOwner
          )
        ).userV3Shares
      ).to.equal(web3.utils.toWei('50'))
      expect(
        (
          await migration.getShareAllocation(
            migrationAddress,
            v3pool1Address,
            user1
          )
        ).userV3Shares
      ).to.equal(web3.utils.toWei('30'))
      expect(
        (
          await migration.getShareAllocation(
            migrationAddress,
            v3pool1Address,
            user2
          )
        ).userV3Shares
      ).to.equal(web3.utils.toWei('20'))

      expect(
        await migration.thresholdMet(migrationAddress, v3pool1Address)
      ).to.equal(true)
    })

    it('# check current states and advance blocks AFTER deadline', async () => {
      const poolStatus = await migration.getPoolStatus(
        migrationAddress,
        v3pool1Address
      )
      expect(poolStatus.status).to.equal('1')
      expect(poolStatus.poolV3Address).to.equal(v3pool1Address)
      expect(poolStatus.didV3).to.equal('didV3')
      expect(
        await migration.thresholdMet(migrationAddress, v3pool1Address)
      ).to.equal(true)
      expect(
        parseInt(
          (await migration.getPoolStatus(migrationAddress, v3pool1Address))
            .deadline
        )
      ).gt(await web3.eth.getBlockNumber())
      // we need to advance some block so we send some transactions

      for (let i = 0; i < 100; i++) {
        // each one advance a block
        await web3.eth.sendTransaction({
          from: user1,
          to: user2,
          value: '0'
        })
      }
      // deadline has passed we can now liquidate anytime
      expect(await web3.eth.getBlockNumber()).gt(
        parseInt(
          (await migration.getPoolStatus(migrationAddress, v3pool1Address))
            .deadline
        )
      )

      expect(
        await migration.thresholdMet(migrationAddress, v3pool1Address)
      ).to.equal(true)
    })
    it('#migratePoolAsset - daemon should SUCCEED to call if status == migrated', async () => {
      const flagsAndData = [
        web3.utils.asciiToHex('0x01'),
        web3.utils.asciiToHex('SomeData')
      ]
      const metaDataState = '1'

      const txReceipt = await migration.liquidateAndCreatePool(
        daemon,
        migrationAddress,
        v3pool1Address,
        ['1', '1']
      )
      console.log(txReceipt)
      assert(txReceipt.events.NewPool.event === 'NewPool')
      const args = txReceipt.events.NewPool.returnValues
      console.log(args)
      const did1 = 'did:op:a2B8b3aC4207CFCCbDe4Ac7fa40214fd00A2BA71'
      const ddo1 = await getAndConvertDDO(
        did1,
        args.nftAddress,
        args.newDTAddress
      )
      console.log(ddo1)
      // assert(
      //   ddo1.metadata.name === '🖼  DataUnion.app - Image & Annotation Vault  📸'
      // )
      // assert(ddo1.metadata.type === 'dataset')

      const providerInstance = new Provider()
      const valid = await providerInstance.isValidProvider(providerUrl)
      assert(valid === true)

      // Pool migration has been completed (index 3)
      //expect(args.status).to.equal('3')

      // const tokensDetails = await migration.getTokensDetails(
      //   migrationAddress,
      //   v3pool1Address
      // )
      const nft = new web3.eth.Contract(
        ERC721Template.abi as AbiItem[],
        args.nftAddress
      )

      // NFT has been transferred to the owner
      expect(await nft.methods.ownerOf(1).call()).to.equal(v3DtOwner)
    })
  })
})
