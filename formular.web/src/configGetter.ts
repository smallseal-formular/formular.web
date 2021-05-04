import axios from 'axios';
const configPath = '/appConfig.json'

const getConfig = async (): Promise<any> => {
    const getConfigResponse = await axios.get(configPath);
    return getConfigResponse.data;
}

let publicConfig:any = {};
const  configGetterPromise = Promise.all([
    (async () => {
        publicConfig = await getConfig();
    })(),
]);

export {getConfig, publicConfig, configGetterPromise};