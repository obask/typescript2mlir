import ts from "typescript";

export default {
    baseUrl: "/Users/oleg/VSCodeProjects/solid-start-barebone/",
    target: ts.ScriptTarget.ESNext,
    project: "../solid-start-barebone",
    module: ts.ModuleKind.ESNext,
    outDir: "delme",
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    jsxImportSource: "solid-js",
    jsx: ts.JsxEmit.ReactJSX,
    strict: true,
    types: ["vite/client"],
    paths: {
        "~/*": ["./src/*"]
    }
} as ts.CompilerOptions
