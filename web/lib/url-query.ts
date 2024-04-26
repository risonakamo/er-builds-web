/** get selected character url args */
export function getSelectedCharacterUrlArgs():SelectedCharacterUrlArgs
{
    const params=new URLSearchParams(location.search);

    return {
        character:params.get("character") || undefined,
        weapon:params.get("weapon") || undefined,
    };
}

/** set url query for select character information */
export function setSelectedCharacterUrlArgs(newArgs:SelectedCharacterUrlArgs):void
{
    const args=new URLSearchParams(location.search);

    if (newArgs.character)
    {
        args.set("character",newArgs.character);
    }

    else
    {
        args.delete("character");
    }

    if (newArgs.weapon)
    {
        args.set("weapon",newArgs.weapon);
    }

    else
    {
        args.delete("weapon");
    }

    history.replaceState("","",`${location.pathname}?${args}`);
}