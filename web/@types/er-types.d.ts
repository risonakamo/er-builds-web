// these types from erdata_builds/types.go

/** possible types of items */
type ItemType =
    | "weapon"
    | "head"
    | "chest"
    | "arm"
    | "leg"
    | "tacskill"
    | "augment"
    | "late"

/** possible fields ItemStats can be sorted by */
type ItemStatsSortField =
    | "builds"
    | "buildPercentage"
    | "likes"
    | "avgWinRate"
    | "highestWinRate"
    | "buildLikeRatio"

/** dak gg character name enums */
type CharacterName =
    | "DebiMarlene"
    | "Abigail"
    | "Tia"

/** list of item statistics grouped by their type
    key: the item type
    val: all item statistics objs that have this type */
type GroupedItemStatistics=Record<ItemType,ItemsStatistics[]>

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

    buildLikeRatio: number

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
    displayValue: number|string
}

/** a sort field and its display name for use in select dropdowns */
interface ItemStatsSortOption
{
    field: ItemStatsSortField
    displayName: string
}

/** information about an er data file */
interface ErDataFileDescriptor
{
    character:string
    weapon:string

    filename:string
}