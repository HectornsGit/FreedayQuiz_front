/* eslint-disable @next/next/no-img-element */
'use client';
import { useSession } from 'next-auth/react';
import CreateQuizModal from './CreateQuizModal';
import DeleteQuizModal from './DeleteQuizModal';
import EditQuizModal from './EditQuizModal';
import YellowPencil from './icons/YellowPencil';
import Delete from './icons/Delete';
import QR from './icons/QR';
import ChevronRight from './icons/ChevronRight';
import ChevronLeft from './icons/ChevronLeft';
import Points from './icons/Points';
import useUserProfile from '@/hooks/useUserProfile';
import Start from './icons/Start';
import Save from './icons/Save';

const UserProfile = () => {
    const { data: session } = useSession();
    const {
        userInfo,
        error,
        loading,
        handlePrevPage,
        handleNextPage,
        isEditModalOpen,
        isDeleteModalOpen,
        handleQuizUpdated,
        handleQuizDeleted,
        handleModalClose,
        handleDeleteClick,
        handleEditClick,
        handleChange,
        handleAvatarChange,
        handleSave,
        avatarPreview,
        editableUserInfo,
        quizIndex,
        quizzesPerPage,
        selectedQuizId,
        isEditing,
        handleCreateQuiz,
        handlePlayQuiz,
        handleEditQuiz,
    } = useUserProfile(session);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="flex flex-col items-center mx-auto max-w-[75vw]">
            {userInfo ? (
                <div className="text-center w-full">
                    <div className="flex flex-col md:flex-row items-center mb-5 md:justify-center">
                        <div
                            className="text-center relative justify-center items-center flex mb-5 md:mb-0 md:mr-8"
                            onClick={() => handleEditClick('avatar')}
                        >
                            {isEditing.avatar ? (
                                <div className="relative w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] xl:w-[10rem] xl:h-[10rem]">
                                    <input
                                        type="file"
                                        accept="image/jpeg, image/png, image/gif"
                                        onChange={handleAvatarChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <button
                                        onClick={handleSave}
                                        className="absolute bottom-1 right-0 z-20"
                                    >
                                        <Save className="w-8 h-8 cursor-pointer text-yellow-400" />
                                    </button>
                                    <div className="w-full h-full flex justify-center items-center rounded-full">
                                        {avatarPreview ? (
                                            <img
                                                src={avatarPreview}
                                                alt="Avatar Preview"
                                                className="w-full h-full object-cover rounded-full border-2 border-[var(--yellow)]"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex justify-center items-center bg-gray-200 rounded-full border-2 border-[var(--yellow)]">
                                                <span className="text-gray-500">
                                                    Seleccionar imagen
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <img
                                    src={userInfo.avatar}
                                    alt="Avatar"
                                    className="w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] xl:w-[10rem] xl:h-[10rem] object-cover rounded-full border-2 border-[var(--yellow)]"
                                />
                            )}
                        </div>

                        {/* Name, Email, and Password Section */}
                        <ul className="list-none p-0 mb-5 text-[1.25rem] lg:text-[1.5rem] md:flex md:flex-col">
                            <li
                                className="flex items-center justify-center mb-2 md:justify-start md:ml-[10px]"
                                onClick={() => handleEditClick('name')}
                            >
                                {isEditing.name ? (
                                    <>
                                        <button onClick={handleSave}>
                                            <Save className="w-5 h-5 mr-5 text-yellow-400" />
                                        </button>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editableUserInfo.name}
                                            onChange={handleChange}
                                            className="border p-1 bg-transparent w-full"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <YellowPencil className="w-3 h-3 mr-2 text-yellow-400" />
                                        {userInfo.name}
                                    </>
                                )}
                            </li>
                            <li
                                className="flex items-center justify-center mb-2 md:justify-start md:ml-[10px]"
                                onClick={() => handleEditClick('email')}
                            >
                                {isEditing.email ? (
                                    <>
                                        <button onClick={handleSave}>
                                            <Save className="w-5 h-5 mr-5 text-yellow-400" />
                                        </button>
                                        <input
                                            type="email"
                                            name="email"
                                            value={editableUserInfo.email}
                                            onChange={handleChange}
                                            className="border p-1 bg-transparent w-full"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <YellowPencil className="w-3 h-3 mr-2 text-yellow-400" />
                                        {userInfo.email.length > 15
                                            ? `${userInfo.email.substring(0, 15)}...`
                                            : userInfo.email}
                                    </>
                                )}
                            </li>
                            <li
                                className="flex items-center justify-center mb-2 md:justify-start md:ml-[10px]"
                                onClick={() => handleEditClick('password')}
                            >
                                {isEditing.password ? (
                                    <>
                                        <button onClick={handleSave}>
                                            <Save className="w-5 h-5 mr-5 text-yellow-400" />
                                        </button>
                                        <input
                                            type="password"
                                            name="password"
                                            value={editableUserInfo.password}
                                            onChange={handleChange}
                                            className="border p-1 bg-transparent w-full"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <YellowPencil className="w-3 h-3 mr-2 text-yellow-400" />
                                        {'Cambiar contraseña'.substring(0, 15)}
                                        ...
                                    </>
                                )}
                            </li>
                        </ul>
                    </div>
                    <div className="block md:hidden">
                        <CreateQuizModal onQuizCreated={handleCreateQuiz} />
                    </div>
                    <div className="text-center mb-10">
                        <h2 className="mt-4 md:mt-8 md:mb-8 font-extrabold text-[1.5rem] sm:text-[1.7rem] xl:text-[2rem]">
                            Quizzes creados
                        </h2>
                        <ul className="relative list-none p-0 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            <li className="hidden md:block">
                                <CreateQuizModal
                                    onQuizCreated={handleCreateQuiz}
                                />
                            </li>
                            {userInfo.quizzes.some((quiz) => quiz.id) ? (
                                userInfo.quizzes
                                    .slice(
                                        quizIndex,
                                        quizIndex + quizzesPerPage
                                    )
                                    .map((quiz, index) => (
                                        <li
                                            key={index}
                                            className="mt-4 md:mt-0 p-[2px] bg-gradient-to-br from-[var(--cyan)] to-[var(--yellow)] flex flex-col justify-between"
                                        >
                                            <section className="bg-[var(--bg-hab-black)] flex flex-col justify-between h-full p-2">
                                                <h3 className="text-lg font-bold break-words">
                                                    {quiz.title}
                                                </h3>
                                                <p className="text-sm break-words">
                                                    {quiz.description}
                                                </p>
                                                <div className="flex justify-between items-center gap-4 mx-auto mt-2 w-4/5">
                                                    <button
                                                        onClick={() =>
                                                            handleEditQuiz(
                                                                quiz.id
                                                            )
                                                        }
                                                        className="text-[#FCFF00] hover:underline flex-shrink-0"
                                                    >
                                                        <YellowPencil className="w-4 h-4 mr-1" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                quiz.id
                                                            )
                                                        }
                                                        className="text-[#FCFF00] hover:underline flex-shrink-0"
                                                    >
                                                        <Delete className="w-4 h-4 mr-1 fill-[--yellow]" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handlePlayQuiz(
                                                                quiz.id
                                                            )
                                                        }
                                                        className="text-[#FCFF00] hover:underline flex-shrink-0"
                                                    >
                                                        {/* <QR className="w-4 h-4 mr-2" /> */}
                                                        <Start className="w-8 h-8 pt-1 fill-[--yellow]" />
                                                    </button>
                                                </div>
                                            </section>
                                        </li>
                                    ))
                            ) : (
                                <p className="text-[--yellow] font-bold text-lg p-1 flex flex-row gap-3 w-full justify-center">
                                    <Points className="w-4" />
                                    Crea tu primer quizz
                                    <Points className="w-4" />
                                </p>
                            )}
                            <button
                                onClick={handlePrevPage}
                                disabled={quizIndex === 0}
                                className={`absolute -left-[15%] sm:-left-[12%] top-1/2 transform -translate-y-1/2 ${
                                    quizIndex === 0
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:underline'
                                } text-[#FCFF00]`}
                            >
                                <div className="bg-[#FCFF00] rounded-full p-2">
                                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                                </div>
                            </button>
                            <button
                                onClick={handleNextPage}
                                disabled={
                                    quizIndex + quizzesPerPage >=
                                    userInfo.quizzes.length
                                }
                                className={`absolute -right-[15%] sm:-right-[12%] top-1/2 transform -translate-y-1/2 ${
                                    quizIndex + quizzesPerPage >=
                                    userInfo.quizzes.length
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:underline'
                                } text-[#FCFF00]`}
                            >
                                <div className="bg-[#FCFF00] rounded-full p-2">
                                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                                </div>
                            </button>
                        </ul>
                    </div>
                    <EditQuizModal
                        isOpen={isEditModalOpen}
                        onClose={handleModalClose}
                        quizId={selectedQuizId}
                        onQuizUpdated={handleQuizUpdated}
                        className="mt-4"
                    />
                    <DeleteQuizModal
                        isOpen={isDeleteModalOpen}
                        onClose={handleModalClose}
                        quizId={selectedQuizId}
                        onQuizDeleted={handleQuizDeleted}
                        className="mt-4"
                    />
                </div>
            ) : (
                <p>No user info available</p>
            )}
        </div>
    );
};

export default UserProfile;
