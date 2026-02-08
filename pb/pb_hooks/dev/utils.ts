function getProgressTypeId({ progressTypeName }: {
    progressTypeName: string
}): string | undefined {
    const progressTypeRecords = $app.findAllRecords("progress_type");

    for (const record of progressTypeRecords) {
        if (record == null) {
            continue;
        }

        if (record.getString("type_name") === progressTypeName) {
            return record.id;
        }
    }

    throw new Error("Unknown progress type name " + progressTypeName);
}

function getNormalizedEnvVar({ envName }: {
    envName: string
}): string | undefined {
    const normalizedValue = $os.getenv(envName);

    if (normalizedValue === "") {
        return undefined;
    } else {
        return normalizedValue.trim();
    }
}

function getEnvBool(
    envName: string,
    throwErr: boolean = false,
): boolean | undefined {
    const envValue = getNormalizedEnvVar({ envName });

    if (envValue === undefined) {
        if (throwErr) {
            throw new Error(`Environment variable "${ envName }" is not defined`);
        }

        return undefined;
    }

    switch (envValue.toLowerCase()) {
        case "true":
        case "1":
        case "on":
        case "yes":
            return true;
        case "false":
        case "0":
        case "off":
        case "no":
            return false;
        default:
            throw new Error(`Unknown environment variable value for "${ envName }": "${ envValue }"`);
    }
}

function getEnvNumber(
    envName: string,
    throwErr: boolean = false,
): number | undefined {
    const envValue = getNormalizedEnvVar({ envName });

    if (envValue === undefined) {
        if (throwErr) {
            throw new Error(`Environment variable "${ envName }" is not defined`);
        }

        return undefined;
    }

    const numberEnvValue = Number(envValue);

    if (!Number.isFinite(numberEnvValue)) {
        return undefined;
    }

    return numberEnvValue;
}

function getEnvString(
    envName: string,
    throwErr: boolean = false,
): string | undefined {
    const envValue = getNormalizedEnvVar({ envName });

    if (envValue === undefined) {
        if (throwErr) {
            throw new Error(`Environment variable "${ envName }" is not defined`);
        }

        return undefined;
    }

    return envValue;
}

function getLogLevel(envName: string): number {
    const logLevel = getEnvString(envName);

    if (logLevel === undefined) {
        return 0;
    }

    switch (logLevel.toUpperCase()) {
        case "DEBUG":
            return -4;
        case "INFO":
            return 0;
        case "WARN":
            return 4;
        case "ERROR":
            return 8;
        default:
            throw new Error(`Unknown log level: "${ logLevel.toUpperCase() }"`);
    }
}

module.exports = {
    getProgressTypeId,
    getEnvBool,
    getEnvNumber,
    getEnvString,
    getLogLevel,
};
