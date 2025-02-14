import { Admin } from "../../models";

export async function getAdminById(id: string) {
  const admin = await Admin.findByPk(id);
  if(!admin) {
      return;
  }
  return admin;
}
