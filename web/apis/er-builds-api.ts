import axios from "axios";

const ax=axios.create({
    baseURL:`http://${window.location.hostname}:4200`,
});

/** call api to get item statistics for a target character/weapon */
export async function getBuilds(character:string,weapon:string):Promise<GroupedItemStatistics>
{
    return (await ax.get("/get-builds",{
        params:{
            character,
            weapon,
        }
    })).data;
}

/** call api to get available data files */
export async function getDatafiles():Promise<ErDataFileDescriptor[]>
{
    return (await ax.get("/get-datafiles")).data;
}

/** call api to open download config */
export async function openConfigFile():Promise<string>
{
    return (await ax.get("/open-downloader-config")).data;
}

/** call api to run downloader program */
export async function runDownloader():Promise<string>
{
    return (await ax.get("/run-downloader")).data;
}