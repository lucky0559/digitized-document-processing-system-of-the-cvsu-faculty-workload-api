"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./modules/user/entities/user.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'bk6v1mavp0s8wdc05wtd-postgresql.services.clever-cloud.com',
    port: 5432,
    username: 'utkffh2rjuun7a9wtwrc',
    password: 'Pwk4J1mjiVCxsXzA2CCP',
    database: 'bk6v1mavp0s8wdc05wtd',
    entities: [user_entity_1.User],
    synchronize: true,
});
exports.AppDataSource.initialize();
//# sourceMappingURL=data-source.js.map