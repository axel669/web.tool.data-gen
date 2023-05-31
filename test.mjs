import mockGen from "./src/main.mjs"

const demo = (gen) => {
    const {
        repeat,
        pickOne,
        objectID,
        integer,
        fmt,
        index
    } = gen

    const items = repeat(5, 7)({
        id: objectID(),
        index: index(),
        index2: (gen) => `${gen.index()}:${gen.integer()}`,
        color: pickOne("red", "green", "blue"),
        items: repeat(5)(integer()),
        string: fmt`${integer()} - thing?`
    })

    console.log(
        mockGen.generate(items)
    )
}

repeat(5, 7)({
    id: objectID(),
    index: index(),
    index2: (gen) => `${gen.index()}:${gen.integer()}`,
    color: pickOne("red", "green", "blue"),
    items: repeat(5)(integer()),
    string: fmt`${integer()} - thing?`
})

// demo(mockGen.generators)

console.log(t.toString())
