import { Toast } from 'react-hot-toast';

type Props = {
    toastInfo: Toast,
    message: string
}

function Toast({ toastInfo, message }: Props) {
    return (
        <div className={`${toastInfo.visible ? 'animate-enter' : 'animate-leave'} 
            max-w-md w-full bg-black border pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
            <div className="flex-1 w-0 p-4">
                <div className="flex items-center">
                    <img className="h-10" src="/flask-animated.gif" />
                    <div className="ml-3 flex-1">
                        <p className='text-sm text-std'>{message}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Toast