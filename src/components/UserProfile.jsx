/* eslint-disable @next/next/no-img-element */
'use client';
import { useSession } from 'next-auth/react';
import CreateQuizModal from './CreateQuizModal';
import DeleteQuizModal from './DeleteQuizModal';
import EditQuizModal from './EditQuizModal';
import YellowPencil from './icons/YellowPencil';
import Delete from './icons/Delete';
import QR from './icons/QR';
import '../styles/profile.css';
import useUserProfile from '@/hooks/useUserProfile';

const UserProfile = () => {
    const { data: session } = useSession();
    const {
        userInfo,
        error,
        loading,
        handleQRButton,
        handlePrevPage,
        handleNextPage,
        isEditModalOpen,
        isDeleteModalOpen,
        handleQuizUpdated,
        handleQuizDeleted,
        handleEditQuizClick,
        handleModalClose,
        handleDeleteClick,
        handlePlayClick,
        handleQuizClick,
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
                                        <YellowPencil className="w-8 h-8 text-black cursor-pointer bg-yellow-400" />
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
                                                    No image selected
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_HOST}/uploads/${userInfo.avatar}`}
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
                                            <YellowPencil className="w-5 h-5 ml-5 text-yellow-400" />
                                        </button>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editableUserInfo.name}
                                            onChange={handleChange}
                                            className="border p-1 bg-transparent max-w-24"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <YellowPencil className="w-3 h-3 mr-1 text-yellow-400" />
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
                                            <YellowPencil className="w-5 h-5 ml-5 text-yellow-400" />
                                        </button>
                                        <input
                                            type="email"
                                            name="email"
                                            value={editableUserInfo.email}
                                            onChange={handleChange}
                                            className="border p-1 bg-transparent max-w-24"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <YellowPencil className="w-3 h-3 mr-1 text-yellow-400" />
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
                                            <YellowPencil className="w-5 h-5 ml-5 text-yellow-400" />
                                        </button>
                                        <input
                                            type="password"
                                            name="password"
                                            value={editableUserInfo.password}
                                            onChange={handleChange}
                                            className="border p-1 bg-transparent max-w-24"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <YellowPencil className="w-3 h-3 mr-1 text-yellow-400" />
                                        {'Cambiar contraseña'.substring(0, 15)}
                                        ...
                                    </>
                                )}
                            </li>
                        </ul>
                    </div>
                    <div className="block md:hidden">
                        <CreateQuizModal onQuizCreated={handleQuizClick} />
                    </div>
                    {userInfo.quizzes && userInfo.quizzes.length > 0 && (
                        <div className="text-center mb-10">
                            <h2 className="mt-4 md:mt-8 md:mb-8 font-extrabold text-[1.5rem] sm:text-[1.7rem] xl:text-[2rem]">
                                Quizzes creados
                            </h2>
                            <ul className="relative list-none p-0 mx-auto grid-md grid-lg">
                                <li className="hidden md:block">
                                    <CreateQuizModal
                                        onQuizCreated={handleQuizClick}
                                    />
                                </li>
                                {userInfo.quizzes
                                    .slice(
                                        quizIndex,
                                        quizIndex + quizzesPerPage
                                    )
                                    .map((quiz, index) => (
                                        <li
                                            key={index}
                                            className="mt-4 md:mt-0 p-[2px] bg-gradient-to-br from-[var(--cyan)] to-[var(--yellow)]"
                                        >
                                            <section className="bg-[var(--bg-hab-black)]">
                                                <h3 className="mx-auto text-lg font-bold break-words">
                                                    {quiz.title}
                                                </h3>
                                                <p className="mx-auto text-sm break-words">
                                                    {quiz.description}
                                                </p>
                                                <div className="flex justify-between items-center gap-4 mx-auto mt-2 w-4/5">
                                                    <button
                                                        onClick={() =>
                                                            handleEditQuizClick(
                                                                quiz.id
                                                            )
                                                        }
                                                        className="text-[#FCFF00] hover:underline flex-shrink-0"
                                                    >
                                                        <YellowPencil className="w-3 h-3 mr-1" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                quiz.id
                                                            )
                                                        }
                                                        className="text-[#FCFF00] hover:underline flex-shrink-0"
                                                    >
                                                        <Delete className="w-3 h-3 mr-1 fill-[--yellow]" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleQRButton(
                                                                quiz.id
                                                            )
                                                        }
                                                        className="text-[#FCFF00] hover:underline"
                                                    >
                                                        <QR className="w-4 h-4 mr-2" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handlePlayClick(
                                                                quiz.id
                                                            )
                                                        }
                                                        className="text-[#FCFF00] hover:underline flex-shrink-0"
                                                    >
                                                        Iniciar
                                                    </button>
                                                </div>
                                            </section>
                                        </li>
                                    ))}
                                <button
                                    onClick={handlePrevPage}
                                    disabled={quizIndex === 0}
                                    className={`absolute -left-[12] top-1/2 transform -translate-y-1/2 ${
                                        quizIndex === 0
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'hover:underline'
                                    } text-[#FCFF00]`}
                                >
                                    Ant
                                </button>
                                <button
                                    onClick={handleNextPage}
                                    disabled={
                                        quizIndex + quizzesPerPage >=
                                        userInfo.quizzes.length
                                    }
                                    className={`absolute -right-[12%] top-1/2 transform -translate-y-1/2 ${
                                        quizIndex + quizzesPerPage >=
                                        userInfo.quizzes.length
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'hover:underline'
                                    } text-[#FCFF00]`}
                                >
                                    Sig
                                </button>
                            </ul>
                        </div>
                    )}
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
