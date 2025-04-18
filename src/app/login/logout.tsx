import {signOut} from '../../../auth'; // To sign out the user
import { PowerIcon } from '@heroicons/react/24/outline';
import { getSession } from '../lib/actions'; // To get the session

const endSession = async () => {
    const session = await getSession();
    session.destroy(); // Destroy the session
}

const Logout = () => {
    return(
        <form action={async () => {
            'use server';
            await endSession(); // End the session
            await signOut({ redirectTo: '/login' });
          }}>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md w-32 hover:bg-yellow-600 transition flex items-center">
            <PowerIcon className="w-3.5 mr-2" />
            Logout</button>
        </form>
    )
}
export default Logout;
