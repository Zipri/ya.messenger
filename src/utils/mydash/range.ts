/**
 * Генерирует числовую последовательность с заданным шагом
 * @param start - число, с которого начнётся последовательность
 * @param end - число, конец последовательности. Функция должна остановиться, не доходя до этого значения
 * @param step - число, шаг между элементами в последовательности
 * @param isRight - флаг, указывающий направление последовательности
 * @returns массив чисел заданной последовательности
 */
function range(
    start: number,
    end?: number,
    step?: number,
    isRight = false
): number[] {
    if (end === undefined) {
        end = start;
        start = 0;
    }

    if (step === undefined) {
        step = start < end ? 1 : -1;
    }

    const result: number[] = [];

    if (step === 0) {
        if (start < end) {
            for (let i = start; i < end; i++) {
                result.push(start);
            }
        }
        return result;
    }

    if (step > 0) {
        for (let i = start; i < end; i += step) {
            result.push(i);
        }
    } else {
        for (let i = start; i > end; i += step) {
            result.push(i);
        }
    }

    return isRight ? result.reverse() : result;
}

function rangeRight(start: number, end?: number, step?: number): number[] {
    return range(start, end, step, true);
}

export { range, rangeRight };
