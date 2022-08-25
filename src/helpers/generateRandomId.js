export const generateRandomId = () => {
    let id = ''
    for (let index = 0; index < 3; index++) {
        const str = (Math.random() + 1)
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substring(2)

        id += str
    }

    return id
}
