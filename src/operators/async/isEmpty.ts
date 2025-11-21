import {AsyncSequence} from "../../sequency";

export class IsEmpty {

    /**
     * Returns `true` the sequence is empty
     *
     * @returns {Promise<boolean>}
     */
    async isEmpty<T>(this: AsyncSequence<T>): Promise<boolean> {
        return !(await this.isNotEmpty());
    }

}
