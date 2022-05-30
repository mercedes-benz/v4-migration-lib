/**
 * Simple blocking sleep function
 */
export async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
//# sourceMappingURL=General.js.map
