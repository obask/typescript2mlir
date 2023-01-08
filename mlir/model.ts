interface RootElement {}

export class Operator implements RootElement {
    returnNames: Set<ValueId> = new Set();
    dialect!: string;
    name!: string;
    operands: ValueId[] = [];
    regions: Region[] = [];
    attributes: Map<string, Attribute> = new Map();
    argumentTypes: KotlinType[] = [];
    resultTypes: KotlinType[] = [];
    successors: BlockLabel[] = [];
}

export class BlockId {
    value: string;
    constructor(value: string) {
        this.value = value;
    }
    toString(): string {
        return `^${this.value}`;
    }
}

export class BlockLabel implements RootElement {
    name: BlockId;
    params: Array<[ValueId, KotlinType]> = [];
    constructor(name: BlockId, params: Array<[ValueId, KotlinType]> = []) {
        this.name = name;
        this.params = params;
    }
}

export class BasicBlock implements RootElement {
    operators: Operator[] = [new Operator()];
    label?: BlockLabel;
}

export class Region implements RootElement {
    blocks: BasicBlock[] = [new BasicBlock()];
    storeCounter!: Map<string, number>;
}

export class KotlinType {
    type: string;
    constructor(type: string) {
        this.type = type;
    }
    toString(): string {
        return this.type.endsWith("Unit") ? "()" : "!_.Any";
    }
}

export class BuiltinTypeI1 extends KotlinType {
    constructor() {
        super("i1");
    }
    toString(): string {
        return "i1";
    }
}

export class ValueId {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    toString(): string {
        return `%${this.name}`;
    }
}

interface Attribute extends RootElement {}

export class FunctionTypeAttr implements Attribute {
    types: KotlinType[];
    returnType: KotlinType;
    constructor(types: KotlinType[], returnType: KotlinType) {
        this.types = types;
        this.returnType = returnType;
    }
    toString(): string {
        const argTypes = this.types.join(", ");
        return `(${argTypes}) -> ${this.returnType}`;
    }
}

export class OperandSegmentSizesAttr implements Attribute {
    argCounts: number[];
    constructor(argCounts: number[]) {
        this.argCounts = argCounts;
    }
    toString(): string {
        const argTypes = this.argCounts.join(", ");
        return `dense<[${argTypes}]> : vector<${this.argCounts.length}xi32>`;
    }
}

export class IntAttr implements Attribute {
    item: number;
    constructor(item: number) {
        this.item = item;
    }
    toString(): string {
        return this.item.toString();
    }
}

export class FloatAttr implements Attribute {
    value: number;
    constructor(value: number) {
        this.value = value;
    }
    toString(): string {
        return this.value.toString();
    }
}

export class StringAttr implements Attribute {
    value: string;
    constructor(value: string) {
        this.value = value;
    }
    toString(): string {
        return `"${this.value}"`;
    }
}

export class ReferenceAttr implements Attribute {
    value: string;
    constructor(value: string) {
        this.value = value;
    }
    toString(): string {
        return `@${this.value}`;
    }
}
