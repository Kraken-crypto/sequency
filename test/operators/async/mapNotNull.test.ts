import {asyncSequenceOf} from "../../../src/sequency";

describe("mapNotNull", () => {
    it("should map to non-null items", async () => {
        const a1 = {a: 1};
        const a2 = {a: null};
        const a3 = {a: null};
        const a4 = {a: 4};

        const array = await asyncSequenceOf<{a: number | null}>(a1, a2, a3, a4)
            .mapNotNull(async it => it.a)
            .toArray();

        expect(array).toEqual([1, 4]);
    });

    it("should filter out undefined values", async () => {
        const a1 = {a: 1};
        const a2 = {a: undefined};
        const a3 = {a: undefined};
        const a4 = {a: 4};

        const array = await asyncSequenceOf<{a: number | undefined}>(a1, a2, a3, a4)
            .mapNotNull(async it => it.a)
            .toArray();

        expect(array).toEqual([1, 4]);
    });

    it("should filter out both null and undefined values", async () => {
        const a1 = {a: 1};
        const a2 = {a: null};
        const a3 = {a: undefined};
        const a4 = {a: 4};
        const a5 = {a: null};
        const a6 = {a: undefined};

        const array = await asyncSequenceOf<{a: number | null | undefined}>(a1, a2, a3, a4, a5, a6)
            .mapNotNull(async it => it.a)
            .toArray();

        expect(array).toEqual([1, 4]);
    });

    it("should preserve falsy but non-null values", async () => {
        const array = await asyncSequenceOf<number | boolean | string | null | undefined>(0, false, "", null, undefined, 1)
            .mapNotNull(async it => it)
            .toArray();

        expect(array).toEqual([0, false, "", 1]);
    });
});