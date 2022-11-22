import { createContext } from 'react';
import type { Request } from "../types/types"

type AppContextType = {
    request: Request | undefined,
    setRequest: React.Dispatch<React.SetStateAction<Request | undefined>>
    selectedImages: string[],
    setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>
    selectedImage: string | undefined,
    setSelectedImage: React.Dispatch<React.SetStateAction<string | undefined>>
}

const iAppContextState = {
    request: undefined,
    setRequest: () => { },
    selectedImages: [],
    setSelectedImages: () => { },
    selectedImage: undefined,
    setSelectedImage: () => { }
}

const AppContext = createContext<AppContextType>(iAppContextState)

export default AppContext