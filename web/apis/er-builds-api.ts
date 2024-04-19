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