import { useUser } from '../context/userContext';
import { Link } from 'react-router-dom';

function Navbar() {
    const user = useUser();
    // console.log(user.current)
    return (
        <nav className='h-[10vh] items-center p-4 shadow-lg flex justify-between'>
            <Link to="/" className='w-1/2'>Idea tracker</Link>
            <div className='w-1/2 flex items-center justify-evenly'>
                {user.current ? (
                    <>
                        <span className='mr-3'>{user.current.email}</span>
                        <button
                            className='text-black  font-semibold bg-[#ff004f]  px-2 py-1 rounded-lg'
                            type="button" onClick={() => user.signOut()}>
                            Logout
                        </button>
                    </>
                ) : (
                    <Link
                        className='text-black  font-semibold bg-white  px-2 py-1 rounded-lg'
                        to="/login">Login</Link>
                )}
            </div>
        </nav>
    );

}

export default Navbar