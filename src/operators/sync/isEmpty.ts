import {Sequence} from "../../sequency";

export class IsEmpty {

    /**
     * Returns `true` the sequence is empty
     *
     * @returns {boolean}
     */
    isEmpty<T>(this: Sequence<T>): boolean {
        return !this.isNotEmpty();
    }

}
