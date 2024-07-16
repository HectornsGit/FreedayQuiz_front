'use client';

import { signOut } from 'next-auth/react';
const signOutHandler = (router, setIsNameSetted) => {
    window.localStorage.removeItem('idNewPlayer');
    window.localStorage.removeItem('playerName');
    window.localStorage.removeItem('QuizSessionDuration');
    window.localStorage.removeItem('quizId');
    window.localStorage.removeItem('isMaster');
    setIsNameSetted(false);
    signOut({ redirect: false });
    router.push(process.env.NEXT_PUBLIC_FRONT);
};
export default signOutHandler;
