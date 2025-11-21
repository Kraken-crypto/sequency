import {sequenceOf} from "../../../src/sequency";

describe("mapNotNull", () => {
    it("should map to non-null items", () => {
        const a1 = {a: 1};
        const a2 = {a: null};
        const a3 = {a: null};
        const a4 = {a: 4};

        const array = sequenceOf<{a: number | null}>(a1, a2, a3, a4)
            .mapNotNull(it => it.a)
            .toArray();

        expect(array).toEqual([1, 4]);
    });

    it("should filter out undefined values", () => {
        const a1 = {a: 1};
        const a2 = {a: undefined};
        const a3 = {a: undefined};
        const a4 = {a: 4};

        const array = sequenceOf<{a: number | undefined}>(a1, a2, a3, a4)
            .mapNotNull(it => it.a)
            .toArray();

        expect(array).toEqual([1, 4]);
    });

    it("should filter out both null and undefined values", () => {
        const a1 = {a: 1};
        const a2 = {a: null};
        const a3 = {a: undefined};
        const a4 = {a: 4};
        const a5 = {a: null};
        const a6 = {a: undefined};

        const array = sequenceOf<{a: number | null | undefined}>(a1, a2, a3, a4, a5, a6)
            .mapNotNull(it => it.a)
            .toArray();

        expect(array).toEqual([1, 4]);
    });

    it("should preserve falsy but non-null values", () => {
        const array = sequenceOf<number | boolean | string | null | undefined>(0, false, "", null, undefined, 1)
            .mapNotNull(it => it)
            .toArray();

        expect(array).toEqual([0, false, "", 1]);
    });
});