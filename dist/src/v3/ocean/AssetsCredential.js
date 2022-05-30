/**
 * checks if a credential list exists for a specific action
 * @param  {credentials} Credentials list of crentials from ddo
 * @param {credentialType} string e.g. address / credential3Box
 * @param {credentialAction} CredentialAction allow or deny
 * @return {boolean}
 */
export function checkCredentialExist(
  credentials,
  credentialType,
  credentialAction
) {
  let isExist = false
  if (credentialAction === 'allow') {
    if (credentials && credentials.allow) {
      const allowList = credentials.allow.find(
        (credential) => credential.type === credentialType
      )
      isExist = allowList && allowList.values.length > 0
    }
    return isExist
  } else {
    if (credentials && credentials.deny) {
      const dennyList = credentials.deny.find(
        (credential) => credential.type === credentialType
      )
      isExist = dennyList && dennyList.values.length > 0
    }
    return isExist
  }
}
/**
 * Removes all credentials of a certain type for a specific action
 * @param  {ddo} DDO
 * @param {credentialType} string e.g. address / credential3Box
 * @param {credentialAction} CredentialAction allow or deny
 * @return {DDO}
 */
export function removeCredentialDetail(ddo, credentialType, credentialAction) {
  const exists = checkCredentialExist(
    ddo.credentials,
    credentialType,
    credentialAction
  )
  if (credentialAction === 'allow') {
    if (exists) {
      ddo.credentials.allow = ddo.credentials.allow.filter(
        (credential) => credential.type !== credentialType
      )
    }
    if (ddo.credentials && !ddo.credentials.allow) {
      ddo.credentials = {
        deny: ddo.credentials && ddo.credentials.deny
      }
    }
  } else {
    if (exists) {
      ddo.credentials.deny = ddo.credentials.deny.filter(
        (credential) => credential.type !== credentialType
      )
    }
    if (ddo.credentials && !ddo.credentials.deny) {
      ddo.credentials = {
        allow: ddo.credentials && ddo.credentials.allow
      }
    }
  }
  return ddo
}
/**
 * Adds values to credentials of a certain type for a specific action
 * @param  {ddo} DDO
 * @param {credentialType} string e.g. address / credential3Box
 * @param {list} string[] list of values
 * @param {credentialAction} CredentialAction allow or deny
 * @return {DDO}
 */
export function addCredentialDetail(
  ddo,
  credentialType,
  list,
  credentialAction
) {
  const newCredentialDetail = {
    type: credentialType,
    values: list
  }
  if (credentialAction === 'allow') {
    if (ddo.credentials && ddo.credentials.allow) {
      ddo.credentials.allow.push(newCredentialDetail)
    } else {
      const newCredentials = {
        allow: [newCredentialDetail],
        deny: ddo.credentials && ddo.credentials.deny
      }
      ddo.credentials = newCredentials
    }
  } else {
    if (ddo.credentials && ddo.credentials.deny) {
      ddo.credentials.deny.push(newCredentialDetail)
    } else {
      const newCredential = {
        allow: ddo.credentials && ddo.credentials.allow,
        deny: [newCredentialDetail]
      }
      ddo.credentials = newCredential
    }
  }
  return ddo
}
/**
 * Updates credentials of a certain type for a specific action
 * @param  {ddo} DDO
 * @param {credentialType} string e.g. address / credential3Box
 * @param {list} string[] list of values
 * @param {credentialAction} CredentialAction allow or deny
 * @return {DDO}
 */
export function updateCredentialDetail(
  ddo,
  credentialType,
  list,
  credentialAction
) {
  const exists = checkCredentialExist(
    ddo.credentials,
    credentialType,
    credentialAction
  )
  if (credentialAction === 'allow') {
    if (exists) {
      ddo.credentials.allow.find((credential) => {
        if (credential.type === credentialType) {
          credential.values = list
        }
      })
    } else {
      ddo = addCredentialDetail(ddo, credentialType, list, credentialAction)
    }
  } else {
    if (exists) {
      ddo.credentials.deny.find((credential) => {
        if (credential.type === credentialType) {
          credential.values = list
        }
      })
    } else {
      ddo = addCredentialDetail(ddo, credentialType, list, credentialAction)
    }
  }
  return ddo
}
//# sourceMappingURL=AssetsCredential.js.map
