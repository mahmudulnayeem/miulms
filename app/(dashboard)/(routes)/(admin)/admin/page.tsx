import { db } from "@/lib/db";
import { columns } from "../_components/columns";
import { DataTable } from "../_components/data-table";

const AdminPage = async () => {
  const teachers = await db.teacher.findMany();

  return (
    <div className="p-6">
      <DataTable columns={columns} data={teachers} />
    </div>
  );
};

export default AdminPage;
