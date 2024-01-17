interface IAngles {
    oneHundredEighty: number;
    threeHundredSixty: number;
}

const Angles: IAngles = {
    oneHundredEighty: 180,
    threeHundredSixty: 360
};

/**
 * Перевести градусы в радианы
 * @param angle - Угол в градусах
 */
export function degreesToRadians(angle: number): number {
    return +(Math.PI * angle / Angles.oneHundredEighty).toFixed(4);
}

/**
 * Перевести радианы в градусы
 * @param angle - Угол в радианах
 */
export function RadiansToDegrees(angle: number): number {
    return +(angle * Angles.oneHundredEighty / Math.PI).toFixed(4);
}

