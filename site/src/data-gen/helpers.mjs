let genValue = null
export const __init = (gen) => genValue = gen

export const formattable = (func) => new Proxy(
    func,
    {
        get(_, format) {
            return (...args) => func(format, ...args)
        },
        apply(_0, _1, args) {
            return func(null, ...args)
        }
    }
)

export const functionify = (base) => {
    if (typeof base === "function") {
        return base
    }
    const entries = Object.entries(base)
    return (_, index) => Object.fromEntries(
        entries.map(
            ([name, value]) => [
                name,
                genValue(value, index)
            ]
        )
    )
}
