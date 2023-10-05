"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const extension_workload_entity_1 = require("./modules/faculty-workload/entities/extension-workload.entity");
const research_workload_entity_1 = require("./modules/faculty-workload/entities/research-workload.entity");
const strategic_function_workload_entity_1 = require("./modules/faculty-workload/entities/strategic-function-workload.entity");
const teaching_workload_entity_1 = require("./modules/faculty-workload/entities/teaching-workload.entity");
const e_signature_entity_1 = require("./modules/user/entities/e-signature.entity");
const user_entity_1 = require("./modules/user/entities/user.entity");
const config_entity_1 = require("./modules/config/entities/config.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'bk6v1mavp0s8wdc05wtd-postgresql.services.clever-cloud.com',
    port: 5432,
    username: 'utkffh2rjuun7a9wtwrc',
    password: 'Pwk4J1mjiVCxsXzA2CCP',
    database: 'bk6v1mavp0s8wdc05wtd',
    entities: [
        user_entity_1.User,
        teaching_workload_entity_1.TeachingWorkload,
        research_workload_entity_1.ResearchWorkload,
        extension_workload_entity_1.ExtensionWorkload,
        strategic_function_workload_entity_1.StrategicFunctionWorkload,
        e_signature_entity_1.ESignature,
        config_entity_1.Config,
    ],
    synchronize: true,
});
exports.AppDataSource.initialize();
//# sourceMappingURL=data-source.js.map