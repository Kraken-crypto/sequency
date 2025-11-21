import {asAsyncSequence} from "../../../src/sequency";

describe("toMapNotNull", () => {
    it("should return items as new map, filtering out null and undefined values", async () => {
        const key1 = {k: 1};
        const key2 = {k: 2};
        const key3 = {k: 3};
        const array: [object, string | null | undefined][] = [[key1, "a"], [key2, null], [key3, "c"], [key1, undefined]];
        const map = await asAsyncSequence(array)
            .toMapNotNull();

        expect(map).toEqual(
            new Map([
                [key1, "a"],
                [key3, "c"]
            ])
        );
    });

    it("should filter out null and undefined keys", async () => {
        const key1 = {k: 1};
        const key2 = {k: 2};
        const array: [object | null | undefined, string][] = [[key1, "a"], [null, "b"], [key2, "c"], [undefined, "d"]];
        const map = await asAsyncSequence(array)
            .toMapNotNull();

        expect(map).toEqual(
            new Map([
                [key1, "a"],
                [key2, "c"]
            ])
        );
    });

    it("should append items to passed map, filtering out null and undefined", async () => {
        const key0 = {k: 0};
        const key1 = {k: 1};
        const key2 = {k: 2};
        const key3 = {k: 3};

        const existingMap = new Map();
        existingMap.set(key0, "_");

        const array: [object, string | null | undefined][] = [[key1, "a"], [key2, null], [key3, "c"]];
        const result = await asAsyncSequence(array)
            .toMapNotNull(existingMap);

        expect(result).toEqual(
            new Map([
                [key0, "_"],
                [key1, "a"],
                [key3, "c"]
            ])
        );
    });

    it("should handle all null/undefined pairs", async () => {
        const array: [string | null | undefined, string | null | undefined][] = [
            [null, "a"],
            ["b", null],
            [undefined, "c"],
            ["d", undefined],
            [null, null],
            [undefined, undefined]
        ];
        const map = await asAsyncSequence(array)
            .toMapNotNull();

        expect(map.size).toBe(0);
    });

    it("should handle empty sequence", async () => {
        const array: [string, number][] = [];
        const map = await asAsyncSequence(array)
            .toMapNotNull();

        expect(map.size).toBe(0);
    });

    it("should preserve falsy but non-null values", async () => {
        const array: [string, number | null | undefined | boolean | string][] = [
            ["a", 0],
            ["b", false],
            ["c", ""],
            ["d", null],
            ["e", undefined]
        ];
        const map = await asAsyncSequence(array)
            .toMapNotNull();

        expect(map.size).toBe(3);
        expect(map.get("a")).toBe(0);
        expect(map.get("b")).toBe(false);
        expect(map.get("c")).toBe("");
    });

    it("should handle duplicate keys, keeping the last non-null value", async () => {
        const key1 = {k: 1};
        const array: [object, string | null | undefined][] = [
            [key1, "first"],
            [key1, null],
            [key1, "second"],
            [key1, undefined],
            [key1, "third"]
        ];
        const map = await asAsyncSequence(array)
            .toMapNotNull();

        expect(map).toEqual(
            new Map([
                [key1, "third"]
            ])
        );
    });

    it("should handle mixed key and value types", async () => {
        const key1 = {k: 1};
        const key2 = "key2";
        const array: [object | string | number | null | undefined, string | number | null | undefined][] = [
            [key1, "value1"],
            [key2, 42],
            [null, "value3"],
            [3, null],
            [key1, undefined],
            [undefined, "value6"],
            [5, 55]
        ];
        const map = await asAsyncSequence(array)
            .toMapNotNull();

        expect(map.size).toBe(3);
        expect(map.get(key1)).toBe("value1");
        expect(map.get(key2)).toBe(42);
        expect(map.get(5)).toBe(55);
    });

    it("should return the same map instance when passed as parameter", async () => {
        const key1 = {k: 1};
        const existingMap = new Map();
        existingMap.set(key1, "existing");

        const array: [object, string][] = [[key1, "new"]];
        const result = await asAsyncSequence(array)
            .toMapNotNull(existingMap);

        expect(result).toBe(existingMap);
    });

    it("should handle numeric keys and values", async () => {
        const array: [number | null | undefined, number | null | undefined][] = [
            [1, 10],
            [2, null],
            [null, 30],
            [4, undefined],
            [undefined, 50]
        ];
        const map = await asAsyncSequence(array)
            .toMapNotNull();

        expect(map).toEqual(
            new Map([
                [1, 10]
            ])
        );
    });
});
