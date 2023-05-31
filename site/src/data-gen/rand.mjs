export default {
    int: (a, b = 0) => {
        const min = Math.min(a, b)
        const max = Math.max(a, b)
        const range = (max - min) + 1
        return min + Math.floor(
            Math.random() * range
        )
    }
}
