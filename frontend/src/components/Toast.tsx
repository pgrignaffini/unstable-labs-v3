import { Toast } from 'react-hot-toast';

type Props = {
    toastInfo: Toast,
    message: string,
    loading?: boolean,
    success?: boolean,
    error?: boolean
}

function Toast({ toastInfo, message, loading, success, error }: Props) {
    return (
        <div className={`${toastInfo.visible ? 'animate-enter' : 'animate-leave'} 
            max-w-md w-full bg-slate-900 border pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
            <div className="flex-1 w-0 p-4">
                <div className="flex items-center">
                    {loading && <img className="h-10" src="/flask-animated.gif" />}
                    {success && <img className="h-10" src="/checkmark.png" />}
                    {error && <img className="h-10" src="/error.png" />}
                    <div className="ml-3 flex-1">
                        <p className='text-sm text-std'>{message}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Toast