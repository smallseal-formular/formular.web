import axios from 'axios';
const configPath = '/appConfig.json'

const getConfig = async (): Promise<any> => {
    const getConfigResponse = await axios.get(configPath);
    return getConfigResponse.data;
}

let publicConfigs:any = {};
const  configGetterPromise = Promise.all([
    (async () => {
        publicConfigs = await getConfig();
    })(),
]);

export {getConfig, publicConfigs, configGetterPromise};