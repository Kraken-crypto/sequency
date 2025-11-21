import {AsyncSequence} from "../../sequency";

export class ToMapNotNull {

    /**
     * Returns a map consisting of each key-value pair. Pairs with `null` or `undefined` keys or values are discarded.
     * If a `map` is passed the pairs are set on this map. Duplicate keys override each other.
     *
     * @param {Map<NonNullable<K>, NonNullable<V>>} map
     * @returns {Promise<Map<NonNullable<K>, NonNullable<V>>>}
     */
    async toMapNotNull<K, V>(this: AsyncSequence<[K, V]>, map?: Map<NonNullable<K>, NonNullable<V>>): Promise<Map<NonNullable<K>, NonNullable<V>>> {
        const result = map ?? new Map<NonNullable<K>, NonNullable<V>>();
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
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
