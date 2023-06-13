import { postgres } from "../deps.js";

const sql = postgres({
    host: "tyke.db.elephantsql.com",
    database: "qufrrfmt",
    username: "qufrrfmt",
    password: "YHaY9PefP0gf2JNJNEDiJiBVBU4249bp",
    port: 5432,
    max: 1, // use at most 2 concurrent connections
});

export { sql };
