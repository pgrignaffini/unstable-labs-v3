import { PopoverNotificationCenter, NotificationBell, IMessage } from '@novu/notification-center';
import { INovuPopoverTheme, INovuThemePopoverProvider, ICommonTheme } from '@novu/notification-center';
import { useRouter } from 'next/router';

const unstableLabsTheme: INovuPopoverTheme = {
    layout: {
        borderRadius: "0",
    },
    notificationItem: {
        read: {
            background: "#1E1E26",
            fontColor: "#FFFFFF",
        },
        unread: {
            background: "#1E1E26",
            notificationItemBeforeBrandColor: "#b4e61d",
            timeMarkFontColor: "#FFFFFF",
            fontColor: "#FFFFFF",
        },
        buttons: {
            primary: {
                backGroundColor: "#b4e61d",
                fontColor: "#FFFFFF",
                fontFamily: "Press Start 2P, cursive",
                removeCircleColor: "#000000",
            },
            secondary: {
                backGroundColor: "#354407",
                fontColor: "#FFFFFF",
                fontFamily: "Press Start 2P, cursive",
                removeCircleColor: "#000000",
            },
            clicked: {
                backGroundColor: "#354407",
                fontColor: "#FFFFFF",
                fontFamily: "Press Start 2P, cursive",
                removeCircleColor: "#000000",
            }
        }
    },
    loaderColor: "#b4e61d",
    header: {
        markAllAsReadButtonColor: "#FFFFFF",
        badgeColor: "#b4e61d",
    },
    footer: {
        logoTextColor: "#1E1E26",
        logoPrefixFontColor: "#1E1E26",
    },
}

const commonTheme: ICommonTheme = {
    fontFamily: "serif",
}

const theme: INovuThemePopoverProvider = {
    light: unstableLabsTheme,
    dark: unstableLabsTheme,
    common: commonTheme
}

const Notifications = () => {

    const router = useRouter();

    function onNotificationClick(notification: IMessage) {
        router.push(notification.cta.data.url!);
    }

    return (
        <PopoverNotificationCenter position='bottom' theme={theme} onNotificationClick={onNotificationClick} onActionClick={() => console.log("click")} colorScheme="dark">
            {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
        </PopoverNotificationCenter>
    )
}

export default Notifications