export const isSunset = (
    lux,
    cct
) => {

    if (
        cct === null
    ) {

        return false
    }

    return (
        lux < 150 &&
        cct < 4000
    )
}