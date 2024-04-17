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