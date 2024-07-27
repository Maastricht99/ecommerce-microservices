import { app } from "./app";
import { createTables } from "./providers/postgres";

(async () => {
    await createTables();

    app.listen(3003, () => {
        console.log("App running on port 3003.");
    });
})();
