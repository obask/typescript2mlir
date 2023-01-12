import {BasicBlock, BlockLabel, Operator, Region} from "./model";

export class DefaultPrinter {
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

    renderOperator(operator: Operator, indent = ""): string[] {
        if (operator.name == 'Func.CallOp') {
            const operands1 = operator.operands.join(", ")
            this.write(indent)
            if (operator.returnNames.size !== 0) {
                this.write(Array.from(operator.returnNames).join(", ") + " = ")
            }
            this.write(`func.call ${operator.attributes["callee"]}(${operands1}) `)
            this.renderType(operator)
            return this.output
        }
        const operands1 = operator.operands.join(", ")
        this.write(indent)
        if (operator.returnNames.size !== 0) {
            this.write(Array.from(operator.returnNames).join(", ") + " = ")
        }
        this.write(`"${operator.dialect}.${operator.name}"(${operands1}) `)
        if (operator.successors.length !== 0) {
            const successorsString = operator.successors.map((bl: BlockLabel) => {
                if (bl.params.length === 0) {
                    bl.name.toString()
                } else {
                    // throw new Error("not implemented")
                    const tmp = bl.params.map(([first, second]) => {
                        `${first}: ${second}`
                    }).join(", ");
                    `${bl.name}(${tmp})`
                }
            }).join(", ")
            this.write(`[${successorsString}] `)
        }
        this.renderRegions(operator.regions, indent)
        const attributes1 = Object.entries(operator.attributes).map(([k, v]) => `${k} = ${v.toString()}`)
        if (attributes1.length !== 0) {
            this.write(`[${attributes1.join(", ")}] `)
        }
        this.renderType(operator)
        return this.output
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

    renderRegions(regions, indent) {
        if (regions.length !== 0) {
            this.write("(")
            let isFirst = true
            for (const region of regions) {
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

    renderRegionToSB(region: Region, indent) {
        this.writeLine("{")
        region.blocks.map((block, i) => {
            this.renderBlockToSB(block, `${indent}  `)
            if (i < region.blocks.length - 1) {
                this.writeLine()
            }
        })
        this.write(`${indent}}`)
    }

    renderBlockToSB(block: BasicBlock, indent) {
        if (block.label) {
            this.renderLabelToSB(block.label)
        }
        for (const op of block.operators) {
            this.renderOperator(op, `${indent}  `)
            this.writeLine()
        }
    }

    renderLabelToSB(label: BlockLabel) {
        // this.write(`${indent}  %${block.label.name} = ${block.label.params} `)
    }

}