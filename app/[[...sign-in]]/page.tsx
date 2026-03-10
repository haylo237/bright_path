import Image from 'next/image';
import { APP_ROLES } from '@/shared/lib/constants';

const LoginPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-white ">
            <form
                action="/api/auth/login"
                method="post"
                className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-4 min-w-[340px]"
            >
                <h1 className="flex items-center gap-2 text-xl font-bold">
                    <Image src="/logo.png" width={24} height={24} alt="logo" />
                    BrightPath
                </h1>
                <h2 className="text-gray-400">Sign in with a local role profile</h2>

                <label className="flex flex-col gap-2">
                    <span className="text-xs text-gray-500">Role</span>
                    <select
                        name="role"
                        defaultValue="admin"
                        className="p-2 rounded-md ring-1 ring-gray-300"
                    >
                        {APP_ROLES.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex flex-col gap-2">
                    <span className="text-xs text-gray-500">User ID (optional)</span>
                    <input
                        type="text"
                        name="userId"
                        placeholder="e.g. teacher1"
                        className="p-2 rounded-md ring-1 ring-gray-300"
                    />
                </label>

                <button
                    type="submit"
                    className="bg-green-600 text-white my-1 rounded-md text-sm p-[10px]"
                >
                    Continue
                </button>
            </form>
    </div>
  );
};

export default LoginPage;