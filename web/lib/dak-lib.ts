// functions related to dak api

const latestErVersion:string="1.19.0";

/** convert incomplete dak asset url into full url */
export function resolveDakUrl(url:string):string
{
    return `https://cdn.dak.gg${url}`;
}

/** get dak url for a character icon */
export function resolveCharacterImg(characterName:string):string
{
    return `https://cdn.dak.gg/assets/er/game-assets/`
        +`${latestErVersion}/CharCommunity_${characterName}_S000.png`;
}