import { useState } from 'react'
import { trpc } from '@utils/trpc';
import { User } from '@prisma/client';

type Props = {
    placeholder: string
    setUser: React.Dispatch<React.SetStateAction<string | undefined>>
}

const SearchBook = ({ placeholder, setUser }: Props) => {

    const [wordEntered, setWordEntered] = useState("");

    const { data: users, isLoading } = trpc.user.searchUsers.useQuery({
        query: wordEntered
    }, {
        enabled: wordEntered.length > 0
    })

    return (
        <div className="outline-none">
            <div className="inline-flex flex-col flex-start justify-center relative text-inherit">
                <div className="grid">
                    <input type="text" className="p-2 pl-8 border-b-2 border-gray-300 outline-none bg-transparent text-inherit placeholder:italic"
                        value={wordEntered}
                        placeholder={placeholder}
                        onChange={(e) => setWordEntered(e.target.value)} />
                    <svg className="w-6 h-6 absolute left-1 top-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                {users && (
                    <ul className="bg-base-100 max-h-80 shadow-xl absolute z-10 w-full top-12 overflow-hidden overflow-y-auto scrollbar-hide">
                        {users?.slice(0, 15).map((user: User, index: number) => {
                            return (
                                <li onClick={() => {
                                    setUser(user.id)
                                    setWordEntered("")
                                }} key={index} className="flex flex-row justify-between items-center p-1 border-b-2 relative cursor-pointer hover:bg-slate-700 hover:text-gray-900">
                                    <img alt="profil" src={user.image || "/blank.png"}
                                        className="h-12 w-12 object-cover border-2 border-slate-900" />
                                    <p className="text-sm">{user.name}</p>
                                </li>
                            )
                        })}
                    </ul>
                )}
                {wordEntered.length > 0 ?
                    isLoading ?
                        <ul className="bg-base-100 max-h-80 shadow-xl absolute z-10 w-full top-12 overflow-hidden overflow-y-auto scrollbar-hide">
                            <li className="flex flex-row justify-between items-center p-1 border-b-2 relative cursor-pointer hover:bg-slate-700 hover:text-gray-900">
                                <p className="p-2 text-sm">Loading...</p>
                            </li>
                        </ul> :
                        !users?.length && (
                            <ul className="bg-base-100 max-h-80 shadow-xl absolute z-10 w-full top-12 overflow-hidden overflow-y-auto scrollbar-hide">
                                <li className="flex flex-row justify-between items-center p-1 border-b-2 relative cursor-pointer hover:bg-slate-700 hover:text-gray-900">
                                    <p className="p-2 text-sm">No results</p>
                                </li>
                            </ul>
                        ) : null}
            </div>
        </div>
    )
}

export default SearchBook