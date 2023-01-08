import type {CompilerOptions, Node, Printer, SourceFile, TextRange, TransformerFactory, TypeChecker,} from "typescript";
import * as pkg from "typescript";
import {formatSyntaxKind, lowerFirstLetter} from "./debug/kind"
import {BasicBlock, Operator, Region} from "./mlir/model"
import * as console from "console";

const {
    createPrinter,
    createProgram,
    EmitHint,
    JsxEmit,
    ModuleKind,
    ModuleResolutionKind,

    ScriptTarget,

} = pkg;


const TS_CONFIG = {
    baseUrl: __dirname,
    target: ScriptTarget.ESNext,
    project: ".",
    module: ModuleKind.ESNext,
    outDir: "delme",
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    moduleResolution: ModuleResolutionKind.NodeNext,
    strict: true,
    types: ["vite/client"],
    paths: {
        "~/*": ["./assets/*"]
    }
} as CompilerOptions


export function positionIsSynthesized(pos: number): boolean {
    return !(pos >= 0);
}

export function nodeIsSynthesized(range: TextRange): boolean {
    return positionIsSynthesized(range.pos)
        || positionIsSynthesized(range.end);
}


const PATH = "./assets/main.ts"

// class TsOperator extends Operator implements {}


class MyVisitor {
    sourceFile: SourceFile
    checker: TypeChecker
    stack: Operator[][] = [[]]
    printer: Printer = createPrinter()

    constructor(sourceFile: SourceFile, checker: TypeChecker) {
        this.sourceFile = sourceFile
        this.checker = checker
    }

    public visit(node: Node): Operator | undefined {
        const x = this.printer.printNode(EmitHint.Unspecified, node, this.sourceFile)
        console.log(x)
        const tt = node.parent && this.checker.typeToString(this.checker.getTypeAtLocation(node))
        console.log("t:", tt)
        const op = new Operator()
        op.dialect = "ts"
        op.name = lowerFirstLetter(formatSyntaxKind(node.kind))
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

let result: Operator

function simpleTransformer<T extends Node>(sourceFile: SourceFile, checker: TypeChecker): TransformerFactory<T> {

    const mv = new MyVisitor(sourceFile, checker)


    return (context) => {
        return (node) => {
            result = mv.visit(node)
            return node
        }
    }
}

// let transformation: ts.CustomTransformers = 


function compile(): void {
    // ts.transpileModule

    let program = createProgram([PATH], TS_CONFIG)

    let checker = program.getTypeChecker()

    const sourceFile = program.getSourceFile(PATH)!


    program.emit(sourceFile, undefined, undefined, false, {
        after: [simpleTransformer(sourceFile, checker)],
    })

    // program.emit()

    console.log(result)
    console.log("==============")
    for (const op of result.regions[0].blocks[0].operators) {
        console.log(op)
    }


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
