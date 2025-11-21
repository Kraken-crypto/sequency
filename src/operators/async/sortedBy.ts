import {AsyncSequence} from "../../sequency";
import {asAsyncSelector} from "../../internal";

export class SortedBy {

    /**
     * Returns a new sequence with all elements sorted ascending by the value specified
     * by the given `selector` function.
     *
     * @param {(value: T) => Promise<R> | R} selector
     * @returns {AsyncSequence<T>}
     */
    sortedBy<T, R>(this: AsyncSequence<T>, selector: (value: T) => Promise<R> | R): AsyncSequence<T>;
    /**
     * Returns a new sequence with all elements sorted ascending by the value of the given `key`.
     *
     * @param {keyof T} key
     * @returns {AsyncSequence<T>}
     */
    sortedBy<T>(this: AsyncSequence<T>, key: keyof NonNullable<T>): AsyncSequence<T>;
    sortedBy<T, R>(this: AsyncSequence<T>, keyOrSelector: ((value: T) => Promise<R> | R) | keyof NonNullable<T>): AsyncSequence<T> {
        const selector = asAsyncSelector(keyOrSelector);
        return this.sorted(it => it.compareBy(selector));
    }

}