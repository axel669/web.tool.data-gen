import * as helpers from "./helpers.mjs"
import * as generators from "./generators.mjs"
import generateValue from "./gen-value.mjs"

helpers.__init(generateValue)
generators.__init(generateValue)

const generate = (blueprint) => generateValue(
    helpers.functionify(blueprint),
    0
)

const { __init: _0, ...genFuncs } = generators

export default {
    generate,
    generators: genFuncs
}
