import {Sequence} from "../../sequency";

export class IsNotEmpty {

    /**
     * Returns `true` the sequence is not empty
     *
     * @returns {boolean}
     */
    isNotEmpty<T>(this: Sequence<T>): boolean {
        return this.any(() => true);
    }

}
