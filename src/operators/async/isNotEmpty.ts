import {AsyncSequence} from "../../sequency";

export class IsNotEmpty {

    /**
     * Returns `true` the sequence is not empty
     *
     * @returns {Promise<boolean>}
     */
    async isNotEmpty<T>(this: AsyncSequence<T>): Promise<boolean> {
        return await this.any(() => true);
    }

}
