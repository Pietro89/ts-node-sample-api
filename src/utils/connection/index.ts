import {createConnection, getConnection, getManager, getRepository} from "typeorm";
import { User } from "../../entity/index";
import * as jwt from "jsonwebtoken";

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


  async createTestUser(email: string): Promise<string> {
      await getConnection();
      // Create a test user too
      const user = new User();
      user.email = email || "test@test.com";

      await getManager().save(user);

      return jwt.sign(
          {
              id: user.id,
              email: user.email
          },
          process.env.JWT_SECRET as string,
          {
              expiresIn: 60 * 60 * 16, // 16 Hours
          }
      )
  },

    async getuserToken(email: string): Promise<string | undefined> {
        await getConnection();
        const user = await getRepository(User).findOne({
            where: {
                email
            }
        })

        if(!user) return

        return jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: 60 * 60 * 16, // 16 Hours
            }
        )
    }
};

export { connection };
