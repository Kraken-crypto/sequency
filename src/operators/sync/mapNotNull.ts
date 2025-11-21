import {emptySequence, sequenceOf, Sequence} from "../../sequency";

export class MapNotNull {

    /**
     * Transforms each element into another value by applying the given `transform` function and returns a new sequence.
     * Transformations into `null` or `undefined` values are discarded.
     *
     * @param {(value: T) => R | null | undefined} transform
     * @returns {Sequence<NonNullable<R>>}
     */
    mapNotNull<T, R>(this: Sequence<T>, transform: (value: T) => R | null | undefined): Sequence<NonNullable<R>> {
        return this.flatMap((value: T) => {
            const item = transform(value);
            return item != null
                ? sequenceOf(item as NonNullable<R>)
                : emptySequence();
        });
    }

}