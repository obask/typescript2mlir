import {Block, BlockLabel, Operator} from "./model";

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
            const operands1 = this.renderReturnNames(operator, indent);
            this.write(`func.call ${operator.attributes["callee"]}(${operands1}) `)
            this.renderType(operator)
            return this.output
        }
        const operands1 = this.renderReturnNames(operator, indent);
        this.write(`"${operator.dialect}.${operator.name}"(${operands1}) `)
        this.renderRegions(operator.blocks, indent)
        const attributes1 = Object.entries(operator.attributes).map(([k, v]) => `${k} = ${v.toString()}`)
        if (attributes1.length !== 0) {
            this.write(`[${attributes1.join(", ")}] `)
        }
        this.renderType(operator)
        return this.output
    }

    private renderReturnNames(operator: Operator, indent: string) {
        const operands1 = operator.arguments.map(a => a.name).join(", ")
        this.write(indent)
        if (operator.returnNames.size) {
            this.write(Array.from(operator.returnNames).map(a => a.toString()).join(", ") + " = ")
        }
        return operands1;
    }

    renderType(self: Operator) {
        let operandTypes: string
        if (self.dialect === "scf" && self.name === "if") {
            operandTypes = "i1"
        } else if (self.dialect === "cf" && self.name === "cond_br") {
            if (self.arguments.length === 1) {
                operandTypes = "i1"
            } else {
                operandTypes = `i1, ${self.arguments.slice(1, self.arguments.length).join(", ")}`
            }
        } else if (self.dialect === "scf" && self.name === "condition") {
            operandTypes = `i1, ${self.arguments.slice(1, self.arguments.length).join(", ")}`
        } else {
            operandTypes = self.arguments.map(() => {
                "!_.Any"
            }).join(", ")
        }
        if (self.returnNames.size === 0) {

        } else if (self.returnNames.size === 1) {
            this.write(`: (${operandTypes}) -> ${self.returnTypes.join(", ")}`)
        } else {
            this.write(`: (${operandTypes}) -> (${self.returnTypes.join(", ")})`)
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
                this.renderBlockToSB(region, indent)
            }
            this.write(") ")
        }
    }

    renderBlockToSB(block: Block, indent) {
        this.writeLine("{")
        if (block.label) {
            this.renderLabelToSB(block.label)
        }
        for (const op of block.operators) {
            this.renderOperator(op, `${indent}  `)
            this.writeLine()
        }
        this.write(`${indent}}`)
    }

    renderLabelToSB(label: BlockLabel) {
        // this.write(`${indent}  %${block.label.name} = ${block.label.params} `)
    }

}