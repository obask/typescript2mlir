import type {
    CompilerOptions,
    Node,
    Printer,
    SourceFile,
    TextRange,
    TransformerFactory,
    TypeChecker,
} from "typescript";
import * as pkg from "typescript";
import {formatSyntaxKind, lowerFirstLetter} from "./debug/kind"
import {BasicBlock, Operator, Region} from "./mlir/model"
import * as console from "console";
import {DefaultPrinter} from "./mlir/printer";

const {
    createPrinter,
    createProgram,
    EmitHint,
    JsxEmit,
    ModuleKind,
    ModuleResolutionKind,
    SyntaxKind,

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
        const op = new Operator()
        const text = this.printer.printNode(EmitHint.Unspecified, node, this.sourceFile)
        op.attributes["text"] = "\'" + text.substring(0, 42) + "\'"
        const tt = node.parent && this.checker.typeToString(this.checker.getTypeAtLocation(node))
        console.log("t:", tt)
        op.dialect = "ts"
        op.name = lowerFirstLetter(formatSyntaxKind(node.kind))

        // this.sourceFile.text.substring(node.pos, node.end)
        switch (node.kind) {
            case SyntaxKind.Unknown:
                break;
            case SyntaxKind.EndOfFileToken:
                break;
            case SyntaxKind.SingleLineCommentTrivia:
                break;
            case SyntaxKind.MultiLineCommentTrivia:
                break;
            case SyntaxKind.NewLineTrivia:
                break;
            case SyntaxKind.WhitespaceTrivia:
                break;
            case SyntaxKind.ShebangTrivia:
                break;
            case SyntaxKind.ConflictMarkerTrivia:
                break;
            case SyntaxKind.NumericLiteral:
                break;
            case SyntaxKind.BigIntLiteral:
                break;
            case SyntaxKind.StringLiteral:
                break;
            case SyntaxKind.JsxText:
                break;
            case SyntaxKind.JsxTextAllWhiteSpaces:
                break;
            case SyntaxKind.RegularExpressionLiteral:
                break;
            case SyntaxKind.NoSubstitutionTemplateLiteral:
                break;
            case SyntaxKind.TemplateHead:
                break;
            case SyntaxKind.TemplateMiddle:
                break;
            case SyntaxKind.TemplateTail:
                break;
            case SyntaxKind.OpenBraceToken:
                break;
            case SyntaxKind.CloseBraceToken:
                break;
            case SyntaxKind.OpenParenToken:
                break;
            case SyntaxKind.CloseParenToken:
                break;
            case SyntaxKind.OpenBracketToken:
                break;
            case SyntaxKind.CloseBracketToken:
                break;
            case SyntaxKind.DotToken:
                break;
            case SyntaxKind.DotDotDotToken:
                break;
            case SyntaxKind.SemicolonToken:
                break;
            case SyntaxKind.CommaToken:
                break;
            case SyntaxKind.QuestionDotToken:
                break;
            case SyntaxKind.LessThanToken:
                break;
            case SyntaxKind.LessThanSlashToken:
                break;
            case SyntaxKind.GreaterThanToken:
                break;
            case SyntaxKind.LessThanEqualsToken:
                break;
            case SyntaxKind.GreaterThanEqualsToken:
                break;
            case SyntaxKind.EqualsEqualsToken:
                break;
            case SyntaxKind.ExclamationEqualsToken:
                break;
            case SyntaxKind.EqualsEqualsEqualsToken:
                break;
            case SyntaxKind.ExclamationEqualsEqualsToken:
                break;
            case SyntaxKind.EqualsGreaterThanToken:
                break;
            case SyntaxKind.PlusToken:
                break;
            case SyntaxKind.MinusToken:
                break;
            case SyntaxKind.AsteriskToken:
                break;
            case SyntaxKind.AsteriskAsteriskToken:
                break;
            case SyntaxKind.SlashToken:
                break;
            case SyntaxKind.PercentToken:
                break;
            case SyntaxKind.PlusPlusToken:
                break;
            case SyntaxKind.MinusMinusToken:
                break;
            case SyntaxKind.LessThanLessThanToken:
                break;
            case SyntaxKind.GreaterThanGreaterThanToken:
                break;
            case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                break;
            case SyntaxKind.AmpersandToken:
                break;
            case SyntaxKind.BarToken:
                break;
            case SyntaxKind.CaretToken:
                break;
            case SyntaxKind.ExclamationToken:
                break;
            case SyntaxKind.TildeToken:
                break;
            case SyntaxKind.AmpersandAmpersandToken:
                break;
            case SyntaxKind.BarBarToken:
                break;
            case SyntaxKind.QuestionToken:
                break;
            case SyntaxKind.ColonToken:
                break;
            case SyntaxKind.AtToken:
                break;
            case SyntaxKind.QuestionQuestionToken:
                break;
            case SyntaxKind.BacktickToken:
                break;
            case SyntaxKind.HashToken:
                break;
            case SyntaxKind.EqualsToken:
                break;
            case SyntaxKind.PlusEqualsToken:
                break;
            case SyntaxKind.MinusEqualsToken:
                break;
            case SyntaxKind.AsteriskEqualsToken:
                break;
            case SyntaxKind.AsteriskAsteriskEqualsToken:
                break;
            case SyntaxKind.SlashEqualsToken:
                break;
            case SyntaxKind.PercentEqualsToken:
                break;
            case SyntaxKind.LessThanLessThanEqualsToken:
                break;
            case SyntaxKind.GreaterThanGreaterThanEqualsToken:
                break;
            case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                break;
            case SyntaxKind.AmpersandEqualsToken:
                break;
            case SyntaxKind.BarEqualsToken:
                break;
            case SyntaxKind.BarBarEqualsToken:
                break;
            case SyntaxKind.AmpersandAmpersandEqualsToken:
                break;
            case SyntaxKind.QuestionQuestionEqualsToken:
                break;
            case SyntaxKind.CaretEqualsToken:
                break;
            case SyntaxKind.Identifier:
                break;
            case SyntaxKind.PrivateIdentifier:
                break;
            case SyntaxKind.BreakKeyword:
                break;
            case SyntaxKind.CaseKeyword:
                break;
            case SyntaxKind.CatchKeyword:
                break;
            case SyntaxKind.ClassKeyword:
                break;
            case SyntaxKind.ConstKeyword:
                break;
            case SyntaxKind.ContinueKeyword:
                break;
            case SyntaxKind.DebuggerKeyword:
                break;
            case SyntaxKind.DefaultKeyword:
                break;
            case SyntaxKind.DeleteKeyword:
                break;
            case SyntaxKind.DoKeyword:
                break;
            case SyntaxKind.ElseKeyword:
                break;
            case SyntaxKind.EnumKeyword:
                break;
            case SyntaxKind.ExportKeyword:
                break;
            case SyntaxKind.ExtendsKeyword:
                break;
            case SyntaxKind.FalseKeyword:
                break;
            case SyntaxKind.FinallyKeyword:
                break;
            case SyntaxKind.ForKeyword:
                break;
            case SyntaxKind.FunctionKeyword:
                break;
            case SyntaxKind.IfKeyword:
                break;
            case SyntaxKind.ImportKeyword:
                break;
            case SyntaxKind.InKeyword:
                break;
            case SyntaxKind.InstanceOfKeyword:
                break;
            case SyntaxKind.NewKeyword:
                break;
            case SyntaxKind.NullKeyword:
                break;
            case SyntaxKind.ReturnKeyword:
                break;
            case SyntaxKind.SuperKeyword:
                break;
            case SyntaxKind.SwitchKeyword:
                break;
            case SyntaxKind.ThisKeyword:
                break;
            case SyntaxKind.ThrowKeyword:
                break;
            case SyntaxKind.TrueKeyword:
                break;
            case SyntaxKind.TryKeyword:
                break;
            case SyntaxKind.TypeOfKeyword:
                break;
            case SyntaxKind.VarKeyword:
                break;
            case SyntaxKind.VoidKeyword:
                break;
            case SyntaxKind.WhileKeyword:
                break;
            case SyntaxKind.WithKeyword:
                break;
            case SyntaxKind.ImplementsKeyword:
                break;
            case SyntaxKind.InterfaceKeyword:
                break;
            case SyntaxKind.LetKeyword:
                break;
            case SyntaxKind.PackageKeyword:
                break;
            case SyntaxKind.PrivateKeyword:
                break;
            case SyntaxKind.ProtectedKeyword:
                break;
            case SyntaxKind.PublicKeyword:
                break;
            case SyntaxKind.StaticKeyword:
                break;
            case SyntaxKind.YieldKeyword:
                break;
            case SyntaxKind.AbstractKeyword:
                break;
            case SyntaxKind.AccessorKeyword:
                break;
            case SyntaxKind.AsKeyword:
                break;
            case SyntaxKind.AssertsKeyword:
                break;
            case SyntaxKind.AssertKeyword:
                break;
            case SyntaxKind.AnyKeyword:
                break;
            case SyntaxKind.AsyncKeyword:
                break;
            case SyntaxKind.AwaitKeyword:
                break;
            case SyntaxKind.BooleanKeyword:
                break;
            case SyntaxKind.ConstructorKeyword:
                break;
            case SyntaxKind.DeclareKeyword:
                break;
            case SyntaxKind.GetKeyword:
                break;
            case SyntaxKind.InferKeyword:
                break;
            case SyntaxKind.IntrinsicKeyword:
                break;
            case SyntaxKind.IsKeyword:
                break;
            case SyntaxKind.KeyOfKeyword:
                break;
            case SyntaxKind.ModuleKeyword:
                break;
            case SyntaxKind.NamespaceKeyword:
                break;
            case SyntaxKind.NeverKeyword:
                break;
            case SyntaxKind.OutKeyword:
                break;
            case SyntaxKind.ReadonlyKeyword:
                break;
            case SyntaxKind.RequireKeyword:
                break;
            case SyntaxKind.NumberKeyword:
                break;
            case SyntaxKind.ObjectKeyword:
                break;
            case SyntaxKind.SatisfiesKeyword:
                break;
            case SyntaxKind.SetKeyword:
                break;
            case SyntaxKind.StringKeyword:
                break;
            case SyntaxKind.SymbolKeyword:
                break;
            case SyntaxKind.TypeKeyword:
                break;
            case SyntaxKind.UndefinedKeyword:
                break;
            case SyntaxKind.UniqueKeyword:
                break;
            case SyntaxKind.UnknownKeyword:
                break;
            case SyntaxKind.FromKeyword:
                break;
            case SyntaxKind.GlobalKeyword:
                break;
            case SyntaxKind.BigIntKeyword:
                break;
            case SyntaxKind.OverrideKeyword:
                break;
            case SyntaxKind.OfKeyword:
                break;
            case SyntaxKind.QualifiedName:
                break;
            case SyntaxKind.ComputedPropertyName:
                break;
            case SyntaxKind.TypeParameter:
                break;
            case SyntaxKind.Parameter:
                break;
            case SyntaxKind.Decorator:
                break;
            case SyntaxKind.PropertySignature:
                break;
            case SyntaxKind.PropertyDeclaration:
                break;
            case SyntaxKind.MethodSignature:
                break;
            case SyntaxKind.MethodDeclaration:
                break;
            case SyntaxKind.ClassStaticBlockDeclaration:
                break;
            case SyntaxKind.Constructor:
                break;
            case SyntaxKind.GetAccessor:
                break;
            case SyntaxKind.SetAccessor:
                break;
            case SyntaxKind.CallSignature:
                break;
            case SyntaxKind.ConstructSignature:
                break;
            case SyntaxKind.IndexSignature:
                break;
            case SyntaxKind.TypePredicate:
                break;
            case SyntaxKind.TypeReference:
                break;
            case SyntaxKind.FunctionType:
                break;
            case SyntaxKind.ConstructorType:
                break;
            case SyntaxKind.TypeQuery:
                break;
            case SyntaxKind.TypeLiteral:
                break;
            case SyntaxKind.ArrayType:
                break;
            case SyntaxKind.TupleType:
                break;
            case SyntaxKind.OptionalType:
                break;
            case SyntaxKind.RestType:
                break;
            case SyntaxKind.UnionType:
                break;
            case SyntaxKind.IntersectionType:
                break;
            case SyntaxKind.ConditionalType:
                break;
            case SyntaxKind.InferType:
                break;
            case SyntaxKind.ParenthesizedType:
                break;
            case SyntaxKind.ThisType:
                break;
            case SyntaxKind.TypeOperator:
                break;
            case SyntaxKind.IndexedAccessType:
                break;
            case SyntaxKind.MappedType:
                break;
            case SyntaxKind.LiteralType:
                break;
            case SyntaxKind.NamedTupleMember:
                break;
            case SyntaxKind.TemplateLiteralType:
                break;
            case SyntaxKind.TemplateLiteralTypeSpan:
                break;
            case SyntaxKind.ImportType:
                break;
            case SyntaxKind.ObjectBindingPattern:
                break;
            case SyntaxKind.ArrayBindingPattern:
                break;
            case SyntaxKind.BindingElement:
                break;
            case SyntaxKind.ArrayLiteralExpression:
                break;
            case SyntaxKind.ObjectLiteralExpression:
                break;
            case SyntaxKind.PropertyAccessExpression:
                break;
            case SyntaxKind.ElementAccessExpression:
                break;
            case SyntaxKind.CallExpression:
                break;
            case SyntaxKind.NewExpression:
                break;
            case SyntaxKind.TaggedTemplateExpression:
                break;
            case SyntaxKind.TypeAssertionExpression:
                break;
            case SyntaxKind.ParenthesizedExpression:
                break;
            case SyntaxKind.FunctionExpression:
                break;
            case SyntaxKind.ArrowFunction:
                break;
            case SyntaxKind.DeleteExpression:
                break;
            case SyntaxKind.TypeOfExpression:
                break;
            case SyntaxKind.VoidExpression:
                break;
            case SyntaxKind.AwaitExpression:
                break;
            case SyntaxKind.PrefixUnaryExpression:
                break;
            case SyntaxKind.PostfixUnaryExpression:
                break;
            case SyntaxKind.BinaryExpression:
                break;
            case SyntaxKind.ConditionalExpression:
                break;
            case SyntaxKind.TemplateExpression:
                break;
            case SyntaxKind.YieldExpression:
                break;
            case SyntaxKind.SpreadElement:
                break;
            case SyntaxKind.ClassExpression:
                break;
            case SyntaxKind.OmittedExpression:
                break;
            case SyntaxKind.ExpressionWithTypeArguments:
                break;
            case SyntaxKind.AsExpression:
                break;
            case SyntaxKind.NonNullExpression:
                break;
            case SyntaxKind.MetaProperty:
                break;
            case SyntaxKind.SyntheticExpression:
                break;
            case SyntaxKind.SatisfiesExpression:
                break;
            case SyntaxKind.TemplateSpan:
                break;
            case SyntaxKind.SemicolonClassElement:
                break;
            case SyntaxKind.Block:
                break;
            case SyntaxKind.EmptyStatement:
                break;
            case SyntaxKind.VariableStatement:
                const decl = node['declarationList']['declarations'][0]
                op.returnNames.add(decl['symbol'])
                break;
            case SyntaxKind.ExpressionStatement:
                break;
            case SyntaxKind.IfStatement:
                break;
            case SyntaxKind.DoStatement:
                break;
            case SyntaxKind.WhileStatement:
                break;
            case SyntaxKind.ForStatement:
                break;
            case SyntaxKind.ForInStatement:
                break;
            case SyntaxKind.ForOfStatement:
                break;
            case SyntaxKind.ContinueStatement:
                break;
            case SyntaxKind.BreakStatement:
                break;
            case SyntaxKind.ReturnStatement:
                break;
            case SyntaxKind.WithStatement:
                break;
            case SyntaxKind.SwitchStatement:
                break;
            case SyntaxKind.LabeledStatement:
                break;
            case SyntaxKind.ThrowStatement:
                break;
            case SyntaxKind.TryStatement:
                break;
            case SyntaxKind.DebuggerStatement:
                break;
            case SyntaxKind.VariableDeclaration:
                break;
            case SyntaxKind.VariableDeclarationList:
                break;
            case SyntaxKind.FunctionDeclaration:
                break;
            case SyntaxKind.ClassDeclaration:
                break;
            case SyntaxKind.InterfaceDeclaration:
                break;
            case SyntaxKind.TypeAliasDeclaration:
                break;
            case SyntaxKind.EnumDeclaration:
                break;
            case SyntaxKind.ModuleDeclaration:
                break;
            case SyntaxKind.ModuleBlock:
                break;
            case SyntaxKind.CaseBlock:
                break;
            case SyntaxKind.NamespaceExportDeclaration:
                break;
            case SyntaxKind.ImportEqualsDeclaration:
                break;
            case SyntaxKind.ImportDeclaration:
                return op;
            case SyntaxKind.ImportClause:
                break;
            case SyntaxKind.NamespaceImport:
                break;
            case SyntaxKind.NamedImports:
                break;
            case SyntaxKind.ImportSpecifier:
                break;
            case SyntaxKind.ExportAssignment:
                break;
            case SyntaxKind.ExportDeclaration:
                break;
            case SyntaxKind.NamedExports:
                break;
            case SyntaxKind.NamespaceExport:
                break;
            case SyntaxKind.ExportSpecifier:
                break;
            case SyntaxKind.MissingDeclaration:
                break;
            case SyntaxKind.ExternalModuleReference:
                break;
            case SyntaxKind.JsxElement:
                break;
            case SyntaxKind.JsxSelfClosingElement:
                break;
            case SyntaxKind.JsxOpeningElement:
                break;
            case SyntaxKind.JsxClosingElement:
                break;
            case SyntaxKind.JsxFragment:
                break;
            case SyntaxKind.JsxOpeningFragment:
                break;
            case SyntaxKind.JsxClosingFragment:
                break;
            case SyntaxKind.JsxAttribute:
                break;
            case SyntaxKind.JsxAttributes:
                break;
            case SyntaxKind.JsxSpreadAttribute:
                break;
            case SyntaxKind.JsxExpression:
                break;
            case SyntaxKind.CaseClause:
                break;
            case SyntaxKind.DefaultClause:
                break;
            case SyntaxKind.HeritageClause:
                break;
            case SyntaxKind.CatchClause:
                break;
            case SyntaxKind.AssertClause:
                break;
            case SyntaxKind.AssertEntry:
                break;
            case SyntaxKind.ImportTypeAssertionContainer:
                break;
            case SyntaxKind.PropertyAssignment:
                break;
            case SyntaxKind.ShorthandPropertyAssignment:
                break;
            case SyntaxKind.SpreadAssignment:
                break;
            case SyntaxKind.EnumMember:
                break;
            case SyntaxKind.UnparsedPrologue:
                break;
            case SyntaxKind.UnparsedPrepend:
                break;
            case SyntaxKind.UnparsedText:
                break;
            case SyntaxKind.UnparsedInternalText:
                break;
            case SyntaxKind.UnparsedSyntheticReference:
                break;
            case SyntaxKind.SourceFile:
                break;
            case SyntaxKind.Bundle:
                break;
            case SyntaxKind.UnparsedSource:
                break;
            case SyntaxKind.InputFiles:
                break;
            case SyntaxKind.SyntaxList:
                break;
            case SyntaxKind.NotEmittedStatement:
                break;
            case SyntaxKind.PartiallyEmittedExpression:
                break;
            case SyntaxKind.CommaListExpression:
                break;
            case SyntaxKind.MergeDeclarationMarker:
                break;
            case SyntaxKind.EndOfDeclarationMarker:
                break;
            case SyntaxKind.SyntheticReferenceExpression:
                break;
            case SyntaxKind.Count:
                break;
            case SyntaxKind.FirstAssignment:
                break;
            case SyntaxKind.LastAssignment:
                break;
            case SyntaxKind.FirstCompoundAssignment:
                break;
            case SyntaxKind.LastCompoundAssignment:
                break;
            case SyntaxKind.FirstReservedWord:
                break;
            case SyntaxKind.LastReservedWord:
                break;
            case SyntaxKind.FirstKeyword:
                break;
            case SyntaxKind.LastKeyword:
                break;
            case SyntaxKind.FirstFutureReservedWord:
                break;
            case SyntaxKind.LastFutureReservedWord:
                break;
            case SyntaxKind.FirstTypeNode:
                break;
            case SyntaxKind.LastTypeNode:
                break;
            case SyntaxKind.FirstPunctuation:
                break;
            case SyntaxKind.LastPunctuation:
                break;
            case SyntaxKind.FirstToken:
                break;
            case SyntaxKind.LastToken:
                break;
            case SyntaxKind.FirstTriviaToken:
                break;
            case SyntaxKind.LastTriviaToken:
                break;
            case SyntaxKind.FirstLiteralToken:
                break;
            case SyntaxKind.LastLiteralToken:
                break;
            case SyntaxKind.FirstTemplateToken:
                break;
            case SyntaxKind.LastTemplateToken:
                break;
            case SyntaxKind.FirstBinaryOperator:
                break;
            case SyntaxKind.LastBinaryOperator:
                break;
            case SyntaxKind.FirstStatement:
                break;
            case SyntaxKind.LastStatement:
                break;
            case SyntaxKind.FirstNode:
                break;
        }


        const bb = new BasicBlock()
        const rr = new Region()
        rr.blocks = [bb]
        op.regions = [rr]
        node.forEachChild((child) => {
            const tmp = this.visit(child)
            if (tmp) bb.operators.push(tmp)
        })
        // bb.operators.push(op)
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
    console.log("==============")

    const p = new DefaultPrinter()
    p.renderOperator(result)

    console.log(p.output.join(""))

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
