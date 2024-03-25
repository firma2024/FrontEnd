export const environment = {
  processURL: process.env["PROCESS_URL"] || 'http://100.103.80.102:8082/api/business/process',
  lawFirmURL: process.env["LAW_FIRM_URL"] || 'http://100.103.80.102:8082/api/business/firma',
  actionsURL: process.env["ACTIONS_URL"] || 'http://100.103.80.102:8082/api/business/actuacion',
  storageURL: process.env["STORAGE_URL"] || 'http://100.103.80.102:8082/api/business/storage',
  userURL: process.env["USER_URL"] || 'http://100.103.80.102:8082/api/business/user',
  authURL: process.env["AUTH_URL"] || 'http://100.103.80.102:8080/api/auth',
  secretKey: process.env["SECRET_KEY"] || 'ThisIsASecretKey'
};
