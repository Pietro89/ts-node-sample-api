import { createConnection, getConnection, getManager } from "typeorm";
import { User } from "../../entity/index";

const connection = {
  async create() {
    await createConnection();
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },


  async createTestUsers() {
    await getConnection();
    // Create a test user too
    const user = new User();
    user.email = "test@test.com";

    await getManager().save(user);
  }
};

export { connection };
