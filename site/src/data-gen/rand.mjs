export default {
    int: (min, max) => {
        const range = (max - min) + 1
        return min + Math.floor(
            Math.random() * range
        )
    },
    number: (min, max) => {
        const range = max - min
        return min + Math.random() * range
    },
}
