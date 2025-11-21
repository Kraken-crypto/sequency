import {Sequence} from "../../sequency";
import {asSelector} from "../../internal";

export class SortedByDescending {

    /**
     * Returns a new sequence with all elements sorted descending by the value specified
     * by the given `selector` function.
     *
     * @param {(value: T) => R} selector
     * @returns {Sequence<T>}
     */
    sortedByDescending<T, R>(this: Sequence<T>, selector: (value: T) => R): Sequence<T>;
    /**
     * Returns a new sequence with all elements sorted descending by the value of the given `key`.
     *
     * @param {keyof T} key
     * @returns {Sequence<T>}
     */
    sortedByDescending<T>(this: Sequence<T>, key: keyof NonNullable<T>): Sequence<T>;
    sortedByDescending<T, R>(this: Sequence<T>, keyOrSelector: ((value: T) => R) | keyof NonNullable<T>): Sequence<T> {
        const selector = asSelector(keyOrSelector);
        return this.sorted(it => it.compareByDescending(selector));
    }

}