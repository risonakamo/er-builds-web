// consts/functions for converting non-display names to display names

const CharacterNameToDisplayName:Record<string,string>={
    "DebiMarlene":"Debi & Marlene",
};

const WeaponNamesToDisplayName:Record<string,string>={
    "TwoHandSword":"Two-Handed Sword",

};

/** try to convert character name to display name. gives same name if missing */
export function convertCharacterNameToDisplayName(name:string):string
{
    if (name in CharacterNameToDisplayName)
    {
        return CharacterNameToDisplayName[name];
    }

    return name;
}

/** try to convert weapon name to display name. gives same name if missing */
export function convertWeaponNameToDisplayName(name:string):string
{
    if (name in WeaponNamesToDisplayName)
    {
        return WeaponNamesToDisplayName[name];
    }

    return name;
}