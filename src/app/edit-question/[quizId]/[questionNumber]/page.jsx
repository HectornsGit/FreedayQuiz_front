'use client';

import { useParams } from 'next/navigation';
import EditQuestionForm from '@/components/EditQuestionModal';

const EditQuestionPage = () => {
    const { quizId, questionNumber } = useParams();

    return (
        <div>
            <EditQuestionForm quizId={quizId} questionNumber={questionNumber} />
        </div>
    );
};

export default EditQuestionPage;
