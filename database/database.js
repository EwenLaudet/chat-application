import postgres from "https://deno.land/x/postgresjs@v3.3.3/mod.js";

const sql = postgres({
    host: "tyke.db.elephantsql.com",
    database: "qufrrfmt",
    username: "qufrrfmt",
    password: "YHaY9PefP0gf2JNJNEDiJiBVBU4249bp",
    port: 5432,
    max: 1, // use at most 2 concurrent connections
});

export { sql };