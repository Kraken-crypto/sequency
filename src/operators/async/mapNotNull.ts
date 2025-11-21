import {emptyAsyncSequence, asyncSequenceOf, AsyncSequence} from "../../sequency";

export class MapNotNull {

    /**
     * Transforms each element into another value by applying the given `transform` function and returns a new sequence.
     * Transformations into `null` or `undefined` values are discarded.
     *
     * @param {(value: T) => Promise<R | null | undefined> | R | null | undefined} transform
     * @returns {AsyncSequence<NonNullable<R>>}
     */
    mapNotNull<T, R>(this: AsyncSequence<T>, transform: (value: T) => Promise<R | null | undefined> | R | null | undefined): AsyncSequence<NonNullable<R>> {
        return this.flatMap(async (value: T) => {
            const item = await transform(value);
            return item != null
                ? asyncSequenceOf(item as NonNullable<R>)
                : emptyAsyncSequence();
        });
    }

}