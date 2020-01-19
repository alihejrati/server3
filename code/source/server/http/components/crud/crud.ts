async function crud(dbms, database, collection, req, res) {
    if (dbms == 'mongodb') {
        const json = {};
        const keys = Object.keys(CONFIG['\\database'].mongodb[database].collection[collection].schema);
        for (const field of keys) {
            if (req.body[field] !== undefined) {
                const _field = CONFIG['\\database'].mongodb[database].collection[collection].schema[field];
                if (_field.notice) {
                    switch (_field.notice) {
                        case "isEmail": json[field] = Tools.isEmail(req.body[field]); break;
                        case "isPhoneNumber": json[field] = Tools.isPhoneNumber(req.body[field]); break;

                        default: json[field] = req.body[field]; break;
                    }
                } else if (Array.isArray(_field.type)) {
                    json[field] = Tools.isArray(req.body[field]);
                } else {
                    switch (_field.type) {
                        case "String": json[field] = Tools.isString(req.body[field]); break;
                        case "Object": json[field] = Tools.isJson(req.body[field]); break;
                        case "Date": json[field] = Tools.isTimestamp(req.body[field]); break;
                        case "Boolean": json[field] = Tools.isBoolean(req.body[field]); break;
                        case "ObjectId": json[field] = Tools.isObjectid(req.body[field]); break;

                        default: json[field] = req.body[field]; break;
                    }
                }
            }
        }
        return json;
    }
}

export default crud;