// functions working with er data types

/** all the sortable fields */
export const allItemStatSortFields:ItemStatsSortField[]=[
    "builds",
    "buildPercentage",
    "likes",
    "avgWinRate",
    "highestWinRate",
];

/** given an item statistics and a selected field to sort on, return that particular
 *  field with a displayname for the field */
export function getSortableField(
    itemStats:ItemsStatistics,
    sortField:ItemStatsSortField
):ItemStatsSortableValue
{
    switch (sortField)
    {
        case "builds":
        return {
            field:sortField,
            fieldDisplayName:"Builds",
            value:itemStats.totalBuilds
        };

        case "buildPercentage":
        return {
            field:sortField,
            fieldDisplayName:"Builds Percent",
            value:itemStats.buildsPercentage
        };
        case "likes":
        return {
            field:sortField,
            fieldDisplayName:"Likes",
            value:itemStats.likes
        };
        case "avgWinRate":
        return {
            field:sortField,
            fieldDisplayName:"Avg WR",
            value:itemStats.averageWinRate
        };
        case "highestWinRate":
        return {
            field:sortField,
            fieldDisplayName:"Highest WR",
            value:itemStats.highestWinRate
        };
    }

    return {
        field:sortField,
        fieldDisplayName:"Unknown sort field",
        value:-1
    };
}