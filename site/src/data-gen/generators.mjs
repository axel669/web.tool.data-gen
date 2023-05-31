import { formattable, functionify } from "./helpers.mjs"
import rand from "./rand.mjs"

let generateValue = null
export const __init = (gen) => generateValue = gen
export const repeat = (min, max = min) =>
    (blueprint) => {
        const item = functionify(blueprint)
        return (gen) => Array.from(
            { length: rand.int(min, max) },
            (_, i) => generateValue(item, i)
        )
    }
export const pickOne = (...items) =>
    () => items[rand.int(0, items.length - 1)]
export const objectID = () =>
    () => {
        const header = Math.floor(Date.now() / 1000).toString(16)
        const body = Array.from(
            { length: 16 },
            () => rand.int(0, 15).toString(16)
        ).join("")
        return `${header}${body}`
    }
export const index = () => (_, index) => index
export const integer = formattable(
    (format = null, ...args) => {
        let [min, max = 69] = [0, ...args].slice(-2)

        return () => rand.int(min, max)
    }
)
export const fmt = (parts, ...values) =>
    (_, index) => String.raw(
        parts,
        ...values.map(
            value => generateValue(value, index)
        )
    )
