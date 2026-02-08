onBootstrap((e) => {
    e.next();

    console.debug("Loading configuration...");

    const settings = $app.settings();

    const utils = require(`${ __hooks }/utils.js`);

    settings.meta.appName = utils.getEnvString("PB_META_APP_NAME") ?? "eCourse";
    settings.meta.appURL = utils.getEnvString("PB_META_APP_URL", true);
    settings.meta.hideControls = utils.getEnvBool("PB_META_HIDE_CONTROLS") ?? false;
    settings.meta.senderAddress = utils.getEnvString("PB_META_SENDER_ADDRESS", true);
    settings.meta.senderName = utils.getEnvString("PB_META_SENDER_NAME", true);

    console.debug("Meta loaded.");

    settings.rateLimits.enabled = utils.getEnvBool("PB_RATELIMIT_ENABLED") ?? false;

    if (settings.rateLimits.enabled) {
        // @ts-expect-error For whatever reason is not inheriting from the pocketbase generated types
        const rateLimitRules: RateLimitRule[] = [];
        let ruleIndex = 1;

        while (true) {
            if (utils.getEnvString(`PB_RATELIMIT_RULE_${ ruleIndex }_LABEL`) === undefined) {
                break;
            }

            rateLimitRules.push({
                label: utils.getEnvString(`PB_RATELIMIT_RULE_${ ruleIndex }_LABEL`, true),
                duration: utils.getEnvNumber(`PB_RATELIMIT_RULE_${ ruleIndex }_DURATION`, true),
                audience: utils.getEnvString(`PB_RATELIMIT_RULE_${ ruleIndex }_AUDIENCE`, true),
                maxRequests: utils.getEnvNumber(`PB_RATELIMIT_RULE_${ ruleIndex }_MAX_REQUESTS`, true),
            });

            ruleIndex += 1;
        }

        if (rateLimitRules.length === 0) {
            throw new Error("Rate limit was enabled but no rule was specified.");
        }

        settings.rateLimits.rules = rateLimitRules;
    }

    console.debug("Rate limits loaded.");

    settings.s3.enabled = utils.getEnvBool("PB_S3_ENABLED") ?? false;

    if (settings.s3.enabled) {
        settings.s3.accessKey = utils.getEnvString("PB_S3_ACCESS_KEY", true);
        settings.s3.secret = utils.getEnvString("PB_S3_SECRET", true);
        settings.s3.bucket = utils.getEnvString("PB_S3_BUCKET", true);
        settings.s3.region = utils.getEnvString("PB_S3_REGION", true);
        settings.s3.endpoint = utils.getEnvString("PB_S3_ENDPOINT", true);
        settings.s3.forcePathStyle = utils.getEnvBool("PB_S3_FORCE_PATH_STYLE") ?? false;
    }

    console.debug("S3 loaded.");

    settings.smtp.enabled = utils.getEnvBool("PB_SMTP_ENABLED") ?? false;

    if (settings.smtp.enabled) {
        const authMethod = utils.getEnvString("PB_SMTP_AUTH_METHOD", true).toUpperCase();

        if (authMethod !== "PLAIN" && authMethod !== "LOGIN") {
            throw new Error("SMTP auth method can only be either PLAIN or LOGIN");
        }

        settings.smtp.authMethod = authMethod;
        settings.smtp.host = utils.getEnvString("PB_SMTP_HOST", true);
        settings.smtp.port = utils.getEnvString("PB_SMTP_PORT", true);
        settings.smtp.username = utils.getEnvString("PB_SMTP_USERNAME", true);
        settings.smtp.password = utils.getEnvString("PB_SMTP_PASSWORD", true);

        settings.smtp.tls = utils.getEnvBool("PB_SMTP_TLS") ?? (settings.smtp.port === 465);
        settings.smtp.localName = utils.getEnvString("PB_SMTP_LOCAL_NAME") ?? settings.smtp.localName;
    }

    console.debug("SMTP loaded.");

    const trustedProxyHeaders: string[] = [];

    for (const header in utils.getEnvString("PB_TRUSTED_PROXY_HEADERS")?.split(";") ?? []) {
        trustedProxyHeaders.push(header.trim());
    }

    settings.trustedProxy.headers = trustedProxyHeaders;
    settings.trustedProxy.useLeftmostIP = utils.getEnvBool("PB_TRUSTED_PROXY_USE_LEFT_MOST_IP") ?? false;

    console.debug("Trusted Proxy loaded.");

    settings.logs.logAuthId = utils.getEnvBool("PB_LOGS_AUTH_ID") ?? false;
    settings.logs.logIP = utils.getEnvBool("PB_LOGS_LOG_IP") ?? true;
    settings.logs.maxDays = utils.getEnvNumber("PB_LOGS_MAX_DAYS") ?? 5;
    settings.logs.minLevel = utils.getLogLevel("PB_LOGS_MIN_LEVEL");

    console.debug("Logs loaded.");

    settings.backups.cron = utils.getEnvString("PB_BACKUPS_CRON") ?? "";
    settings.backups.cronMaxKeep = utils.getEnvNumber("PB_BACKUPS_CRON_MAX_KEEP") ?? 3;

    settings.backups.s3.enabled = utils.getEnvBool("PB_BACKUPS_S3_ENABLED") ?? false;

    if (settings.backups.s3.enabled) {
        settings.backups.s3.accessKey = utils.getEnvString("PB_BACKUPS_S3_ACCESS_KEY", true);
        settings.backups.s3.secret = utils.getEnvString("PB_BACKUPS_S3_SECRET", true);
        settings.backups.s3.bucket = utils.getEnvString("PB_BACKUPS_S3_BUCKET", true);
        settings.backups.s3.region = utils.getEnvString("PB_BACKUPS_S3_REGION", true);
        settings.backups.s3.endpoint = utils.getEnvString("PB_BACKUPS_S3_ENDPOINT", true);
        settings.backups.s3.forcePathStyle = utils.getEnvBool("PB_BACKUPS_S3_FORCE_PATH_STYLE") ?? false;
    }

    console.debug("Backup loaded.");

    $app.save(settings);

    console.debug("Configuration loaded.");
});
