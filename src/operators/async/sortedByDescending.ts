import {AsyncSequence} from "../../sequency";
import {asAsyncSelector} from "../../internal";

export class SortedByDescending {

    /**
     * Returns a new sequence with all elements sorted descending by the value specified
     * by the given `selector` function.
     *
     * @param {(value: T) => Promise<R> | R} selector
     * @returns {AsyncSequence<T>}
     */
    sortedByDescending<T, R>(this: AsyncSequence<T>, selector: (value: T) => Promise<R> | R): AsyncSequence<T>;
    /**
     * Returns a new sequence with all elements sorted descending by the value of the given `key`.
     *
     * @param {keyof T} key
     * @returns {AsyncSequence<T>}
     */
    sortedByDescending<T>(this: AsyncSequence<T>, key: keyof NonNullable<T>): AsyncSequence<T>;
    sortedByDescending<T, R>(this: AsyncSequence<T>, keyOrSelector: ((value: T) => Promise<R> | R) | keyof NonNullable<T>): AsyncSequence<T> {
        const selector = asAsyncSelector(keyOrSelector);
        return this.sorted(it => it.compareByDescending(selector));
    }

}