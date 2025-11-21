import {asyncSequenceOf, emptyAsyncSequence, asAsyncSequence} from "../../../src/sequency";

describe("isEmpty", () => {
    it("returns false for infinite sequences", async () => {
        const infiniteSequence = asAsyncSequence((async function* () {
            let i = 0;
            while (true) {
                yield i++;
            }
        })());
        const result = await infiniteSequence.isEmpty();
        expect(result).toBeFalsy();
    });

    it("returns false for non-empty sequences", async () => {
        const result = await asyncSequenceOf(1, 2, 3).isEmpty();
        expect(result).toBeFalsy();
    });

    it("returns true for empty sequences", async () => {
        const result = await emptyAsyncSequence().isEmpty();
        expect(result).toBeTruthy();
    });

    it("returns true for sequences that would be empty", async () => {
        const result = await asyncSequenceOf(1, 3)
            .filter(async x => x % 2 === 0)
            .isEmpty();
        expect(result).toBeTruthy();
    });

    it("returns false for sequences that would not be empty", async () => {
        const result = await asyncSequenceOf(1, 3)
            .filter(async x => x % 2 !== 0)
            .isEmpty();
        expect(result).toBeFalsy();
    });
});

