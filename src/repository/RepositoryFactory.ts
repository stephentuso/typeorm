import {TreeRepository} from "./TreeRepository";
import {EntityMetadata} from "../metadata/EntityMetadata";
import {Repository} from "./Repository";
import {MongoDriver} from "../driver/mongodb/MongoDriver";
import {MongoRepository} from "./MongoRepository";
import {QueryRunner} from "../query-runner/QueryRunner";
import {EntityManager} from "../entity-manager/EntityManager";

/**
 * Factory used to create different types of repositories.
 */
export class RepositoryFactory {

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    /**
     * Creates a repository.
     */
    create(manager: EntityManager, metadata: EntityMetadata, queryRunner?: QueryRunner): Repository<any> {
        if (metadata.treeType) {
            return new TreeRepository<any>(manager, metadata, queryRunner);
        } else if (manager.connection.driver instanceof MongoDriver) {
            return new MongoRepository(manager, metadata, queryRunner);
        } else {
            return new Repository<any>(manager, metadata, queryRunner);
        }
    }

}