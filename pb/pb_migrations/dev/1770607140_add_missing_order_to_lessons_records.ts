migrate((app) => {
    app.db()
        .newQuery(`
        UPDATE main.lessons
        SET order_index = (SELECT rn
                           FROM (SELECT id,
                                        ROW_NUMBER() OVER (
                                            PARTITION BY course
                                            ORDER BY created, updated
                                            ) AS rn
                                 FROM main.lessons) ranked
                           WHERE ranked.id = main.lessons.id)
    `)
        .execute();


}, (app) => {
    app.db()
        .newQuery("UPDATE main.lessons SET order_index = 0")
        .execute();
});
