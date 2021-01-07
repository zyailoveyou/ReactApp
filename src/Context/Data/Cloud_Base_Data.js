
import cloudbase from "@cloudbase/js-sdk";

const app = cloudbase.init({
    env: "good-5gou5n09e975182b"
});

const auth = app.auth();
const db = app.database();

const Cloud_Base = {
    auth:auth,
    db:db,
    app:app,
}

export default Cloud_Base

