const returnsCalculation = (values) => {
    let returns = []

    for (let i = 1; i < values.length; i++) {
        let returnValue = (values[i] - values[i-1]) / values[i-1]
        returns.push(returnValue)
    }

    return returns
}

const mean = (values) => {
    return values.reduce((sum, val) => sum + val, 0) / values.length;
}

const variance = (values) => {
    return values.reduce((sum, value) => sum + (value - mean(values)) ** 2, 0) / values.length
}

const standardDeviation = (values) => {
    if (values.length === 0) return 0

    return Math.sqrt(variance(values));
}

const covariance = (values1, values2) => {
    if (values1.length !== values2.length) {
        throw new Error("Arrays must have the same length")
    }

    const meanX = mean(values1);
    const meanY = mean(values2);

    let sum = 0;
    for (let i = 0; i < values1.length; i++) {
        sum += (values1[i] - meanX) * (values2[i] - meanY);
    }

    return sum / values1.length;
}

export {returnsCalculation, mean, variance, standardDeviation, covariance}