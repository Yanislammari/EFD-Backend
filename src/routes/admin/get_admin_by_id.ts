import { Admin } from "../../models";

export async function getAdminById(id: string) {
  try {
      const admin = await Admin.findByPk(id);
      if(!admin) {
          throw new Error("Admin not found");
      }
      return admin;
  }
  catch(error) {
      throw new Error(`Error fetching admin: ${error.message}`);
  }
}
