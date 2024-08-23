import { useUserInfo } from '@/hooks/useUserInfo';
import { useState } from 'react';

const useHeader = () => {
    const [menu, setMenu] = useState(false); // Para el menú de móvil
    const [desktopMenuOpen, setdesktopMenuOpen] = useState(false); // Para el menú desplegable de escritorio

    const { userInfo, loading } = useUserInfo();

    const toggleMenu = () => {
        setMenu(!menu);
    };

    const toggledesktopMenu = () => {
        setdesktopMenuOpen(!desktopMenuOpen);
    };

    const handleMenuClose = () => {
        setMenu(false);
    };

    const handledesktopMenuClose = () => {
        setdesktopMenuOpen(false);
    };
    return {
        menu,
        desktopMenuOpen,
        toggleMenu,
        toggledesktopMenu,
        handleMenuClose,
        handledesktopMenuClose,
        userInfo,
        loading,
    };
};
export default useHeader;
