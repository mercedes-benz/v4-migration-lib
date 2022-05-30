export function isDdo(arg) {
  return arg.id !== undefined
}
export async function assetResolve(asset, ocean) {
  if (isDdo(asset)) {
    const did = asset.id
    const ddo = asset
    return { did, ddo }
  } else {
    const ddo = await ocean.assets.resolve(asset)
    const did = ddo.id
    return { did, ddo }
  }
}
//# sourceMappingURL=AssetResolverHelper.js.map
