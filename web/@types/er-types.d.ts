// these types from erdata_builds/types.go

/** possible types of items */
type ItemType =
    | "weapon"
    | "head"
    | "chest"
    | "arm"
    | "leg"

/** possible fields ItemStats can be sorted by */
type ItemStatsSortField =
    | "builds"
    | "buildPercentage"
    | "likes"
    | "avgWinRate"
    | "highestWinRate"

/** info of a single item */
interface ItemInfo2
{
    id: number
    name: string

    tooltip: string

    imageUrl: string
    backgroundImageUrl: string

    itemType: ItemType
}

/** computed statistics about a single item */
interface ItemsStatistics
{
    itemInfo: ItemInfo2

    totalBuilds: number
    buildsPercentage: number

    likes: number

    totalWinRate: number
    averageWinRate: number
    highestWinRate: number
}

/** extracted sortable field */
interface ItemStatsSortableValue
{
    fieldDisplayName: string
    field: ItemStatsSortField
    value: number|string
}