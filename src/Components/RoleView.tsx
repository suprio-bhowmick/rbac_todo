import { useRole } from "@/context/RoleContext";
const RoleView = () => {
  const { changeRole, user} = useRole();
  return (
    <>
    <h3 className="text-gray-500 mt-10 mb-3">Click to below button to change role</h3>
      <div className="flex gap-3 ">
        <button
          onClick={() => changeRole("admin")}
          className="bg-green-900 text-white px-5 py-2 rounded shadow cursor-pointer "
        >
          Admin
        </button>
        <button
          onClick={() => changeRole("editor")}
          className="bg-green-900 text-white px-5 py-2 rounded shadow cursor-pointer "
        >
          Editor
        </button>
        <button
          onClick={() => changeRole("user")}
          className="bg-green-900 text-white px-5 py-2 rounded shadow cursor-pointer "
        >
          User
        </button>
        <button
          onClick={() => changeRole("guest")}
          className="bg-green-900 text-white px-5 py-2 rounded shadow cursor-pointer "
        >
          Guest
        </button>
      </div>
      <div className=" mt-5">
        <h3 className="text-gray-600 mb-4">Your current role is <span className="font-bold" >{user?.name}</span></h3>
        <ul>
          <li className="text-gray-600"><span className="font-bold">Admin</span> : can be read, add, edit delete and toggle checkbox </li>
          <li className="text-gray-600"><span className="font-bold">Editor</span> : can be read, add,edit, and toggle checkbox </li>
          <li className="text-gray-600"><span className="font-bold">User</span> : can be read and toggle checkbox </li>
          <li className="text-gray-600"><span className="font-bold">Guest</span> : can be read only</li>
        </ul>
      </div>
    </>
  );
};

export default RoleView;
