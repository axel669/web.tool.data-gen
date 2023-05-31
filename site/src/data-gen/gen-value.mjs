import * as generators from "./generators.mjs"

const { __init, ...gens } = generators
const sourceEntries = Object.entries(gens)

const bindIndex = (func, index) =>
    (...args) => genValue(
        func(...args),
        index
    )
const genValue = (value, idx) => {
    if (typeof value === "function") {
        return value(
            Object.fromEntries(
                sourceEntries.map(
                    ([name, value]) => [name, bindIndex(value, idx)]
                )
            ),
            idx
        )
    }
    return value
}

export default genValue
