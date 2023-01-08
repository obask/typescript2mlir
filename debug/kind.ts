import * as ts from "typescript";
export function lowerFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}
    /**
     * Formats an enum value as a string for debugging and debug assertions.
     */
    export function formatEnum(value = 0, enumObject: any, isFlags?: boolean) {
        const members = getEnumMembers(enumObject);
        if (value === 0) {
            return members.length > 0 && members[0][0] === 0 ? members[0][1] : "0";
        }
        if (isFlags) {
            const result: string[] = [];
            let remainingFlags = value;
            for (const [enumValue, enumName] of members) {
                if (enumValue > value) {
                    break;
                }
                if (enumValue !== 0 && enumValue & value) {
                    result.push(enumName);
                    remainingFlags &= ~enumValue;
                }
            }
            if (remainingFlags === 0) {
                return result.join("|");
            }
        }
        else {
            for (const [enumValue, enumName] of members) {
                if (enumValue === value) {
                    return enumName;
                }
            }
        }
        return value.toString();
    }

    const enumMemberCache = new Map<any, [number, string][]>();

    function getEnumMembers(enumObject: any) {
        // Assuming enum objects do not change at runtime, we can cache the enum members list
        // to reuse later. This saves us from reconstructing this each and every time we call
        // a formatting function (which can be expensive for large enums like SyntaxKind).
        const existing = enumMemberCache.get(enumObject);
        if (existing) {
            return existing;
        }

        const result: [number, string][] = [];
        for (const name in enumObject) {
            const value = enumObject[name];
            if (typeof value === "number") {
                result.push([value, name]);
            }
        }

        enumMemberCache.set(enumObject, result);
        return result;
    }





export function formatSyntaxKind(kind: ts.SyntaxKind | undefined): string {
    return formatEnum(kind, (ts as any).SyntaxKind, /*isFlags*/ false);
}

