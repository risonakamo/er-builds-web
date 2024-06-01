// functions working with er data types

import _ from "lodash";

import {DropdownItem} from "components/dropdown1/dropdown1";

/** all the sortable fields */
export const allItemStatSortFields:ItemStatsSortField[]=[
    "builds",
    "buildPercentage",
    "likes",
    "avgWinRate",
    "highestWinRate",
];

/** all the sortable fields as option containers */
export const allItemStatSortOptions: ItemStatsSortOption[]=[
    {
        field: "builds",
        displayName: "Builds"
    },
    {
        field: "buildPercentage",
        displayName: "Build Percentage"
    },
    {
        field: "likes",
        displayName: "Likes"
    },
    {
        field: "avgWinRate",
        displayName: "Average Win Rate"
    },
    {
        field: "highestWinRate",
        displayName: "Highest Win Rate"
    },
    {
        field:"buildLikeRatio",
        displayName:"Build-Like Ratio",
    }
];

/** dropdown item version of item sort options */
export const itemStatSortOptionsAsDropdownItems:DropdownItem<ItemStatsSortField>[]=_.map(
    allItemStatSortOptions,
    (sortOption:ItemStatsSortOption):DropdownItem<ItemStatsSortField>=>{
        return {
            value:sortOption.field,
            displayText:sortOption.displayName,
        };
    },
);

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
            displayValue:itemStats.totalBuilds,
            value:itemStats.totalBuilds,
        };

        case "buildPercentage":
        return {
            field:sortField,
            fieldDisplayName:"Builds Percent",
            displayValue:`${_.round(itemStats.buildsPercentage,2)}%`,
            value:itemStats.buildsPercentage,
        };

        case "likes":
        return {
            field:sortField,
            fieldDisplayName:"Likes",
            displayValue:itemStats.likes,
            value:itemStats.likes,
        };

        case "avgWinRate":
        return {
            field:sortField,
            fieldDisplayName:"Avg WR",
            displayValue:`${_.round(itemStats.averageWinRate,2)}%`,
            value:itemStats.averageWinRate,
        };

        case "highestWinRate":
        return {
            field:sortField,
            fieldDisplayName:"Highest WR",
            displayValue:`${_.round(itemStats.highestWinRate,2)}%`,
            value:itemStats.highestWinRate,
        };

        case "buildLikeRatio":
        return {
            field:sortField,
            fieldDisplayName:"Build-Like Ratio",
            displayValue:`${_.round(itemStats.buildLikeRatio,2)}`,
            value:itemStats.buildLikeRatio
        };
    }

    return {
        field:sortField,
        fieldDisplayName:"Unknown sort field",
        value:-1,
        displayValue:-1,
    };
}

/** filter datafiles to ones with the given character */
export function filterToDatafilesOfCharacter(
    datafiles:ErDataFileDescriptor[],
    character:string
):ErDataFileDescriptor[]
{
    return _.filter(
        datafiles,
        (datafile:ErDataFileDescriptor):boolean=>{
          return character==datafile.character;
        }
    );
}