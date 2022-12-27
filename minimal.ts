import type { SourceFile, TextRange, TransformerFactory, TypeChecker, Node, Printer } from "typescript"
import ts from "typescript"
import TS_CONFIG from "./config"
import { formatSyntaxKind } from "./debug/kind"

export function positionIsSynthesized(pos: number): boolean {
    return !(pos >= 0);
}

export function nodeIsSynthesized(range: TextRange): boolean {
    return positionIsSynthesized(range.pos)
        || positionIsSynthesized(range.end);
}


const PATH = "../solid-start-barebone/src/components/Counter.tsx"

// class TsOperator extends Operator implements {}


class MyVisitor {
    sourceFile: SourceFile
    checker: TypeChecker
    stack: Operator[][] = [[]]
    printer: Printer = ts.createPrinter()

    constructor(sourceFile: SourceFile, checker: TypeChecker) {
        this.sourceFile = sourceFile
        this.checker = checker
    }

    public visit(node: Node): Operator | undefined {
        const x = this.printer.printNode(ts.EmitHint.Unspecified, node, this.sourceFile)
        console.log(x)
        const tt = node.parent && this.checker.typeToString(this.checker.getTypeAtLocation(node))
        console.log("t:", tt)
        const op = new Operator()
        op.dialect = "ts"
        op.name = formatSyntaxKind(node.kind)
        const bb = new BasicBlock()
        const rr = new Region()
        rr.blocks = [bb]
        op.regions = [rr]
        node.forEachChild((child) => {
            const tmp = this.visit(child)
            if (tmp) bb.operators.push(tmp)
        })
        return op
    }
}


function simpleTransformer<T extends Node>(sourceFile: SourceFile, checker: TypeChecker): TransformerFactory<T> {

    const mv = new MyVisitor(sourceFile, checker)

    return (context) => {
        return (node) => {
            mv.visit(node)
            return node
        }
    }
}

// let transformation: ts.CustomTransformers = 


function compile(): void {
    // ts.transpileModule

    let program = ts.createProgram([PATH], TS_CONFIG)

    let checker = program.getTypeChecker()

    const sourceFile = program.getSourceFile(PATH)!


    program.emit(sourceFile, undefined, undefined, false, {
        after: [simpleTransformer(sourceFile, checker)],
    })

    // program.emit()

    console.log("DONE")

    // const node = sourceFile.statements[2] as ts.FunctionDeclaration
    // console.log(">>", formatSyntaxKind(node.kind))

    // node.forEachChild

    // node.body?.forEachChild((f) => {
    //     console.log(">>", formatSyntaxKind(f.kind))
    //     console.log(f.getText())
    // })


    // let emitResult = program.emit()

    // let allDiagnostics = ts
    //     .getPreEmitDiagnostics(program)
    //     .concat(emitResult.diagnostics)

    // allDiagnostics.forEach(diagnostic => {
    //     if (diagnostic.file) {
    //         let { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!)
    //         let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")
    //         console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`)
    //     } else {
    //         console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"))
    //     }
    // })

    // let exitCode = emitResult.emitSkipped ? 1 : 0
    // console.log(`Process exiting with code '${exitCode}'.`)
    // process.exit(0)
}


compile()
