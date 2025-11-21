import {Sequence} from "../../sequency";

export class ToMapNotNull {

    /**
     * Returns a map consisting of each key-value pair. Pairs with `null` or `undefined` keys or values are discarded.
     * If a `map` is passed the pairs are set on this map. Duplicate keys override each other.
     *
     * @param {Map<NonNullable<K>, NonNullable<V>>} map
     * @returns {Map<NonNullable<K>, NonNullable<V>>}
     */
    toMapNotNull<K, V>(this: Sequence<[K, V]>, map?: Map<NonNullable<K>, NonNullable<V>>): Map<NonNullable<K>, NonNullable<V>> {
        const result = map ?? new Map<NonNullable<K>, NonNullable<V>>();
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            const pair = item.value;
            const key = pair[0];
            const value = pair[1];
            if (key != null && value != null) {
                result.set(key as NonNullable<K>, value as NonNullable<V>);
            }
        }
        return result;
    }

}
