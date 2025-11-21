import {Sequence} from "../../sequency";
import {asSelector} from "../../internal";

export class SortedBy {

    /**
     * Returns a new sequence with all elements sorted ascending by the value specified
     * by the given `selector` function.
     *
     * @param {(value: T) => R} selector
     * @returns {Sequence<T>}
     */
    sortedBy<T, R>(this: Sequence<T>, selector: (value: T) => R): Sequence<T>;
    /**
     * Returns a new sequence with all elements sorted ascending by the value of the given `key`.
     *
     * @param {keyof T} key
     * @returns {Sequence<T>}
     */
    sortedBy<T>(this: Sequence<T>, key: keyof NonNullable<T>): Sequence<T>;
    sortedBy<T, R>(this: Sequence<T>, keyOrSelector: ((value: T) => R) | keyof NonNullable<T>): Sequence<T> {
        const selector = asSelector(keyOrSelector);
        return this.sorted(it => it.compareBy(selector));
    }

}