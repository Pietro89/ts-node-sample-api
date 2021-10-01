import {getAvailableHellos} from "../../../mocks/db/index";
import {shuffleArray} from "../../utils/arrays/index";

/**
 * A troop assigned to an hello with size as number of soldiers
 */
type Hello = {
    name: string
    size: number
};

/**
 * Generate an hello
 * @param size the size of the hello
 * @returns the hello
 */
export function generateHello(size: number): Hello {

    let availableHellos = getAvailableHellos()
    availableHellos = shuffleArray(availableHellos)
    const hello = {
        name: availableHellos[0],
        size
    }
    return hello
}
