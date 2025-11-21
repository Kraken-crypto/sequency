import {asyncSequenceOf, emptyAsyncSequence, asAsyncSequence} from "../../../src/sequency";

describe("isNotEmpty", () => {
    it("returns true for infinite sequences", async () => {
        const infiniteSequence = asAsyncSequence((async function* () {
            let i = 0;
            while (true) {
                yield i++;
            }
        })());
        const result = await infiniteSequence.isNotEmpty();
        expect(result).toBeTruthy();
    });

    it("returns true for non-empty sequences", async () => {
        const result = await asyncSequenceOf(1, 2, 3).isNotEmpty();
        expect(result).toBeTruthy();
    });

    it("returns false for empty sequences", async () => {
        const result = await emptyAsyncSequence().isNotEmpty();
        expect(result).toBeFalsy();
    });

    it("returns false for sequences that would be empty", async () => {
        const result = await asyncSequenceOf(1, 3)
            .filter(async x => x % 2 === 0)
            .isNotEmpty();
        expect(result).toBeFalsy();
    });

    it("returns true for sequences that would not be empty", async () => {
        const result = await asyncSequenceOf(1, 3)
            .filter(async x => x % 2 !== 0)
            .isNotEmpty();
        expect(result).toBeTruthy();
    });
});

