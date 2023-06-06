import rand from "./rand.mjs"

export const functionify = (base) => {
    if (typeof base === "function") {
        return base
    }
    if (base.constructor !== Object) {
        return () => base
    }
    const entries = Object.entries(base)
    return () => Object.fromEntries(
        entries.map(
            ([name, value]) => [
                name,
                functionify(value)()
            ]
        )
    )
}

let currentIndex = null
export const repeat = (range, blueprint) => {
    const { min = 0, max } = range
    const item = functionify(blueprint)
    return Array.from(
        { length: rand.int(min, max) },
        (_, index) => {
            currentIndex = index
            return item()
        }
    )
}
export const pickOne = (...items) =>
    items[rand.int(0, items.length - 1)]
export const objectID = () => {
    const header = Math.floor(Date.now() / 1000).toString(16)
    const body = Array.from(
        { length: 16 },
        () => rand.int(0, 15).toString(16)
    ).join("")
    return `${header}${body}`
}
export const index = () => currentIndex
export const fmt = (parts, ...values) => String.raw(
    parts,
    ...values.map(
        value => functionify(value)()
    )
)
export const bool = () => Math.random() < 0.5
