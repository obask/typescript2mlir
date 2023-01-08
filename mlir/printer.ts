class DefaultPrinter {
    output: string[]

    constructor() {
        this.output = []
    }

    renderOperator2(op) {
        return op.renderToSB()
    }

    write(s: string) {
        this.output.push(s)
    }

    writeLine(s: string = "") {
        this.output.push((s || "") + "\n")
    }

    renderOperator(self, indent = "") {
        if (self.type == 'Func.CallOp') {
            const operands1 = self.operands.join(", ")
            this.write(indent)
            if (self.returnNames.length !== 0) {
                this.write(self.returnNames.join(", ") + " = ")
            }
            this.write(`func.call ${self.attributes["callee"]}(${operands1}) `)
            self.renderType()
            return self.sb
        }
        const operands1 = self.operands.join(", ")
        this.write(indent)
        if (self.returnNames.length !== 0) {
            this.write(self.returnNames.join(", ") + " = ")
        }
        this.write(`"${self.dialect}.${self.name}"(${operands1}) `)
        if (self.successors.length !== 0) {
            const successorsString = self.successors.join(", ", bl => {
                if (bl.params.length === 0) {
                    return bl.name.toString()
                } else {
                    const tmp = bl.params.map((it) => {
                        `${it.first}: ${it.second}`
                    }).join(", ")
                    return `${bl.name}(${tmp})`
                }
            })
            this.write(`[${successorsString}] `)
        }
        self.regions.renderRegions(indent)
        const attributes1 = Object.entries(self.attributes).map(([k, v]) => [k, v.toString()])
        if (attributes1.length !== 0) {
            this.write(`${attributes1} `)
        }
        self.renderType()
        return self.sb
    }

    renderType(self) {
        let operandTypes: string
        if (self.dialect === "scf" && self.name === "if") {
            operandTypes = "i1"
        } else if (self.dialect === "cf" && self.name === "cond_br") {
            if (self.operands.length === 1) {
                operandTypes = "i1"
            } else {
                operandTypes = `i1, ${self.operands.slice(1, self.operands.length).join(", ")}`
            }
        } else if (self.dialect === "scf" && self.name === "condition") {
            operandTypes = `i1, ${self.operands.slice(1, self.operands.length).join(", ")}`
        } else {
            operandTypes = self.operands.map(() => {
                "!_.Any"
            }).join(", ")
        }
        if (self.returnNames.length === 0) {

        } else if (self.returnNames.length === 1) {
            this.write(`: (${operandTypes}) -> ${self.resultTypes.join(", ")}`)
        } else {
            this.write(`: (${operandTypes}) -> (${self.resultTypes.join(", ")})`)
        }
    }

    renderRegions(self, indent) {
        if (self.length !== 0) {
            this.writeLine("(")
            let isFirst = true
            for (let i = 0; i < self.length; i++) {
                const region = this[i]
                if (isFirst) {
                    isFirst = false
                } else {
                    this.write(", ")
                }
                this.renderRegionToSB(region, indent)
            }
            this.write(") ")
        }
    }

    renderRegionToSB(self, indent) {
        this.writeLine("{")
        for (const block of self.blocks) {
            this.write(`${indent}  %${block.name} = ${block.type} `)
            block.operations.renderToSB(`${indent}  `)
            this.writeLine()
        }
        this.write(indent + "}")
    }

    renderBasicBlockToSB(self, indent) {
        self.operations.renderToSB(indent)
        self.operations.appendLine()
    }
}