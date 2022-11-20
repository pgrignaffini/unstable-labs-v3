import { useSession } from 'next-auth/react'
import { trpc } from '@utils/trpc'


export const useLoggedUser = () => {
    const { data: session } = useSession()

    const { data: user } = trpc.user.getUser.useQuery({
        id: session?.user?.id || '1'
    }, {
        enabled: !!session?.user?.id,
        refetchInterval: 5000,
    })

    const hasClaimedVials = user?.hasClaimedVials

    return { user, hasClaimedVials }
}